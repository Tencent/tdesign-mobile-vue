import { watch, ref, reactive } from 'vue';
import { TdUseCountDownProps, TdUseCountDown } from './type';
import { getRemainTimes, getShowTimes } from './utils';

export function useCountDown(props: TdUseCountDownProps): TdUseCountDown {
  const { format = 'HH:mm:ss', millisecond, onFinish, onChange } = props || {};

  // state
  const time = ref(Number(props?.time || 0));
  const showTimes = reactive(getShowTimes(getRemainTimes(time?.value), format));

  // 开始倒计时 处理
  const interval = millisecond ? 200 : 1000; // 间隔
  const StartCountdown = () => {
    const timer: any = setInterval(() => {
      if (time.value <= 0) {
        onFinish?.();
        return clearInterval(timer);
      }
      //
      const times = getRemainTimes(time.value);
      onChange?.(times);
      if (millisecond) {
        time.value -= 200;
      } else {
        time.value -= 1000;
      }
      getShowTimes(times, format)?.forEach?.((i, idx) => {
        showTimes[idx].value = i?.value;
      });
    }, interval);
  };

  // autoStart为true开始倒计时
  props?.autoStart && StartCountdown();

  /**
   * return
   */
  return {
    time,
    showTimes,
  };
}
