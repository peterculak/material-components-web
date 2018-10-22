import {assert} from 'chai';
import bel from 'bel';
import {MyButtonToggle, MyRedblueToggleFoundation} from '../../../packages/my-button-toggle/index';

function getFixture() {
  return bel`
  <div class="redblue-toggle" role="button" aria-pressed="false">
  Toggle <span class="redblue-toggle__color">Blue</span>
  </div>
  `;
}

function getFixtureAriaPressed() {
  return bel`
  <div class="redblue-toggle" role="button" aria-pressed="true">
  Toggle <span class="redblue-toggle__color">Red</span>
  </div>
  `;
}

suite('MYButtonToggle');

test('attachTo initializes and returns a MyButtonToggle instance', () => {
  assert.isTrue(MyButtonToggle.attachTo(getFixture()) instanceof MyButtonToggle);
});

test('getToggled returns false when aria-pressed is not set', () => {
  const component = MyButtonToggle.attachTo(getFixture());
  assert.isFalse(component.toggled);
});

test('getToggled returns true when aria-pressed is set', () => {
  const component = MyButtonToggle.attachTo(getFixtureAriaPressed());
  assert.isTrue(component.toggled);
});

test('setToggled sets toggled state from false to true', () => {
  const component = MyButtonToggle.attachTo(getFixture());
  assert.isFalse(component.toggled);
  component.toggled = true;
  assert.isTrue(component.toggled);
});

test('getDefaultFoundation returns instance of MyRedblueToggleFoundation', () => {
  const component = MyButtonToggle.attachTo(getFixture());
  assert.isTrue(component.getDefaultFoundation() instanceof MyRedblueToggleFoundation);
});
