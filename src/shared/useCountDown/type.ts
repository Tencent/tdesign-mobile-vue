/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-07 20:25:03
 * */

// import { TNode } from '../common';

export interface TdUseCountDownProps {
  /**
   * 是否自动开始倒计时
   * @default true
   */
  autoStart?: boolean;
  /**
   * 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
   * @default HH:mm:ss
   */
  format?: string;
  /**
   * 是否开启毫秒级渲染
   * @default false
   */
  millisecond?: boolean;
  /**
   * 倒计时时长，单位毫秒
   */
  time?: number;
  /**
   * 时间变化时触发
   */
  onChange?: (time: TimeData) => void;
  /**
   * 倒计时结束时触发
   */
  onFinish?: () => void;
}

export interface TimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/**
 * 显示时间
 */
export type TdUseCountDownShowTimes = Array<{ mark?: string; value?: string | number }>;

/**
 * TdUseCountDown
 */
export interface TdUseCountDown {
  time: { value: number };
  showTimes: TdUseCountDownShowTimes;
  pause?: () => void;
  resume?: () => void;
}
