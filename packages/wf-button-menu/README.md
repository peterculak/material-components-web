# WF ButtonMenu Component

WF Button Menu is a component combining a button trigger and a menu surface components 
to provide a menu which displays when user clicks the button.

## Usage

### Including the Sass

```scss
@import "wf-button-menu";
```

### Including the Javascript

```js
import WFButtonMenu from './index';
const myMenu = WFButtonMenu.attachTo(document.querySelector('.wf-button-menu'));
```

```html
<div class="wf-button-menu mdc-menu-surface--anchor">
    <button class="wf-buttonv2 wf-buttonv2--secondary">
        Download statement as...
        <i class="icons-chevron-down" aria-hidden="true">&nbsp;</i>
    </button>

    <div class="mdc-menu mdc-menu-surface">
        <ul class="mdc-list mdc-list--non-interactive" role="menu" aria-hidden="true" aria-orientation="vertical">
            <a href="" class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__text">Comma separated values (.csv)</span>
            </a>
            <a href="" class="mdc-list-item" role="menuitem">Microsoft Excel (.xls)</a>
            <a class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__text">PDF Document (.pdf)</span>
            </a>
            <a href="" class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__text">Quicken format (.qif)</span>
            </a>
            <a href="" class="mdc-list-item" role="menuitem">
                <span class="mdc-list-item__text">Open Financial Exchange (.ofx)</span>
            </a>
        </ul>
    </div>
</div>
```
