/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdIndexesProps } from './type';
import { PropType } from 'vue';

export default {
  /** 列表高度，未设置默认占满设备高度 */
  height: {
    type: Number,
  },
  /** 索引列表的列表数据。每个元素包含三个子元素，index(string)：索引值，例如1，2，3，...或A，B，C等；title(string): 索引标题，可不填将默认设为索引值；children(Array<{title: string}>): 子元素列表，title为子元素的展示文案。 */
  list: {
    type: Array as PropType<TdIndexesProps['list']>,
    default: (): TdIndexesProps['list'] => [],
    required: true,
  },
  /** 索引是否吸顶，默认为true */
  sticky: {
    type: Boolean,
    default: true,
  },
  /** 点击行元素时触发事件 */
  onSelect: Function as PropType<TdIndexesProps['onSelect']>,
};
