/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-21 00:07:39
 * */

import { TdMessageProps } from './type';
import { PropType } from 'vue';

export default {
  /** 文本对齐方式 */
  align: {
    type: String as PropType<TdMessageProps['align']>,
    default: 'left' as TdMessageProps['align'],
    validator(val: TdMessageProps['align']): boolean {
      return ['left', 'center'].includes(val);
    },
  },
  /** 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮 */
  closeBtn: {
    type: [String, Boolean, Function] as PropType<TdMessageProps['closeBtn']>,
    default: undefined,
  },
  /** 用于自定义消息弹出内容 */
  content: {
    type: String,
    default: '',
    required: true,
  },
  /** 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。 */
  duration: {
    type: Number,
    default: 3000,
  },
  /** 消息组件风格 */
  theme: {
    type: String as PropType<TdMessageProps['theme']>,
    default: 'info' as TdMessageProps['theme'],
    validator(val: TdMessageProps['theme']): boolean {
      return ['info', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 是否显示，隐藏时默认销毁组件 */
  visible: Boolean,
  /** 元素层级，样式默认为 5000 */
  zIndex: {
    type: Number,
  },
  /** 关闭Message时触发 */
  onClose: Function as PropType<TdMessageProps['onClose']>,
  /** 关闭Message时并且动画结束后触发 */
  onClosed: Function as PropType<TdMessageProps['onClosed']>,
  /** 展示Message时触发 */
  onOpen: Function as PropType<TdMessageProps['onOpen']>,
  /** 展示Message时并且动画结束后触发 */
  onOpened: Function as PropType<TdMessageProps['onOpened']>,
  /** 可见性变化时触发 */
  onVisibleChange: Function as PropType<TdMessageProps['onVisibleChange']>,
};
