/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdImageViewerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮 */
  closeBtn: {
    type: [Boolean, Function] as PropType<TdImageViewerProps['closeBtn']>,
    default: true,
  },
  /** 是否显示删除操作，前提需要开启页码 */
  deleteBtn: {
    type: [Boolean, Function] as PropType<TdImageViewerProps['deleteBtn']>,
    default: false,
  },
  /** 图片数组 */
  images: {
    type: Array as PropType<TdImageViewerProps['images']>,
    default: (): TdImageViewerProps['images'] => [],
  },
  /** 当前预览图片所在的下标 */
  index: {
    type: Number,
    default: undefined,
  },
  /** 当前预览图片所在的下标，非受控属性 */
  defaultIndex: {
    type: Number,
  },
  /** 【开发中】最大放大比例 */
  maxZoom: {
    type: Number,
    default: 3,
  },
  /** 是否显示页码 */
  showIndex: Boolean,
  /** 隐藏/显示预览 */
  visible: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 隐藏/显示预览，非受控属性 */
  defaultVisible: Boolean,
  /** 关闭时触发 */
  onClose: Function as PropType<TdImageViewerProps['onClose']>,
  /** 点击删除操作按钮时触发 */
  onDelete: Function as PropType<TdImageViewerProps['onDelete']>,
  /** 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片 */
  onIndexChange: Function as PropType<TdImageViewerProps['onIndexChange']>,
};
