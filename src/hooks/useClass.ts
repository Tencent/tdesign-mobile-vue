import { computed, ref } from 'vue';
import { useConfig } from '../config-provider/useConfig';

export function usePrefixClass(componentName?: string) {
  const { classPrefix } = useConfig('classPrefix');

  return computed(() => {
    return componentName ? `${classPrefix.value}-${componentName}` : classPrefix.value;
  });
}
