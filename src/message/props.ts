/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-09-19 22:44:54
 * */

import { TdMessageProps } from './type';
import { PropType } from 'vue';

export default {
  /** 操作 */
  action: {
    type: [String, Function] as PropType<TdMessageProps['action']>,
  },
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
    type: [String, Function] as PropType<TdMessageProps['content']>,
  },
  /** 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。 */
  duration: {
    type: Number,
    default: 3000,
  },
  /** 消息提醒前面的图标。值为 true 则根据 theme 显示对应的图标，值为 false 则不显示图标。值为 'info' 或 'bell' 则显示组件内置图标。也可以完全自定义图标节点 */
  icon: {
    type: [String, Boolean, Function] as PropType<TdMessageProps['icon']>,
    default: true,
  },
  /** 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放 */
  marquee: {
    type: [Boolean, Object] as PropType<TdMessageProps['marquee']>,
    default: false,
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
  /** 当操作按钮存在时，用户点击操作按钮时触发 */
  onActionBtnClick: Function as PropType<TdMessageProps['onActionBtnClick']>,
  /** 当关闭按钮存在时，用户点击关闭按钮触发 */
  onCloseBtnClick: Function as PropType<TdMessageProps['onCloseBtnClick']>,
  /** 计时结束后触发 */
  onDurationEnd: Function as PropType<TdMessageProps['onDurationEnd']>,
};
