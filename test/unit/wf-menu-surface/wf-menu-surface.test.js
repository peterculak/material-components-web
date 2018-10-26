import {assert} from 'chai';
import bel from 'bel';
import {WFMenuSurface, WFMenuSurfaceFoundation} from '../../../packages/wf-menu-surface';

function getFixture() {
  return bel`
  <div class="wf-menu mdc-menu-surface"></div>
  `;
}
suite('WFMenuSurface');

test('attachTo initializes and returns a WFMenuSurface instance', () => {
  assert.isTrue(WFMenuSurface.attachTo(getFixture()) instanceof WFMenuSurface);
});

test('getDefaultFoundation returns instance of WFMenuSurfaceFoundation', () => {
  const menuButton = WFMenuSurface.attachTo(getFixture());
  assert.isTrue(menuButton.getDefaultFoundation() instanceof WFMenuSurfaceFoundation);
});