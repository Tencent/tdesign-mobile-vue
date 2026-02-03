import _List from './list';
import { withInstall } from '../shared';

import { TdListProps } from './type';
import './style';

export * from './type';
export type ListProps = TdListProps;

export const List = withInstall(_List);
export default List;
