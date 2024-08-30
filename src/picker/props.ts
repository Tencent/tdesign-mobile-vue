/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPickerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 取消按钮文字 */
  cancelBtn: {
    type: [String, Boolean] as PropType<TdPickerProps['cancelBtn']>,
    default: true,
  },
  /** 配置每一列的选项 */
  columns: {
    type: [Array, Function] as PropType<TdPickerProps['columns']>,
    default: (): TdPickerProps['columns'] => [],
    required: true,
  },
  /** 确定按钮文字 */
  confirmBtn: {
    type: [String, Boolean] as PropType<TdPickerProps['confirmBtn']>,
    default: true,
  },
  /** 自定义头部内容 */
  header: {
    type: Function as PropType<TdPickerProps['header']>,
  },
  /** 自定义label */
  renderLabel: {
    type: Function as PropType<TdPickerProps['renderLabel']>,
  },
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  /** 选中值 */
  value: {
    type: Array as PropType<TdPickerProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: Array as PropType<TdPickerProps['value']>,
    default: undefined,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdPickerProps['defaultValue']>,
  },
  /** 点击取消按钮时触发 */
  onCancel: Function as PropType<TdPickerProps['onCancel']>,
  /** 选中变化时候触发 */
  onChange: Function as PropType<TdPickerProps['onChange']>,
  /** 点击确认按钮时触发 */
  onConfirm: Function as PropType<TdPickerProps['onConfirm']>,
  /** 任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标 */
  onPick: Function as PropType<TdPickerProps['onPick']>,
};
