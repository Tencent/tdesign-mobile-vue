import TreeSelect from './tree-select.vue';
import { withInstall, WithInstallType } from '../shared';
import { TdTreeSelectProps } from './type';

import './style';

export * from './type';
export type TreeSelectProps = TdTreeSelectProps;

const _TreeSelect: WithInstallType<typeof TreeSelect> = withInstall(TreeSelect);
export default _TreeSelect;
