/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDateTimePickerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 取消按钮文字 */
  cancelBtn: {
    type: String,
    default: '取消',
  },
  /** 确定按钮文字 */
  confirmBtn: {
    type: String,
    default: '',
  },
  /** 选择器的最大可选时间，默认为当前时间+10年 */
  end: {
    type: [String, Number] as PropType<TdDateTimePickerProps['end']>,
  },
  /** 底部内容 */
  footer: {
    type: Function as PropType<TdDateTimePickerProps['footer']>,
    default: true,
  },
  /** 用于pick、change、confirm事件参数格式化[详细文档](https://day.js.org/docs/en/display/format) */
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss',
  },
  /** 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 TNode 表示自定义头部内容 */
  header: {
    type: [Boolean, Function] as PropType<TdDateTimePickerProps['header']>,
    default: true,
  },
  /** year = 年；month = 年月；date = 年月日；hour = 年月日时； minute = 年月日时分；当类型为数组时，第一个值控制年月日，第二个值控制时分秒 */
  mode: {
    type: [String, Array] as PropType<TdDateTimePickerProps['mode']>,
    default: 'date',
  },
  /** 自定义label */
  renderLabel: {
    type: Function as PropType<TdDateTimePickerProps['renderLabel']>,
  },
  /** 【开发中】是否在日期旁边显示周几（如周一，周二，周日等） */
  showWeek: Boolean,
  /** 选择器的最小可选时间，默认为当前时间-10年 */
  start: {
    type: [String, Number] as PropType<TdDateTimePickerProps['start']>,
  },
  /** 标题 */
  title: {
    type: String,
    default: '选择时间',
  },
  /** 选中值 */
  value: {
    type: [String, Number] as PropType<TdDateTimePickerProps['value']>,
  },
  modelValue: {
    type: [String, Number] as PropType<TdDateTimePickerProps['value']>,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdDateTimePickerProps['defaultValue']>,
  },
  /** 取消按钮点击时触发 */
  onCancel: Function as PropType<TdDateTimePickerProps['onCancel']>,
  /** value改变时触发 */
  onChange: Function as PropType<TdDateTimePickerProps['onChange']>,
  /** 确认按钮点击时触发 */
  onConfirm: Function as PropType<TdDateTimePickerProps['onConfirm']>,
  /** 选中值发生变化时触发 */
  onPick: Function as PropType<TdDateTimePickerProps['onPick']>,
};
