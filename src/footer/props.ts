/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdFooterProps } from './type';
import { PropType } from 'vue';

export default {
  /** 链接列表。name 表示链接名称， url 表示跳转链接，target 表示跳转方式，如：当前页面打开、新页面打开等，同 HTML 属性 target 含义相同 */
  links: {
    type: Array as PropType<TdFooterProps['links']>,
    default: (): TdFooterProps['links'] => [],
  },
  /** 图标配置。`logo.icon` 表示图标链接地址，`logo.title` 表示标题文本，`logo.url` 表示链接跳转地址，`logo.target` 表示跳转方式 */
  logo: {
    type: Object as PropType<TdFooterProps['logo']>,
  },
  /** 版权信息 */
  text: {
    type: String,
    default: '',
  },
};
