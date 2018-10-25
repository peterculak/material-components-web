import {strings as MDCMenuStrings} from '@material/menu/constants';
import WFMenu from '../wf-menu/index';
import WFMenuSurfaceFoundation from '../wf-menu-surface/foundation';
import {strings, cssClasses, Corner} from './constants';

class WFButtonMenu {
  /**
   * @param {!Element} root
   * @return {!WFButtonMenu}
   */
  static attachTo(root) {
    return new WFButtonMenu(root);
  }

  /**
   * @param {!Element} root
   */
  constructor(root) {
    /** @private {!Element} */
    this.root_ = root;
    /** @private {!Element} */
    this.buttonElement_ = this.root_.querySelector(
      strings.MENU_TRIGGER_SELECTOR);
    /** @private {!Element} */
    this.menuElement_ = this.root_.querySelector(strings.MENU_SELECTOR);
    /** @private {!WFMenu} */
    this.menu_;

    this.initialize();
  }

  initialize() {
    this.menu_ = WFMenu.attachTo(this.menuElement_);
    this.menu_.setAnchorCorner(Corner.BOTTOM_START);
    this.menu_.quickOpen = true;

    this.handleButtonClick_();
    this.handleMenuItemSelection_();
    this.handleMenuOpen_();
    this.handleMenuClose_();
  }

  /**
   * Open/Close menu on button click
   * @private
   */
  handleButtonClick_() {
    this.buttonElement_.addEventListener('click', () => {
      this.menu_.open = !this.menu_.open;
    });
  }

  /**
   * Follows href of selected item when it has one
   * @private
   */
  handleMenuItemSelection_() {
    this.menuElement_.addEventListener(
      MDCMenuStrings.SELECTED_EVENT,
      (evt) => {
        if (evt.detail.item.href) {
          window.location = evt.detail.item.href;
        }
      });
  }

  /**
   * Adds classes to root element to indicate whether it's opened up/down
   * @private
   */
  handleMenuOpen_() {
    this.menuElement_.addEventListener(
        WFMenuSurfaceFoundation.strings.OPENED_EVENT, () => {
          this.root_.classList.add(
              cssClasses.BUTTON_MENU_OPENED);
          if (this.menu_.isOpenedDown()) {
            this.root_.classList.add(
                cssClasses.BUTTON_MENU_OPENED_DOWN_CLASS);
          } else if (this.menu_.isOpenedUp()) {
            this.root_.classList.add(
                cssClasses.BUTTON_MENU_OPENED_UP_CLASS);
          }
        });
  }

  /**
   * Removes classes from root which indicated it was opened
   * Removes focus from trigger button
   * @private
   */
  handleMenuClose_() {
    this.menuElement_.addEventListener(
        WFMenuSurfaceFoundation.strings.CLOSED_EVENT, () => {
          this.root_.classList.remove(
              cssClasses.BUTTON_MENU_OPENED,
              cssClasses.BUTTON_MENU_OPENED_UP_CLASS,
              cssClasses.BUTTON_MENU_OPENED_DOWN_CLASS,
          );
          this.buttonElement_.blur();
        });
  }
}

export {WFButtonMenu};
