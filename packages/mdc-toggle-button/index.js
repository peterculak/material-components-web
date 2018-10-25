import MDCComponent from '@material/base/component';
import MDCToggleButtonFoundation from './foundation';

class MDCToggleButton extends MDCComponent {
  get toggled() {
    return this.foundation_.isToggled();
  }

  set toggled(toggled) {
    this.foundation_.toggle(toggled);
  }

  static attachTo(root) {
    return new MDCToggleButton(root);
  }

  getDefaultFoundation() {
    return new MDCToggleButtonFoundation({
      getAttr: attr => this.root_.getAttribute(attr),
      setAttr: (attr, value) => this.root_.setAttribute(attr, value),
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      setToggleColorTextContent: textContent => {
        this.root_.querySelector('.redblue-toggle__color').textContent = textContent;
      },
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler)
    });
  }
}

export {MDCToggleButton, MDCToggleButtonFoundation};