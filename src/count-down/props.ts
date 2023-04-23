/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCountDownProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否自动开始倒计时 */
  autoStart: {
    type: Boolean,
    default: true,
  },
  /** 最终倒计时的展示内容，值为'default'时使用默认的格式，否则使用自定义样式插槽 */
  content: {
    type: [String, Function] as PropType<TdCountDownProps['content']>,
    default: 'default',
  },
  /** 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /** 是否开启毫秒级渲染 */
  millisecond: Boolean,
  /** 倒计时尺寸 */
  size: {
    type: String as PropType<TdCountDownProps['size']>,
    default: 'medium' as TdCountDownProps['size'],
    validator(val: TdCountDownProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 使用时间单位分割 */
  splitWithUnit: Boolean,
  /** 倒计时风格 */
  theme: {
    type: String as PropType<TdCountDownProps['theme']>,
    default: 'default' as TdCountDownProps['theme'],
    validator(val: TdCountDownProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'round', 'square'].includes(val);
    },
  },
  /** 倒计时时长，单位毫秒 */
  time: {
    type: Number,
    required: true,
  },
  /** 时间变化时触发 */
  onChange: Function as PropType<TdCountDownProps['onChange']>,
  /** 倒计时结束时触发 */
  onFinish: Function as PropType<TdCountDownProps['onFinish']>,
};
