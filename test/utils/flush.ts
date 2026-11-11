import { nextTick } from 'vue';
import { vi } from 'vitest';

/**
 * 等待两轮微任务：覆盖「渲染 → watcher / 插件调度 → 再渲染」的更新链路。
 * 适合等待 teleport 挂载、popper 定位应用、插件实例翻转 visible 等场景。
 */
export const flush = async () => {
  await nextTick();
  await nextTick();
};

/**
 * 在 fake timers 下跑完全部过渡 / 动画定时器，并等待期间触发的卸载与重渲染完成。
 * 需配合 `vi.useFakeTimers()` 使用。
 */
export const finishTransitions = async () => {
  await nextTick();
  await vi.runAllTimersAsync();
  await nextTick();
};
