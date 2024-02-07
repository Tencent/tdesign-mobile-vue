/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCalendarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。 */
  confirmBtn: {
    type: [String, Object, Function] as PropType<TdCalendarProps['confirmBtn']>,
    default: '',
  },
  /** 第一天从星期几开始，默认 0 = 周日 */
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  /** 最大可选的日期，不传则默认半年后 */
  maxDate: {
    type: [Number, Date] as PropType<TdCalendarProps['maxDate']>,
  },
  /** 最小可选的日期，不传则默认今天 */
  minDate: {
    type: [Number, Date] as PropType<TdCalendarProps['minDate']>,
  },
  /** 标题，不传默认为“请选择日期” */
  title: {
    type: String,
    default: '',
  },
  /** 日历的选择类型，single = 单选；multiple = 多选; range = 区间选择 */
  type: {
    type: String as PropType<TdCalendarProps['type']>,
    default: 'single' as TdCalendarProps['type'],
    validator(val: TdCalendarProps['type']): boolean {
      if (!val) return true;
      return ['single', 'multiple', 'range'].includes(val);
    },
  },
  /** 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组 */
  value: {
    type: [Number, Array, Date] as PropType<TdCalendarProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [Number, Array, Date] as PropType<TdCalendarProps['value']>,
    default: undefined,
  },
  /** 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组，非受控属性 */
  defaultValue: {
    type: [Number, Array, Date] as PropType<TdCalendarProps['defaultValue']>,
  },
  /** 是否显示日历 */
  visible: Boolean,
};
