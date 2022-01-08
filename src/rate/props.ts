/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-31 11:51:01
 * */

import { TdRateProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许半选 */
  allowHalf: Boolean,
  /** 是否允许取消选择 */
  clearable: Boolean,
  /** 评分图标的颜色，样式中默认为 #ED7B2F */
  color: {
    type: String,
    default: '',
  },
  /** 评分的数量 */
  count: {
    type: Number,
    default: 5,
  },
  /** 是否为只读 */
  readonly: Boolean,
  /** 是否显示对应的辅助文字 */
  showText: Boolean,
  /** 评分图标的大小，示例：`20` */
  size: {
    type: String,
    default: '',
  },
  /** 自定义评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分'] */
  texts: {
    type: Array as PropType<TdRateProps['texts']>,
  },
  /** 选择评分的值 */
  value: {
    type: Number,
    default: 0,
    required: true,
  },
  /** 选择评分的值，非受控属性 */
  defaultValue: {
    type: Number,
    default: 0,
    required: true,
  },
  /** 评分数改变时触发 */
  onChange: Function as PropType<TdRateProps['onChange']>,
};
