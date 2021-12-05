/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-02 17:06:42
 * */

import { TdSliderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 刻度标记，示例：[0, 10, 40, 200] 或者 { 5:  '5¥', 10: '10%' } */
  marks: {
    type: [Object, Array] as PropType<TdSliderProps['marks']>,
    default: () => ({}),
  },
  /** 滑块范围最大值 */
  max: {
    type: Number,
    default: 100,
  },
  /** 滑块范围最小值 */
  min: {
    type: Number,
    default: 0,
  },
  /** 双游标滑块 */
  range: Boolean,
  /** 是否显示当前滑动的值 */
  showValue: Boolean,
  /** 步长 */
  step: {
    type: Number,
    default: 1,
  },
  /** 滑块值变化时触发 */
  onChange: Function as PropType<TdSliderProps['onChange']>,
  /** 结束拖动时触发 */
  onDragEnd: Function as PropType<TdSliderProps['onDragEnd']>,
  /** 开始拖动时触发 */
  onDragStart: Function as PropType<TdSliderProps['onDragStart']>,
};
