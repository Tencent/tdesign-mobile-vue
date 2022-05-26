/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSliderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值 */
  label: {
    type: [String, Boolean, Function] as PropType<TdSliderProps['label']>,
    default: true,
  },
  /** 刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + '%', 50: (h) => <button>50</button> }` */
  marks: {
    type: [Object, Array] as PropType<TdSliderProps['marks']>,
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
  /** 是否边界值 */
  showExtremeValue: Boolean,
  /** 步长 */
  step: {
    type: Number,
    default: 1,
  },
  /** 滑块值 */
  value: {
    type: [Number, Array] as PropType<TdSliderProps['value']>,
  },
  modelValue: {
    type: [Number, Array] as PropType<TdSliderProps['value']>,
  },
  /** 滑块值，非受控属性 */
  defaultValue: {
    type: [Number, Array] as PropType<TdSliderProps['defaultValue']>,
  },
  /** 滑块值变化时触发 */
  onChange: Function as PropType<TdSliderProps['onChange']>,
  /** 结束拖动时触发 */
  onDragend: Function as PropType<TdSliderProps['onDragend']>,
  /** 开始拖动时触发 */
  onDragstart: Function as PropType<TdSliderProps['onDragstart']>,
};
