/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-09-15 09:49:14
 * */

import { TdNoticeBarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 背景色 */
  bgColor: {
    type: String,
    default: '',
  },
  /** 文本颜色 */
  color: {
    type: String,
    default: '',
  },
  /** 文本内容 */
  content: {
    type: String,
    default: '',
  },
  /** 延迟 */
  delay: {
    type: Number,
    default: 0,
  },
  /** 详情 */
  detailText: {
    type: String,
    default: '',
  },
  /** 详情颜色 */
  detailTextColor: {
    type: String,
    default: '',
  },
  /** 图标颜色 */
  iconColor: {
    type: String,
    default: '',
  },
  /** 左边图标 */
  leftIcon: {
    type: Function as PropType<TdNoticeBarProps['leftIcon']>,
  },
  /** 模式 */
  mode: {
    type: String as PropType<TdNoticeBarProps['mode']>,
    validator(val: TdNoticeBarProps['mode']): boolean {
      return ['link', 'closeable'].includes(val);
    },
  },
  /** 左边图标 */
  rightIcon: {
    type: Function as PropType<TdNoticeBarProps['rightIcon']>,
  },
  /** 是否需要滚动 */
  scrollable: Boolean,
  /** 滚动速度 */
  speed: {
    type: Number,
    default: 50,
  },
  /** 显示与隐藏 */
  visible: {
    type: Boolean,
    default: true,
  },
  /** 显示与隐藏，非受控属性 */
  defaultVisible: {
    type: Boolean,
    default: true,
  },
  /** null */
  onClick: Function as PropType<TdNoticeBarProps['onClick']>,
  /** null */
  onClose: Function as PropType<TdNoticeBarProps['onClose']>,
  /** null */
  onDetail: Function as PropType<TdNoticeBarProps['onDetail']>,
};
