import {assert} from 'chai';
import bel from 'bel';
import {WFButtonMenu} from '../../../packages/wf-button-menu/index';

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
