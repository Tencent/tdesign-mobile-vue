import _TreeSelect from './tree-select';
import { withInstall } from '../shared';
import { TdTreeSelectProps } from './type';

import './style';

export * from './type';
export type TreeSelectProps = TdTreeSelectProps;

export const TreeSelect = withInstall(_TreeSelect);
export default TreeSelect;
