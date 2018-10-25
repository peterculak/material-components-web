import {assert} from 'chai';
import bel from 'bel';
import {WFToggleButton, WFToggleButtonFoundation} from '../../../packages/wf-toggle-button/index';

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

suite('WFToggleButton');

test('attachTo initializes and returns a MyButtonToggle instance', () => {
  assert.isTrue(WFToggleButton.attachTo(getFixture()) instanceof WFToggleButton);
});

test('getToggled returns false when aria-pressed is not set', () => {
  const component = WFToggleButton.attachTo(getFixture());
  assert.isFalse(component.toggled);
});

test('getToggled returns true when aria-pressed is set', () => {
  const component = WFToggleButton.attachTo(getFixtureAriaPressed());
  assert.isTrue(component.toggled);
});

test('setToggled sets toggled state from false to true', () => {
  const component = WFToggleButton.attachTo(getFixture());
  assert.isFalse(component.toggled);
  component.toggled = true;
  assert.isTrue(component.toggled);
});

test('getDefaultFoundation returns instance of MyRedblueToggleFoundation', () => {
  const component = WFToggleButton.attachTo(getFixture());
  assert.isTrue(component.getDefaultFoundation() instanceof WFToggleButtonFoundation);
});
