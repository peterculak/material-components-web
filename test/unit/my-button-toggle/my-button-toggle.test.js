/**
 * @license
 * Copyright 2018 Google Inc.
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


import {assert} from 'chai';
import td from 'testdouble';
import bel from 'bel';
import {MyButtonToggle, MyRedblueToggleFoundation} from '../../../packages/my-button-toggle/index';

function getFixture() {
  return bel`
  <div class="redblue-toggle" role="button" aria-pressed="false">
  Toggle <span class="redblue-toggle__color">Blue</span>
  </div>
  `;
}

function setupTest(root = getFixture()) {
  const MockFoundationCtor = td.constructor(MyRedblueToggleFoundation);
  const mockFoundation = new MockFoundationCtor();
  const component = new MyButtonToggle(root, mockFoundation);
  return {root, component, mockFoundation};
}

suite('MYButtonToggle');

test('attachTo initializes and returns a MyButtonToggle instance', () => {
  assert.isTrue(MyButtonToggle.attachTo(getFixture()) instanceof MyButtonToggle);
});
