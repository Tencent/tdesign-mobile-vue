:: BASE_DOC ::

## API

### BaseTable Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bordered | Boolean | false | 是否显示表格边框 | N
cellEmptyContent | String / Slot / Function | - | 单元格数据为空时呈现的内容。TS 类型：`string \| TNode<BaseTableCellParams<T>>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
columns | Array | [] | 列配置，泛型 T 指表格数据类型。TS 类型：`Array<BaseTableCol<T>>` | N
data | Array | [] | 数据源，泛型 T 指表格数据类型。TS 类型：`Array<T>` | N
empty | String / Slot / Function | '' | 空表格呈现样式，支持全局配置 `GlobalConfigProvider`。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
fixedRows | Array | - | 固定行（冻结行），示例：[M, N]，表示冻结表头 M 行和表尾 N 行。M 和 N 值为 0 时，表示不冻结行。TS 类型：`Array<number>` | N
height | String / Number | - | 表格高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight` | N
loading | Boolean / Slot / Function | undefined | 加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Function 和 插槽 自定义加载状态呈现内容和样式。值为 `false` 则会取消加载状态。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxHeight | String / Number | - | 表格最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px | N
rowKey | String | 'id' | 必需。唯一标识一行数据的字段名，来源于 `data` 中的字段。如果是字段嵌套多层，可以设置形如 `item.a.id` 的方法 | Y
showHeader | Boolean | true | 是否显示表头 | N
stripe | Boolean | false | 是否显示斑马纹 | N
tableContentWidth | String | - | 表格内容的总宽度，注意不是表格可见宽度。主要应用于 `table-layout: auto` 模式下的固定列显示。`tableContentWidth` 内容宽度的值必须大于表格可见宽度 | N
tableLayout | String | fixed | 表格布局方式。可选项：auto/fixed | N
verticalAlign | String | middle | 行内容上下方向对齐。可选项：top/middle/bottom | N
onCellClick | Function |  | TS 类型：`(context: BaseTableCellEventContext<T>) => void`<br/>单元格点击时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/> | N
onRowClick | Function |  | TS 类型：`(context: RowEventContext<T>) => void`<br/>行点击时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/> | N
onScroll | Function |  | TS 类型：`(params: { e: WheelEvent }) => void`<br/>表格内容滚动时触发 | N

### BaseTable Events

名称 | 参数 | 描述
-- | -- | --
cell-click | `(context: BaseTableCellEventContext<T>)` | 单元格点击时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/>
row-click | `(context: RowEventContext<T>)` | 行点击时触发，泛型 T 指表格数据类型。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/>
scroll | `(params: { e: WheelEvent })` | 表格内容滚动时触发

### BaseTableInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
refreshTable | \- | \- | 必需。全部重新渲染表格
