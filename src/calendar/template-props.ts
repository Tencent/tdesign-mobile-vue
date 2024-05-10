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
  /** 用于格式化日期的函数 */
  format: {
    type: Function as PropType<TdCalendarProps['format']>,
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
    type: [String, Function, Object] as PropType<TdCalendarProps['title']>,
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
  /** 是否使用弹出层包裹日历 */
  usePopup: {
    type: Boolean,
    default: true,
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
  /** 是否显示日历；`usePopup` 为 true 时有效 */
  visible: Boolean,
  /** 不显示 confirm-btn 时，完成选择时触发（暂不支持 type = multiple） */
  onChange: Function as PropType<TdCalendarProps['onChange']>,
  /** 关闭按钮时触发 */
  onClose: Function as PropType<TdCalendarProps['onClose']>,
  /** 点击确认按钮时触发 */
  onConfirm: Function as PropType<TdCalendarProps['onConfirm']>,
  /** 点击日期时触发 */
  onSelect: Function as PropType<TdCalendarProps['onSelect']>,
};
