/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview Creates Webpack bundle config objects to compile Sass files to CSS.
 */

'use strict';

const autoprefixer = require('autoprefixer');

class CssBundleFactory {
  constructor({
    env,
    pathResolver,
    globber,
    pluginFactory,
    autoprefixerLib = autoprefixer,
  } = {}) {
    /** @type {!Environment} */
    this.env_ = env;

    /** @type {!PathResolver} */
    this.pathResolver_ = pathResolver;

    /** @type {!Globber} */
    this.globber_ = globber;

    /** @type {!PluginFactory} */
    this.pluginFactory_ = pluginFactory;

    /** @type {function(opts: ...*=)} */
    this.autoprefixerLib_ = autoprefixerLib;
  }

  createCustomCss(
    {
      bundleName,
      chunks,
      chunkGlobConfig: {
        inputDirectory = null,
        filePathPattern = '**/*.scss',
      } = {},
      output: {
        fsDirAbsolutePath = undefined, // Required for building the npm distribution and writing output files to disk
        httpDirAbsolutePath = undefined, // Required for running the demo server
        filenamePattern = this.env_.isProd() ? '[name].min.css' : '[name].css',
      },
      plugins = [],
    }) {
    chunks = chunks || this.globber_.getChunks({inputDirectory, filePathPattern});

    const fsCleanupPlugins = [];

    if (fsDirAbsolutePath) {
      fsCleanupPlugins.push(this.pluginFactory_.createCssCleanupPlugin({
        cleanupDirRelativePath: fsDirAbsolutePath,
      }));
    }

    const cssExtractorPlugin = this.pluginFactory_.createCssExtractorPlugin(filenamePattern);

    return {
      name: bundleName,
      entry: chunks,
      output: {
        path: fsDirAbsolutePath,
        publicPath: httpDirAbsolutePath,
        filename: `${filenamePattern}.js`, // Webpack 3.x emits CSS wrapped in a JS file (cssExtractorPlugin unwraps it)
      },
      devtool: 'source-map',
      module: {
        rules: [{
          test: /\.scss$/,
          use: this.createCssLoader_(cssExtractorPlugin),
        }],
      },
      plugins: [
        cssExtractorPlugin,
        ...fsCleanupPlugins,
        ...plugins,
      ],
    };
  }

  createMainCssCombined(
    {
      output: {
        fsDirAbsolutePath,
        httpDirAbsolutePath,
      },
      plugins = [],
    }) {
    const getAbsolutePath = (...args) => this.pathResolver_.getAbsolutePath(...args);

    return this.createCustomCss({
      bundleName: 'main-css-combined',
      chunks: {
        'my-components-web': getAbsolutePath('/packages/my-components-web/my-components-web.scss'),
      },
      output: {
        fsDirAbsolutePath,
        httpDirAbsolutePath,
      },
      plugins: [
        this.pluginFactory_.createCopyrightBannerPlugin(),
        ...plugins,
      ],
    });
  }

  createMainCssALaCarte(
    {
      output: {
        fsDirAbsolutePath,
        httpDirAbsolutePath,
      },
      plugins = [],
    }) {
    const getAbsolutePath = (...args) => this.pathResolver_.getAbsolutePath(...args);

    return this.createCustomCss({
      bundleName: 'main-css-a-la-carte',
      chunks: {
        'my.button.toggle': getAbsolutePath('/packages/my-button-toggle/my-button-toggle.scss'),
      },
      output: {
        fsDirAbsolutePath,
        httpDirAbsolutePath,
      },
      plugins: [
        this.pluginFactory_.createCopyrightBannerPlugin(),
        ...plugins,
      ],
    });
  }

  createCssLoader_(extractTextPlugin) {
    const getAbsolutePath = (...args) => this.pathResolver_.getAbsolutePath(...args);

    return extractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [this.autoprefixerLib_()],
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: [getAbsolutePath('/packages/my-components-web/node_modules')],
          },
        },
      ],
    });
  }
}

module.exports = CssBundleFactory;
