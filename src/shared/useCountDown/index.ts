import { ref, reactive } from 'vue';
import { useRafFn } from '@vueuse/core';
import { TdUseCountDownProps, TdUseCountDown } from './type';
import { getRemainTimes, getShowTimes, getScreenFps } from './utils';
import { isBrowser } from '../util';

export function useCountDown(props: TdUseCountDownProps): TdUseCountDown {
  const {
    time = 0,
    autoStart,
    millisecond = false,
    format = 'HH:mm:ss',
    splitWithUnit = false,
    onFinish,
    onChange,
  } = props || {};
  // state
  const fps = ref();
  const count = ref(Number(time));
  const showTimes = reactive(getShowTimes(getRemainTimes(time), format, millisecond, splitWithUnit));

  // raf
  const { pause, resume } = useRafFn(
    async () => {
      if (!isBrowser) return;
      if (!fps.value) {
        const res = await getScreenFps?.();
        fps.value = res || 60;
      }
      count.value = parseInt(`${Number(count.value) - 1000 / fps.value}`, 10);
      if (count.value <= 0) {
        pause?.();
        count.value = 0;
      }
      const times = getRemainTimes(count.value);
      onChange?.(times);
      count.value === 0 && onFinish?.();
      getShowTimes(times, format, millisecond, splitWithUnit)?.forEach?.((i, idx) => (showTimes[idx].value = i?.value));
    },
    { immediate: autoStart },
  );

  /**
   * return
   */
  return { time: count, showTimes, pause, resume };
}
