import { getCurrentInstance, Ref } from 'vue';

export const initName = (defaultIndex: Ref<number>): number | string | unknown => {
  const index = defaultIndex;
  const instance = getCurrentInstance();
  if (typeof instance?.props?.name !== 'undefined') {
    return instance?.props?.name;
  };
  index.value += 1;
  return index.value;
};
