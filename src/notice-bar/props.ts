/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdNoticeBarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 文本内容 */
  content: {
    type: [String, Array, Function] as PropType<TdNoticeBarProps['content']>,
  },
  /** 滚动方向 */
  direction: {
    type: String as PropType<TdNoticeBarProps['direction']>,
    default: 'horizontal' as TdNoticeBarProps['direction'],
    validator(val: TdNoticeBarProps['direction']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放 */
  marquee: {
    type: [Boolean, Object] as PropType<TdNoticeBarProps['marquee']>,
    default: false,
  },
  /** 右侧额外信息 */
  operation: {
    type: [String, Function] as PropType<TdNoticeBarProps['operation']>,
  },
  /** 前缀图标 */
  prefixIcon: {
    type: [Boolean, Function] as PropType<TdNoticeBarProps['prefixIcon']>,
    default: true,
  },
  /** 后缀图标 */
  suffixIcon: {
    type: Function as PropType<TdNoticeBarProps['suffixIcon']>,
  },
  /** 内置主题 */
  theme: {
    type: String as PropType<TdNoticeBarProps['theme']>,
    default: 'info' as TdNoticeBarProps['theme'],
    validator(val: TdNoticeBarProps['theme']): boolean {
      if (!val) return true;
      return ['info', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 显示/隐藏 */
  visible: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 显示/隐藏，非受控属性 */
  defaultVisible: Boolean,
  /** 点击事件 */
  onClick: Function as PropType<TdNoticeBarProps['onClick']>,
};
