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
    default: '' as TdBaseTableProps['empty'],
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
    default: undefined as TdBaseTableProps['loading'],
  },
  /** 透传加载组件全部属性 */
  loadingProps: {
    type: Object as PropType<TdBaseTableProps['loadingProps']>,
  },
  /** 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px */
  maxHeight: {
    type: [String, Number] as PropType<TdBaseTableProps['maxHeight']>,
  },
  /** HTML 标签 `tr` 的属性。类型为 Function 时，参数说明：`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body` 表示属性作用于 `tbody` 中的元素；`params.type=foot` 表示属性作用于 `tfoot` 中的元素。<br />示例一：{ draggable: true }，<br />示例二：[{ draggable: true }, { title: '超出省略显示' }]。<br /> 示例三：() => [{ draggable: true }] */
  rowAttributes: {
    type: [Object, Array, Function] as PropType<TdBaseTableProps['rowAttributes']>,
  },
  /** 行类名，泛型 T 指表格数据类型。`params.row` 表示行数据；`params.rowIndex` 表示行下标；`params.type=body`  表示类名作用于 `tbody` 中的元素；`params.type= tfoot` 表示类名作用于 `tfoot` 中的元素 */
  rowClassName: {
    type: [String, Object, Array, Function] as PropType<TdBaseTableProps['rowClassName']>,
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
