import { PropType } from 'vue';
import { TdResultProps } from './type';

export default {
  /** 描述文字 */
  description: {
    type: [String, Function] as PropType<TdResultProps['description']>,
  },
  /** 图标名称 */
  icon: {
    type: [String, Function] as PropType<TdResultProps['icon']>,
  },
  /** 图片地址 */
  image: {
    type: [String, Function] as PropType<TdResultProps['image']>,
  },
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdResultProps['title']>,
  },
  /** 内置主题 */
  theme: {
    type: String as PropType<TdResultProps['theme']>,
    default: 'default' as TdResultProps['theme'],
    validator(val: TdResultProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 透传 Image 组件全部属性 */
  imageProps: {
    type: Object as PropType<TdResultProps['imageProps']>,
  },
};
