import MDCFoundation from '@material/base/foundation';
import {strings as MDCMenuStrings} from '@material/menu/constants';
import WFMenuSurfaceFoundation from '../wf-menu-surface/foundation';
import {cssClasses} from './constants';

class WFButtonMenuFoundation extends MDCFoundation {
  static get defaultAdapter() {
    return {
      toggle: () => '',
      openUrlFromEvent: (/* evt: Event */) => '',
      blurButton: () => '',
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      setToggleColorTextContent: (/* textContent: string */) => {},
      registerButtonInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterButtonInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerMenuInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterMenuInteractionHandler: (/* type: string, handler: EventListener */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(WFButtonMenuFoundation.defaultAdapter, adapter));
    this.buttonHandler_ = () => this.adapter_.toggle();
    this.menuSelectHandler_ = (menu, evt) => this.adapter_.openUrlFromEvent(menu, evt);
    this.menuOpenHandler_ = (menu) => this.menuOpen_(menu);
    this.menuCloseHandler_ = () => this.menuClose_();
  }

  init() {
    this.adapter_.registerButtonInteractionHandler('click', this.buttonHandler_);
    this.adapter_.registerMenuInteractionHandler(MDCMenuStrings.SELECTED_EVENT, this.menuSelectHandler_);
    this.adapter_.registerMenuInteractionHandler(WFMenuSurfaceFoundation.strings.OPENED_EVENT, this.menuOpenHandler_);
    this.adapter_.registerMenuInteractionHandler(WFMenuSurfaceFoundation.strings.CLOSED_EVENT, this.menuCloseHandler_);
  }

  destroy() {
    this.adapter_.deregisterButtonInteractionHandler('click', this.buttonHandler_);
    this.adapter_.deregisterMenuInteractionHandler(MDCMenuStrings.SELECTED_EVENT, this.menuOpenHandler_);
    this.adapter_.deregisterMenuInteractionHandler(WFMenuSurfaceFoundation.strings.OPENED_EVENT, this.menuOpenHandler_);
    this.adapter_.deregisterMenuInteractionHandler(WFMenuSurfaceFoundation.strings.CLOSED_EVENT, this.menuCloseHandler_);
  }

  menuOpen_(menu) {
    this.adapter_.addClass(cssClasses.BUTTON_MENU_OPENED);
    if (menu.isOpenedDown()) {
      this.adapter_.addClass(cssClasses.BUTTON_MENU_OPENED_DOWN_CLASS);
    } else if (menu.isOpenedUp()) {
      this.adapter_.addClass(cssClasses.BUTTON_MENU_OPENED_UP_CLASS);
    }
  }

  menuClose_() {
    this.adapter_.removeClass(
      cssClasses.BUTTON_MENU_OPENED,
      cssClasses.BUTTON_MENU_OPENED_UP_CLASS,
      cssClasses.BUTTON_MENU_OPENED_DOWN_CLASS,
    );
    this.adapter_.blurButton();
  }
}

export default WFButtonMenuFoundation;
