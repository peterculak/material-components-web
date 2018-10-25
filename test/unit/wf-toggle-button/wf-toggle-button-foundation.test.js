import td from 'testdouble';
import {verifyDefaultAdapter} from '../helpers/foundation';
import {WFToggleButtonFoundation} from '../../../packages/wf-toggle-button/index';

suite('WFToggleButtonFoundation');

test('defaultAdapter returns a complete adapter implementation', () => {
  verifyDefaultAdapter(WFToggleButtonFoundation, [
    'getAttr', 'setAttr', 'addClass', 'removeClass',
    'setToggleColorTextContent', 'registerInteractionHandler', 'deregisterInteractionHandler',
  ]);
});

test('init calls registerInteractionHandler on adapter', () => {
  const mockAdapter = td.object(WFToggleButtonFoundation.defaultAdapter);
  const foundation = new WFToggleButtonFoundation(mockAdapter);

  foundation.init();
  td.verify(mockAdapter.registerInteractionHandler('click', foundation.clickHandler_), {times: 1});
});

test('destroy calls deregisterInteractionHandler on adapter', () => {
  const mockAdapter = td.object(WFToggleButtonFoundation.defaultAdapter);
  const foundation = new WFToggleButtonFoundation(mockAdapter);

  foundation.destroy();
  td.verify(mockAdapter.deregisterInteractionHandler('click', foundation.clickHandler_), {times: 1});
});

test('isToggled calls getAttr on adapter', () => {
  const mockAdapter = td.object(WFToggleButtonFoundation.defaultAdapter);
  const foundation = new WFToggleButtonFoundation(mockAdapter);

  foundation.isToggled();
  td.verify(mockAdapter.getAttr('aria-pressed'), {times: 1});
});

test('toggle not explicitly set', () => {
  const mockAdapter = td.object(WFToggleButtonFoundation.defaultAdapter);
  const foundation = new WFToggleButtonFoundation(mockAdapter);

  foundation.toggle();
  td.verify(mockAdapter.setToggleColorTextContent('Red'), {times: 1});
  td.verify(mockAdapter.addClass('redblue-toggle--toggled'), {times: 1});
  td.verify(mockAdapter.setAttr('aria-pressed', 'true'), {times: 1});

  foundation.toggle();
  td.verify(mockAdapter.setToggleColorTextContent('Blue'), {times: 1});
  td.verify(mockAdapter.removeClass('redblue-toggle--toggled'), {times: 1});
  td.verify(mockAdapter.setAttr('aria-pressed', 'false'), {times: 1});
});

test('toggle(true)', () => {
  const mockAdapter = td.object(WFToggleButtonFoundation.defaultAdapter);
  const foundation = new WFToggleButtonFoundation(mockAdapter);

  foundation.toggle(true);
  td.verify(mockAdapter.setToggleColorTextContent('Red'), {times: 1});
  td.verify(mockAdapter.addClass('redblue-toggle--toggled'), {times: 1});
  td.verify(mockAdapter.setAttr('aria-pressed', 'true'), {times: 1});
});

test('toggle(false)', () => {
  const mockAdapter = td.object(WFToggleButtonFoundation.defaultAdapter);
  const foundation = new WFToggleButtonFoundation(mockAdapter);

  foundation.toggle(false);
  td.verify(mockAdapter.setToggleColorTextContent('Blue'), {times: 1});
  td.verify(mockAdapter.removeClass('redblue-toggle--toggled'), {times: 1});
  td.verify(mockAdapter.setAttr('aria-pressed', 'false'), {times: 1});
});
