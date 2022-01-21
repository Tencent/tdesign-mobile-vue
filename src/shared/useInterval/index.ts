import { ref } from 'vue';
import { NOOP } from '../functions';

export function useInterval(callback = NOOP, interval = 1000) {
  let timer: any = null;
  const isRunning = ref(false);

  const _clean = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const stop = () => {
    isRunning.value = false;
    _clean();
  };

  const resume = () => {
    if (interval <= 0) return;
    isRunning.value = true;
    _clean();
    timer = setInterval(function () {
      if (interval <= 0) {
        stop();
      }
      callback();
    }, interval);
  };

  const start = () => {
    resume();
  };

  return {
    isRunning,
    start,
    stop,
    resume,
  };
}
