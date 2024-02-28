import { withInstall } from '../shared';
import _ConfigProvider from './config-provider.vue';

export * from './type';

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
