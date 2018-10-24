import {assert} from 'chai';
import bel from 'bel';
import {MYToggleButton} from '../../../packages/my-toggle-button/index';

function getFixture() {
  return bel`
  <div class="redblue-toggle" role="button" aria-pressed="false">
    Toggle <span class="redblue-toggle__color">Blue</span>
  </div>
  `;
}

// suite('MDCToggleButton');

test('attachTo initializes and returns a MYToggleButton instance', () => {
  assert.isTrue(MYToggleButton.attachTo(getFixture()) instanceof MYToggleButton);
});