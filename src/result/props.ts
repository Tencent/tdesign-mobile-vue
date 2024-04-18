/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdResultProps } from './type';
import { PropType } from 'vue';

export default {
  /** 描述文字 */
  description: {
    type: [String, Function] as PropType<TdResultProps['description']>,
  },
  /** 图标名称 */
  icon: {
    type: Function as PropType<TdResultProps['icon']>,
  },
  /** 图片地址 */
  image: {
    type: [String, Function] as PropType<TdResultProps['image']>,
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
  /** 标题 */
  title: {
    type: [String, Function] as PropType<TdResultProps['title']>,
    default: '',
  },
};
