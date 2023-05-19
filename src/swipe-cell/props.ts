/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSwipeCellProps } from './type';
import { PropType } from 'vue';

export default {
  /** 操作项以外的内容 */
  content: {
    type: [String, Function] as PropType<TdSwipeCellProps['content']>,
  },
  /** 操作项以外的内容，同 content */
  default: {
    type: [String, Function] as PropType<TdSwipeCellProps['default']>,
  },
  /** 是否禁用滑动 */
  disabled: Boolean,
  /** 左侧滑动操作项。所有行为同 `right` */
  left: {
    type: [Array, Function] as PropType<TdSwipeCellProps['left']>,
  },
  /** 操作项是否呈现为打开态，值为数组时表示分别控制左右滑动的展开和收起状态 */
  opened: {
    type: [Boolean, Array] as PropType<TdSwipeCellProps['opened']>,
    default: false,
  },
  /** 右侧滑动操作项。有两种定义方式，一种是使用数组，二种是使用插槽。`right.text` 表示操作文本，`right.className` 表示操作项类名，`right.style` 表示操作项样式，`right.onClick` 表示点击操作项后执行的回调函数。示例：`[{ text: '删除', style: 'background-color: red', onClick: () => {} }]` */
  right: {
    type: [Array, Function] as PropType<TdSwipeCellProps['right']>,
  },
  /** 菜单展开或者收回后将菜单的状态传递给父组件，值为数组时表示分别控制左右滑动的展开和收起状态。 */
  onChange: Function as PropType<TdSwipeCellProps['onChange']>,
  /** 操作项点击时触发（插槽写法组件不触发，业务侧自定义内容和事件） */
  onClick: Function as PropType<TdSwipeCellProps['onClick']>,
};
