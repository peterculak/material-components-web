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
import {MyButtonMenu} from '../../../packages/my-button-menu/index';

function getFixture() {
  return bel`
  <div></div>
  `;
}

function setupTest(root = getFixture()) {
  const MockFoundationCtor = td.constructor(MDCListFoundation);
  const mockFoundation = new MockFoundationCtor();
  const component = new MDCList(root, mockFoundation);
  return {root, component, mockFoundation};
}

suite('MyButtonMenu');

test('attachTo initializes and returns a MyButtonMenu instance', () => {
  // assert.isTrue(MyButtonMenu.attachTo(getFixture()) instanceof MyButtonMenu);
  // assert.isTrue(MyButtonMenu.attachTo(getFixture()) instanceof MyButtonMenu);
  let instance = new MyButtonMenu(getFixture());
  assert.isTrue(instance instanceof MyButtonMenu);
});
