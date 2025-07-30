import _List from './list';
import { withInstall, WithInstallType } from '../shared';

import { TdListProps } from './type';
import './style';

export * from './type';
export type ListProps = TdListProps;

export const List: WithInstallType<typeof _List> = withInstall(_List);
export default List;
