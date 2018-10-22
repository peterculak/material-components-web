import td from 'testdouble';
import {verifyDefaultAdapter} from '../helpers/foundation';
import {MyRedblueToggleFoundation} from '../../../packages/my-button-toggle/index';

suite('MYButtonToggleFoundation');

test('defaultAdapter returns a complete adapter implementation', () => {
  verifyDefaultAdapter(MyRedblueToggleFoundation, [
    'getAttr', 'setAttr', 'addClass', 'removeClass',
    'setToggleColorTextContent', 'registerInteractionHandler', 'deregisterInteractionHandler',
  ]);
});

test('init calls registerInteractionHandler on adapter', () => {
  const mockAdapter = td.object(MyRedblueToggleFoundation.defaultAdapter);
  const foundation = new MyRedblueToggleFoundation(mockAdapter);

  foundation.init();
  td.verify(mockAdapter.registerInteractionHandler('click', foundation.clickHandler_), {times: 1});
});

test('destroy calls deregisterInteractionHandler on adapter', () => {
  const mockAdapter = td.object(MyRedblueToggleFoundation.defaultAdapter);
  const foundation = new MyRedblueToggleFoundation(mockAdapter);

  foundation.destroy();
  td.verify(mockAdapter.deregisterInteractionHandler('click', foundation.clickHandler_), {times: 1});
});
