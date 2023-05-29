/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdBaseTableProps } from '../table/type';
import { PropType } from 'vue';

export default {
  /** 是否显示表格边框 */
  bordered: Boolean,
  /** 单元格数据为空时呈现的内容 */
  cellEmptyContent: {
    type: [String, Function] as PropType<TdBaseTableProps['cellEmptyContent']>,
  },
  /** 列配置，泛型 T 指表格数据类型 */
  columns: {
    type: Array as PropType<TdBaseTableProps['columns']>,
    default: (): TdBaseTableProps['columns'] => [],
  },
  /** 数据源，泛型 T 指表格数据类型 */
  data: {
    type: Array as PropType<TdBaseTableProps['data']>,
    default: (): TdBaseTableProps['data'] => [],
  },
  /** 空表格呈现样式，支持全局配置 `GlobalConfigProvider` */
  empty: {
    type: [String, Function] as PropType<TdBaseTableProps['empty']>,
    default: '',
  },
  /** 固定行（冻结行），示例：[M, N]，表示冻结表头 M 行和表尾 N 行。M 和 N 值为 0 时，表示不冻结行 */
  fixedRows: {
    type: Array as PropType<TdBaseTableProps['fixedRows']>,
  },
  /** 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight` */
  height: {
    type: [String, Number] as PropType<TdBaseTableProps['height']>,
  },
  /** 加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态 */
  loading: {
    type: [Boolean, Function] as PropType<TdBaseTableProps['loading']>,
    default: undefined,
  },
  /** 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px */
  maxHeight: {
    type: [String, Number] as PropType<TdBaseTableProps['maxHeight']>,
  },
  /** 唯一标识一行数据的字段名，来源于 `data` 中的字段。如果是字段嵌套多层，可以设置形如 `item.a.id` 的方法 */
  rowKey: {
    type: String,
    default: 'id',
    required: true,
  },
  /** 是否显示表头 */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /** 是否显示斑马纹 */
  stripe: Boolean,
  /** 表格内容的总宽度，注意不是表格可见宽度。主要应用于 `table-layout: auto` 模式下的固定列显示。`tableContentWidth` 内容宽度的值必须大于表格可见宽度 */
  tableContentWidth: {
    type: String,
    default: '',
  },
  /** 表格布局方式 */
  tableLayout: {
    type: String as PropType<TdBaseTableProps['tableLayout']>,
    default: 'fixed' as TdBaseTableProps['tableLayout'],
    validator(val: TdBaseTableProps['tableLayout']): boolean {
      if (!val) return true;
      return ['auto', 'fixed'].includes(val);
    },
  },
  /** 行内容上下方向对齐 */
  verticalAlign: {
    type: String as PropType<TdBaseTableProps['verticalAlign']>,
    default: 'middle' as TdBaseTableProps['verticalAlign'],
    validator(val: TdBaseTableProps['verticalAlign']): boolean {
      if (!val) return true;
      return ['top', 'middle', 'bottom'].includes(val);
    },
  },
  /** 单元格点击时触发 */
  onCellClick: Function as PropType<TdBaseTableProps['onCellClick']>,
  /** 行点击时触发，泛型 T 指表格数据类型 */
  onRowClick: Function as PropType<TdBaseTableProps['onRowClick']>,
  /** 表格内容滚动时触发 */
  onScroll: Function as PropType<TdBaseTableProps['onScroll']>,
};
