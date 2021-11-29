import LocalDropdownMenu from './dropdown-menu.vue';
import _LocalDropdownItem from './dropdown-item.vue';
import { withInstall, WithInstallType, mapProps } from '../shared/';

import './style/';

export const DropdownMenu: WithInstallType<typeof LocalDropdownMenu> = withInstall(LocalDropdownMenu);
// export const DropdownItem: WithInstallType<typeof _LocalDropdownItem> = withInstall(_LocalDropdownItem);

export const DropdownItem: WithInstallType<typeof _LocalDropdownItem> = withInstall(mapProps([
  {
    name: 'value',
    event: 'change',
    alias: ['modelValue'],
  },
])(_LocalDropdownItem));
