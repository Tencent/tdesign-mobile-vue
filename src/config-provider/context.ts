import { InjectionKey, ComputedRef } from 'vue';
import { merge, mergeWith as _mergeWith, isArray } from 'lodash-es';
import defaultConfig from '../_common/js/global-config/mobile/default-config';
import defaultZhLocale from '../_common/js/global-config/mobile/locale/zh_CN';
import { GlobalConfigProvider } from './type';

export const defaultGlobalConfig = merge(defaultConfig, defaultZhLocale);

export type Locale = typeof defaultZhLocale;

export const configProviderInjectKey: InjectionKey<ComputedRef<GlobalConfigProvider>> = Symbol('configProvide');

export const mergeWith = (defaultGlobalConfig: GlobalConfigProvider, injectConfig: GlobalConfigProvider) =>
  _mergeWith(defaultGlobalConfig, injectConfig, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue;
    }
  });
