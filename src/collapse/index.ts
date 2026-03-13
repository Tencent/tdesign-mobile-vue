import _Collapse from './collapse';
import _CollapsePanel from './collapse-panel';
import { withInstall } from '../shared';

import './style';

import { TdCollapseProps, TdCollapsePanelProps } from './type';

export * from './type';
export type CollapseProps = TdCollapseProps;
export type CollapsePanelProps = TdCollapsePanelProps;

export const Collapse = withInstall(_Collapse);
export const CollapsePanel = withInstall(_CollapsePanel);
export default Collapse;
