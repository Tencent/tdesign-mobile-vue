import { nextTick } from 'vue';
import { vi } from 'vitest';
import type { PickerColumn } from '../type';
import { DEFAULT_ITEM_HEIGHT } from '../picker.class';
import { DEFAULT_WHEEL_CONFIG } from '../constants';

/** 测试数据：季节单列 */
export const seasonOptions: PickerColumn = [
  { label: '春', value: 'spring' },
  { label: '夏', value: 'summer' },
  { label: '秋', value: 'autumn' },
  { label: '冬', value: 'winter' },
];

interface TouchPoint {
  pageY: number;
}

/** jsdom 的 Event 实例没有触摸信息，这里手动补充 changedTouches 后派发触摸事件 */
export const makeTouch = (el: Element, eventName: string, touchPoint?: TouchPoint) => {
  const event = new Event(eventName);
  if (touchPoint) {
    Object.defineProperty(event, 'changedTouches', { value: [touchPoint] });
  }

  el.dispatchEvent(event);
};

/**
 * 模拟慢速滚动 distance 个选项。
 * 借助 fake timers 把 touchend 与 touchstart 的时间差推进到超过惯性时间阈值，
 * 从而跳过惯性动画，让滚轮停留在被滑过的选项上
 */
export const simulateMoveOption = async (optionContainerEl: Element, distance: number) => {
  makeTouch(optionContainerEl, 'touchstart', { pageY: 0 });
  makeTouch(optionContainerEl, 'touchmove', { pageY: -distance * DEFAULT_ITEM_HEIGHT });

  vi.useFakeTimers().advanceTimersByTime(DEFAULT_WHEEL_CONFIG.inertiaTimeThreshold + 1);
  makeTouch(optionContainerEl, 'touchend', { pageY: -distance * DEFAULT_ITEM_HEIGHT });
  vi.useRealTimers();

  await nextTick();
};
