import _TreeSelect from './tree-select';
import { withInstall, WithInstallType } from '../shared';
import { TdTreeSelectProps } from './type';

import './style';

export * from './type';
export type TreeSelectProps = TdTreeSelectProps;

export const TreeSelect: WithInstallType<typeof _TreeSelect> = withInstall(_TreeSelect);
export default TreeSelect;
