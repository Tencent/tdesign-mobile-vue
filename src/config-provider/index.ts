import { withInstall } from '../shared';
import _ConfigProvider from './config-provider';

export * from './type';

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
