import { getCurrentInstance } from 'vue';

// expose public api
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy as object, apis);
  }
}
