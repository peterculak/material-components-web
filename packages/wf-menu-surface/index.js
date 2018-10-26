import {
  MDCMenuSurface,
  MDCMenuSurfaceFoundation,
} from '@material/menu-surface/index';
import * as util from '@material/menu-surface/util';
import WFMenuSurfaceFoundation from './foundation';

class WFMenuSurface extends MDCMenuSurface {
  isOpenedDown() {
    return this.foundation_.isOpen() && this.foundation_.verticalAlignment ===
        'top';
  }

  isOpenedUp() {
    return this.foundation_.isOpen() && this.foundation_.verticalAlignment ===
        'bottom';
  }

  /**
   * @param {!Element} root
   * @return {!WFMenuSurface}
   */
  static attachTo(root) {
    return new WFMenuSurface(root);
  }

  /** @return {!WFMenuSurfaceFoundation} */
  getDefaultFoundation() {
    return new WFMenuSurfaceFoundation(
      /** @type {!MDCMenuSurfaceAdapter} */
      (Object.assign(
        {
          addClass: (className) => this.root_.classList.add(className),
          removeClass: (className) => this.root_.classList.remove(
            className),
          hasClass: (className) => this.root_.classList.contains(
            className),
          hasAnchor: () => !!this.anchorElement,
          notifyClose: () => this.emit(
            MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {}),
          notifyOpen: () => this.emit(
            MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {}),
          isElementInContainer: (el) => this.root_ === el ||
                this.root_.contains(el),
          isRtl: () => getComputedStyle(this.root_).
            getPropertyValue('direction') === 'rtl',
          setTransformOrigin: (origin) => {
            this.root_.style[`${util.getTransformPropertyName(
              window)}-origin`] = origin;
          },
        },
        this.getFocusAdapterMethods_(),
        this.getDimensionAdapterMethods_())
      ));
  }
}

export {WFMenuSurface, WFMenuSurfaceFoundation};
