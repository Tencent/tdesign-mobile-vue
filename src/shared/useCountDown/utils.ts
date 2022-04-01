import { TimeData, TdUseCountDownShowTimes } from './type';

/**
 * getRemainTimes
 * @param time
 * @returns
 */
export const getRemainTimes = (time?: number): TimeData => {
  if (!time) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
  }
  const stime = Math.floor(time / 1000); // 秒
  return {
    days: Math.floor(stime / 3600 / 24),
    hours: Math.floor((stime / 3600) % 24),
    minutes: Math.floor((stime / 60) % 60),
    seconds: stime % 60,
    milliseconds: time % 1000,
  };
};

/**
 * fillZero
 * @param num
 * @returns
 */
export const fillZero = (num: number): string | number => (num >= 10 ? num : `0${num}`);

/**
 * getMark
 * @param format
 * @param type
 * @returns
 */
export const getMark = (format: string, type: string): string => format?.split?.(type)?.[1]?.split?.('')?.[0];

/**
 * getShowTimes
 * @param time
 * @returns
 */
export const getShowTimes = (times: TimeData, format: string): TdUseCountDownShowTimes => {
  format = (format || 'DD:HH:mm:ss')?.toUpperCase?.();
  const showTimes: TdUseCountDownShowTimes = [];
  if (format?.indexOf('DD') > -1) {
    showTimes?.push({
      mark: getMark(format, 'DD'),
      value: fillZero(times?.days),
    });
  }
  if (format?.indexOf('HH') > -1) {
    showTimes?.push({
      mark: getMark(format, 'HH'),
      value: fillZero(times?.hours),
    });
  }
  if (format?.indexOf('MM') > -1) {
    showTimes?.push({
      mark: getMark(format, 'MM'),
      value: fillZero(times?.minutes),
    });
  }
  if (format?.indexOf('SS') > -1) {
    showTimes?.push({
      mark: getMark(format, 'SS'),
      value: fillZero(times?.seconds),
    });
  }
  if (format?.indexOf('SSS') > -1) {
    showTimes?.push({
      mark: getMark(format, 'SSS'),
      value: fillZero(times?.milliseconds),
    });
  }

  return showTimes;
};

/**
 * @param {number} targetCount 不小于1的整数，表示经过targetCount帧之后返回结果
 * @return {Promise<number>}
 */
export const getScreenFps = (() => {
  // 先做一下兼容性处理
  const nextFrame = [
    window.requestAnimationFrame,
    window.mozRequestAnimationFrame,
    window.webkitRequestAnimationFrame,
  ]?.find?.((fn) => fn);
  //
  if (!nextFrame) {
    console.error('requestAnimationFrame is not supported!');
    return;
  }
  return (targetCount = 50) => {
    if (targetCount < 1) {
      return;
    }
    let count = 0;
    const beginDate = Date.now();
    return new Promise((resolve) => {
      (function log() {
        nextFrame(() => {
          if (++count >= targetCount) {
            const diffDate = Date.now() - beginDate;
            const fps = (count / diffDate) * 1000;
            return resolve(fps);
          }
          log();
        });
      })();
    });
  };
})();
