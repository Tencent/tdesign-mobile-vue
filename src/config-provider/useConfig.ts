import { computed, h, inject, getCurrentInstance, ref, provide } from 'vue';
import { cloneDeep, isFunction, isString } from 'lodash-es';

import { defaultGlobalConfig, configProviderInjectKey, mergeWith } from './context';
import { GlobalConfigProvider } from './type';
import type { TdConfigProviderProps } from './type';

// 这是为了解决在非component里调用useConfig hook时发出的警告
// https://github.com/Tencent/tdesign-vue-next/issues/2025
const globalConfigCopy = ref<GlobalConfigProvider>();

export * from './type';

// 处理正则表达式
export const t = function <T>(pattern: T, ...args: any[]) {
  const [data] = args;
  if (isString(pattern)) {
    if (!data) return pattern;
    const regular = /\{\s*([\w-]+)\s*\}/g;
    const translated = pattern.replace(regular, (match, key) => {
      return String(data[key]);
    });
    return translated;
  }
  if (isFunction(pattern)) {
    // 重要：组件的渲染必须存在参数 h，不能移除
    if (!args.length) return pattern(h);
    return pattern(...args);
  }
  return '';
};

/**
 * component globalConfig
 * @param componentName
 * @returns {t, globalConfig}
 * useConfig('pagination')
 */
export function useConfig<T extends keyof GlobalConfigProvider>(
  componentName: T = undefined,
  componentLocale?: GlobalConfigProvider[T],
) {
  const injectGlobalConfig = getCurrentInstance() ? inject(configProviderInjectKey, null) : globalConfigCopy;
  const mergedGlobalConfig = computed(() => injectGlobalConfig?.value || defaultGlobalConfig);
  // eslint-disable-next-line
  const globalConfig = computed(() => Object.assign({}, mergedGlobalConfig.value[componentName], componentLocale));

  const classPrefix = computed(() => {
    return mergedGlobalConfig.value.classPrefix;
  });

  return {
    t,
    global: globalConfig,
    globalConfig,
    classPrefix,
  };
}

/**
 * provide globalConfig
 * @param {TdConfigProviderProps} props
 * @returns {ComputedRef<GlobalConfigProvider>}
 */
export const provideConfig = (props: TdConfigProviderProps) => {
  const defaultData = cloneDeep(defaultGlobalConfig);
  const mergedGlobalConfig = computed(() => ({ ...mergeWith(defaultData, props.globalConfig) }));

  provide(configProviderInjectKey, mergedGlobalConfig);

  if (!globalConfigCopy.value) {
    globalConfigCopy.value = mergedGlobalConfig.value;
  }

  return mergedGlobalConfig;
};
