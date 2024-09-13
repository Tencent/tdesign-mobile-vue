import { ref } from 'vue';
import { isBrowser } from '../shared';

export const supportsPassive = ref(false);

if (!isBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive.value = true;
        return true; // 添加返回值
      },
    });
    window.addEventListener('test-passive', null as any, opts);
  } catch (e) {
    //
  }
}
