/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDrawerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body */
  attach: {
    type: [String, Function] as PropType<TdDrawerProps['attach']>,
  },
  /** 点击蒙层时是否触发抽屉关闭事件 */
  closeOnOverlayClick: {
    type: Boolean,
    default: undefined,
  },
  /** 抽屉关闭时是否销毁节点 */
  destroyOnClose: Boolean,
  /** 抽屉的底部 */
  footer: {
    type: Function as PropType<TdDrawerProps['footer']>,
  },
  /** 抽屉里的列表项 */
  items: {
    type: Array as PropType<TdDrawerProps['items']>,
  },
  /** 抽屉方向 */
  placement: {
    type: String as PropType<TdDrawerProps['placement']>,
    default: 'right' as TdDrawerProps['placement'],
    validator(val: TdDrawerProps['placement']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 是否显示遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 抽屉的标题 */
  title: {
    type: [String, Function] as PropType<TdDrawerProps['title']>,
  },
  /** 组件是否可见 */
  visible: Boolean,
  /** 抽屉层级，样式默认为 1500 */
  zIndex: {
    type: Number,
  },
  /** 关闭时触发 */
  onClose: Function as PropType<TdDrawerProps['onClose']>,
  /** 点击抽屉里的列表项 */
  onItemClick: Function as PropType<TdDrawerProps['onItemClick']>,
  /** 如果蒙层存在，点击蒙层时触发 */
  onOverlayClick: Function as PropType<TdDrawerProps['onOverlayClick']>,
};
