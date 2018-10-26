import {assert} from 'chai';
import bel from 'bel';
import {WFButtonMenu, WFButtonMenuFoundation} from '../../../packages/wf-button-menu/index';
import {Corner} from '../../../packages/wf-button-menu/constants';

function getFixture() {
  return bel`
  <div data-mdc-auto-init="WFButtonMenu" class="wf-button-menu mdc-menu-surface--anchor">
        <button class="wf-buttonv2 wf-buttonv2--secondary">
            Download statement as...
            <i class="icons-chevron-down" aria-hidden="true">&nbsp;</i>
        </button>

        <div class="mdc-menu mdc-menu-surface">
            <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical">
                <li class="mdc-list-item" role="menuitem">
                    <span class="mdc-list-item__text">Comma separated values (.csv)</span>
                </li>
            </ul>
        </div>
    </div>
  `;
}
suite('WFButtonMenu');

test('attachTo initializes and returns a WFButtonMenu instance', () => {
  assert.isTrue(WFButtonMenu.attachTo(getFixture()) instanceof WFButtonMenu);
});

test('it creates menu quickOpen(true) and setAnchorCorner(bottom start)', () => {
  const menuButton = WFButtonMenu.attachTo(getFixture());
  assert.isFalse(menuButton.menu_.open);
  assert.isFalse(menuButton.menu_.isOpenedUp());
  assert.isFalse(menuButton.menu_.isOpenedDown());
  assert.equal(
    menuButton.menu_.menuSurface_.foundation_.anchorCorner_,
    Corner.BOTTOM_START
  );
});

test('getDefaultFoundation returns instance of WFButtonMenuFoundation', () => {
  const menuButton = WFButtonMenu.attachTo(getFixture());
  assert.isTrue(menuButton.getDefaultFoundation() instanceof WFButtonMenuFoundation);
});
