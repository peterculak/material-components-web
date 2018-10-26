import MDCComponent from '@material/base/component';
import {WFMenu} from '../wf-menu/index';
import {strings, Corner} from './constants';
import WFButtonMenuFoundation from '../wf-button-menu/foundation';

class WFButtonMenu extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!WFButtonMenu}
   */
  static attachTo(root) {
    return new WFButtonMenu(root);
  }

  initialize() {
    this.buttonElement_ = this.root_.querySelector(
      strings.MENU_TRIGGER_SELECTOR);
    /** @private {!Element} */
    this.menuElement_ = this.root_.querySelector(strings.MENU_SELECTOR);
    /** @private {!WFMenu} */
    this.menu_ = WFMenu.attachTo(this.menuElement_);
    this.menu_.setAnchorCorner(Corner.BOTTOM_START);
    this.menu_.quickOpen = true;
  }

  getDefaultFoundation() {
    return new WFButtonMenuFoundation({
      toggle: () => this.menu_.open = !this.menu_.open,
      openUrlFromEvent: (menu, evt) => {
        if (evt.detail.item.href) {
          window.location = evt.detail.item.href;
        }
      },
      blurButton: () => this.buttonElement_.blur(),
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (...className) => this.root_.classList.remove(...className),
      registerButtonInteractionHandler: (type, handler) => this.buttonElement_.addEventListener(type, handler),
      deregisterButtonInteractionHandler: (type, handler) => this.buttonElement_.removeEventListener(type, handler),
      registerMenuInteractionHandler: (type, handler) => this.menuElement_.addEventListener(
        type, handler.bind(this, this.menu_)
      ),
      deregisterMenuInteractionHandler: (type, handler) => this.menuElement_.removeEventListener(type, handler),
    });
  }
}

export {WFButtonMenu, WFButtonMenuFoundation};
