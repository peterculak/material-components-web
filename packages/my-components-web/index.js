import autoInit from '@material/auto-init/index';
import * as buttonToggle from '../my-button-toggle/index';

// Register all components
autoInit.register('MyButtonToggle', buttonToggle.MyButtonToggle);

// Export all components.
export {
  autoInit,
  buttonToggle,
};
