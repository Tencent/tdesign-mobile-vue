import Popup from './popup.vue';
import { withInstall, WithInstallType, mapProps } from '../shared';

import './style';

const _Popup: WithInstallType<typeof Popup> = withInstall(
  mapProps([
    {
      name: 'visible',
      event: 'visible-change',
      alias: ['modelValue'],
    },
  ])(Popup),
);

export default _Popup;
