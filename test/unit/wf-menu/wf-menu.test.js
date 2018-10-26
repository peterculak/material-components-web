import {assert} from 'chai';
import bel from 'bel';
import {WFMenu} from '../../../packages/wf-menu/index';
import {WFMenuSurface} from '../../../packages/wf-menu-surface';

function getFixture() {
  return bel`
  <div class="wf-menu mdc-menu-surface"></div>
  `;
}
suite('WFMenu');

test('attachTo initializes and returns a WFMenu instance', () => {
  assert.isTrue(WFMenu.attachTo(getFixture()) instanceof WFMenu);
});

test('WFMenu uses WFMenuSurface', () => {
  const menu = WFMenu.attachTo(getFixture());
  assert.isTrue(menu.menuSurface_ instanceof WFMenuSurface);
});

test('menu is closed after initialisation', () => {
  const menu = WFMenu.attachTo(getFixture());
  assert.isFalse(menu.open);
  assert.isFalse(menu.isOpenedDown());
  assert.isFalse(menu.isOpenedUp());
});
