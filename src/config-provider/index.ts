import { withInstall, WithInstallType } from '../shared';
import _ConfigProvider from './config-provider';
import { TdConfigProviderProps } from './type';

export * from './type';
export type ConfigProviderProps = TdConfigProviderProps;

export const ConfigProvider: WithInstallType<typeof _ConfigProvider> = withInstall(_ConfigProvider);
export default ConfigProvider;
