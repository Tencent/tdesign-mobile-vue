/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdImageProps } from './type';
import { PropType } from 'vue';

export default {
  /** 图片描述 */
  alt: {
    type: String,
    default: '',
  },
  /** 自定义图片加载失败状态下的显示内容 */
  error: {
    type: [String, Function] as PropType<TdImageProps['error']>,
  },
  /** 图片填充模式 */
  fit: {
    type: String as PropType<TdImageProps['fit']>,
    default: 'fill' as TdImageProps['fit'],
    validator(val: TdImageProps['fit']): boolean {
      if (!val) return true;
      return ['contain', 'cover', 'fill', 'none', 'scale-down'].includes(val);
    },
  },
  /** 是否开启图片懒加载 */
  lazy: Boolean,
  /** 自定义加载中状态的图片内容，如：“加载中” */
  loading: {
    type: [String, Function] as PropType<TdImageProps['loading']>,
  },
  /** 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何单位，px 或者 百分比 */
  position: {
    type: String,
    default: 'center',
  },
  /** 图片圆角类型 */
  shape: {
    type: String as PropType<TdImageProps['shape']>,
    default: 'square' as TdImageProps['shape'],
    validator(val: TdImageProps['shape']): boolean {
      if (!val) return true;
      return ['circle', 'round', 'square'].includes(val);
    },
  },
  /** 图片链接 */
  src: {
    type: String,
    default: '',
  },
  /** 图片地址，支持特殊格式的图片，如 `.avif` 和 `.webp` */
  srcset: {
    type: Object as PropType<TdImageProps['srcset']>,
  },
  /** 图片加载失败时触发 */
  onError: Function as PropType<TdImageProps['onError']>,
  /** 图片加载完成时触发 */
  onLoad: Function as PropType<TdImageProps['onLoad']>,
};
