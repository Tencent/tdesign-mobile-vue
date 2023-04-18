/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdMessageProps } from './type';
import { PropType } from 'vue';

export default {
  /** 文本对齐方式 */
  align: {
    type: String as PropType<TdMessageProps['align']>,
    default: 'left' as TdMessageProps['align'],
    validator(val: TdMessageProps['align']): boolean {
      if (!val) return true;
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
  /** 用于自定义消息前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标 */
  icon: {
    type: [Boolean, Function] as PropType<TdMessageProps['icon']>,
    default: true,
  },
  /** 链接名称。值为字符串表示链接名称，值为 Object 类型，表示透传至 Link */
  link: {
    type: [String, Object, Function] as PropType<TdMessageProps['link']>,
  },
  /** 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放 */
  marquee: {
    type: [Boolean, Object] as PropType<TdMessageProps['marquee']>,
    default: false,
  },
  /** 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10rpx', '8rpx'] */
  offset: {
    type: Array as PropType<TdMessageProps['offset']>,
  },
  /** 消息组件风格 */
  theme: {
    type: String as PropType<TdMessageProps['theme']>,
    default: 'info' as TdMessageProps['theme'],
    validator(val: TdMessageProps['theme']): boolean {
      if (!val) return true;
      return ['info', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 是否显示，隐藏时默认销毁组件 */
  visible: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示，隐藏时默认销毁组件，非受控属性 */
  defaultVisible: Boolean,
  /** 元素层级，样式默认为 5000 */
  zIndex: {
    type: Number,
  },
  /** 已废弃。可见性变化时触发 */
  onChange: Function as PropType<TdMessageProps['onChange']>,
  /** 已废弃。关闭消息时触发 */
  onClose: Function as PropType<TdMessageProps['onClose']>,
  /** 当关闭按钮存在时，用户点击关闭按钮触发 */
  onCloseBtnClick: Function as PropType<TdMessageProps['onCloseBtnClick']>,
  /** 已废弃。关闭消息并且动画结束后触发 */
  onClosed: Function as PropType<TdMessageProps['onClosed']>,
  /** 计时结束后触发 */
  onDurationEnd: Function as PropType<TdMessageProps['onDurationEnd']>,
  /** 当link链接存在时，点击链接文本时触发 */
  onLinkClick: Function as PropType<TdMessageProps['onLinkClick']>,
  /** 已废弃。展示Message时触发 */
  onOpen: Function as PropType<TdMessageProps['onOpen']>,
  /** 已废弃。展示Message时并且动画结束后触发 */
  onOpened: Function as PropType<TdMessageProps['onOpened']>,
};
