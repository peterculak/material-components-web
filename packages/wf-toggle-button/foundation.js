import MDCFoundation from '@material/base/foundation';

class WFToggleButtonFoundation extends MDCFoundation {
  static get defaultAdapter() {
    return {
      getAttr: (/* attr: string */) => /* string */ '',
      setAttr: (/* attr: string, value: string */) => {},
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      setToggleColorTextContent: (/* textContent: string */) => {},
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(WFToggleButtonFoundation.defaultAdapter, adapter));
    this.toggled_ = false;
    this.clickHandler_ = () => this.toggle();
  }

  init() {
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
  }

  isToggled() {
    return this.adapter_.getAttr('aria-pressed') === 'true';
  }

  toggle(isToggled = undefined) {
    const wasToggledExplicitlySet = isToggled === Boolean(isToggled);
    this.toggled_ = wasToggledExplicitlySet ? isToggled : !this.toggled_;

    let toggleColor;

    this.adapter_.setAttr('aria-pressed', String(this.toggled_));
    if (this.toggled_) {
      toggleColor = 'Red';
      this.adapter_.addClass('redblue-toggle--toggled');
    } else {
      toggleColor = 'Blue';
      this.adapter_.removeClass('redblue-toggle--toggled');
    }
    this.adapter_.setToggleColorTextContent(toggleColor);
  }
}

export default WFToggleButtonFoundation;
