import {assert} from 'chai';
import bel from 'bel';
import {MDCToggleButton, MDCToggleButtonFoundation} from '../../../packages/mdc-toggle-button/index';

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

suite('MDCToggleButton');

test('attachTo initializes and returns a MyButtonToggle instance', () => {
  assert.isTrue(MDCToggleButton.attachTo(getFixture()) instanceof MDCToggleButton);
});

test('getToggled returns false when aria-pressed is not set', () => {
  const component = MDCToggleButton.attachTo(getFixture());
  assert.isFalse(component.toggled);
});

test('getToggled returns true when aria-pressed is set', () => {
  const component = MDCToggleButton.attachTo(getFixtureAriaPressed());
  assert.isTrue(component.toggled);
});

test('setToggled sets toggled state from false to true', () => {
  const component = MDCToggleButton.attachTo(getFixture());
  assert.isFalse(component.toggled);
  component.toggled = true;
  assert.isTrue(component.toggled);
});

test('getDefaultFoundation returns instance of MyRedblueToggleFoundation', () => {
  const component = MDCToggleButton.attachTo(getFixture());
  assert.isTrue(component.getDefaultFoundation() instanceof MDCToggleButtonFoundation);
});