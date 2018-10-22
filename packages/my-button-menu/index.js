class MyButtonMenu {
  get toggled() {
    return this.root.getAttribute('aria-pressed') === 'true';
  }

  set toggled(toggled) {
    this.toggle(toggled);
  }

  constructor(root) {
    this.root = root;
    this.clickHandler_ = () => this.toggle();
    this.initialize();
  }

  initialize() {
    this.root.addEventListener('click', this.clickHandler_);
  }

  destroy() {
    this.root.removeEventListener('click', this.clickHandler_);
  }

  toggle(isToggled = undefined) {
    const wasToggledExplicitlySet = isToggled === Boolean(isToggled);
    const toggled = wasToggledExplicitlySet ? isToggled : !this.toggled;
    const toggleColorEl = this.root.querySelector('.redblue-toggle__color');
    let toggleColor;

    this.root.setAttribute('aria-pressed', String(toggled));
    if (toggled) {
      toggleColor = 'Red';
      this.root.classList.add('redblue-toggle--toggled');
    } else {
      toggleColor = 'Blue';
      this.root.classList.remove('redblue-toggle--toggled');
    }
    toggleColorEl.textContent = toggleColor;
  }
}

export {MyButtonMenu};
