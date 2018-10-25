import { MDCMenu } from '@material/menu/index';
import { MDCList } from '@material/list';
import WFMenuSurface from '../wf-menu-surface';

export default class WFMenu extends MDCMenu {
  /**
   * @param {!Element} root
   * @return {!WFMenu}
   */
  static attachTo(root) {
    return new WFMenu(
        root,
        undefined,
        el => new WFMenuSurface(el),
        el => new MDCList(el),
    );
  }

  isOpenedDown() {
    return this.menuSurface_.isOpenedDown();
  }

  isOpenedUp() {
    return this.menuSurface_.isOpenedUp();
  }
}
