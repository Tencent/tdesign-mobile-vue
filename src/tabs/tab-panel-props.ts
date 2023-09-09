/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTabPanelProps } from '../tabs/type';
import { PropType } from 'vue';

export default {
  /** 透传至 Badge 组件 */
  badgeProps: {
    type: Object as PropType<TdTabPanelProps['badgeProps']>,
  },
  /** 选项卡内容隐藏时是否销毁 */
  destroyOnHide: {
    type: Boolean,
    default: true,
  },
  /** 是否禁用当前选项卡 */
  disabled: Boolean,
  /** 选项卡名称，可自定义选项卡导航内容 */
  label: {
    type: [String, Function] as PropType<TdTabPanelProps['label']>,
  },
  /** 用于自定义选项卡面板内容 */
  panel: {
    type: [String, Function] as PropType<TdTabPanelProps['panel']>,
  },
  /** 选项卡的值，唯一标识 */
  value: {
    type: [String, Number] as PropType<TdTabPanelProps['value']>,
  },
};
