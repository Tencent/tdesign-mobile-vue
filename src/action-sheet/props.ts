/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-07 19:30:36
 * */

import { TdActionSheetProps } from './type';
import { PropType } from 'vue';

export default {
  /** 设置取消按钮的文本 */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 设置每页展示菜单的数量，仅当 type=grid 时有效 */
  count: {
    type: Number,
    default: 8,
  },
  /** 菜单项 */
  items: {
    type: Array as PropType<TdActionSheetProps['items']>,
    required: true,
  },
  /** 是否显示取消按钮 */
  showCancel: {
    type: Boolean,
    default: true,
  },
  /** 展示类型，列表和表格形式展示 */
  theme: {
    type: String as PropType<TdActionSheetProps['theme']>,
    default: 'list' as TdActionSheetProps['theme'],
    validator(val: TdActionSheetProps['theme']): boolean {
      return ['list', 'grid'].includes(val);
    },
  },
  /** 显示与隐藏 */
  visible: Boolean,
  /** 显示与隐藏，非受控属性 */
  defaultVisible: Boolean,
  /** 点击取消按钮时触发 */
  onCancel: Function as PropType<TdActionSheetProps['onCancel']>,
  /** 关闭时触发 */
  onClose: Function as PropType<TdActionSheetProps['onClose']>,
  /** 选择菜单项时触发 */
  onSelect: Function as PropType<TdActionSheetProps['onSelect']>,
};
