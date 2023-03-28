/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdEmptyProps } from './type';
import { PropType } from 'vue';

export default {
  /** 操作按钮 */
  action: {
    type: Function as PropType<TdEmptyProps['action']>,
  },
  /** 描述文字 */
  description: {
    type: [String, Function] as PropType<TdEmptyProps['description']>,
  },
  /** 图标 */
  icon: {
    type: [String, Function] as PropType<TdEmptyProps['icon']>,
  },
  /** 图片地址 */
  image: {
    type: [String, Function] as PropType<TdEmptyProps['image']>,
  },
};
