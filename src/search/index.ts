import _Search from './search';
import { withInstall, WithInstallType } from '../shared';

import './style';
import { TdSearchProps } from './type';

export * from './type';
export type SearchProps = TdSearchProps;

export const Search: WithInstallType<typeof _Search> = withInstall(_Search);
export default Search;
