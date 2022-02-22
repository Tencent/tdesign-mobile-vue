import { watch, ref, reactive } from 'vue';
import { useRafFn } from '@vueuse/core';
import { TdUseCountDownProps, TdUseCountDown } from './type';
import { getRemainTimes, getShowTimes } from './utils';

export function useCountDown(props: TdUseCountDownProps): TdUseCountDown {
  const { time = 0, autoStart, millisecond, format = 'HH:mm:ss', onFinish, onChange } = props || {};
  // state
  const count = ref(Number(time));
  const showTimes = reactive(getShowTimes(getRemainTimes(time), format));

  // raf
  const { pause, resume } = useRafFn(
    () => {
      count.value = parseInt(`${Number(count.value) - 1000 / 60}`, 10);
      if (count.value <= 0) {
        pause?.();
        count.value = 0;
      }
      // console.log('count:', count.value);
      const times = getRemainTimes(count.value);
      onChange?.(times);
      count.value === 0 && onFinish?.();
      getShowTimes(times, format)?.forEach?.((i, idx) => (showTimes[idx].value = i?.value));
    },
    { immediate: autoStart },
  );

  /**
   * return
   */
  return { time: count, showTimes, pause, resume };
}
