/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdPopoverProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否在点击外部元素后关闭菜单  */
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  /** 确认框内容 */
  content: {
    type: [String, Function] as PropType<TdPopoverProps['content']>,
  },
  /** 触发元素，同 triggerElement */
  default: {
    type: [String, Function] as PropType<TdPopoverProps['default']>,
  },
  /** 浮层出现位置 */
  placement: {
    type: String as PropType<TdPopoverProps['placement']>,
    default: 'top' as TdPopoverProps['placement'],
    validator(val: TdPopoverProps['placement']): boolean {
      if (!val) return true;
      return [
        'top',
        'left',
        'right',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
      ].includes(val);
    },
  },
  /** 是否显示浮层箭头 */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /** 弹出气泡主题。 */
  theme: {
    type: String as PropType<TdPopoverProps['theme']>,
    default: 'dark' as TdPopoverProps['theme'],
    validator(val: TdPopoverProps['theme']): boolean {
      if (!val) return true;
      return ['dark', 'light', 'brand', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 触发元素 */
  triggerElement: {
    type: [String, Function] as PropType<TdPopoverProps['triggerElement']>,
  },
  /** 是否显示气泡确认框 */
  visible: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示气泡确认框，非受控属性 */
  defaultVisible: Boolean,
  /** 确认框显示或隐藏时触发 */
  onVisibleChange: Function as PropType<TdPopoverProps['onVisibleChange']>,
};
