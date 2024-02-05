:: BASE_DOC ::

## API

### BaseTable Props

name | type | default | description | required
-- | -- | -- | -- | --
bordered | Boolean | false | show table bordered | N
cellEmptyContent | String / Slot / Function | - | Typescript：`string \| TNode<BaseTableCellParams<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
columns | Array | [] | table column configs。Typescript：`Array<BaseTableCol<T>>` | N
data | Array | [] | table data。Typescript：`Array<T>` | N
empty | String / Slot / Function | '' | empty text or empty element。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
fixedRows | Array | - | Typescript：`Array<number>` | N
height | String / Number | - | table height | N
loading | Boolean / Slot / Function | undefined | loading state table。Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxHeight | String / Number | - | table max height | N
rowKey | String | 'id' | required。unique key for each row data | Y
showHeader | Boolean | true | show table header | N
stripe | Boolean | false | show stripe style | N
tableContentWidth | String | - | \- | N
tableLayout | String | fixed | table-layout css properties。options：auto/fixed | N
verticalAlign | String | middle | vertical align。options：top/middle/bottom | N
onCellClick | Function |  | Typescript：`(context: BaseTableCellEventContext<T>) => void`<br/>trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/> | N
onRowClick | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row click。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/> | N
onScroll | Function |  | Typescript：`(params: { e: WheelEvent }) => void`<br/>trigger on table content scroll | N

### BaseTable Events

name | params | description
-- | -- | --
cell-click | `(context: BaseTableCellEventContext<T>)` | trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/>
row-click | `(context: RowEventContext<T>)` | trigger on row click。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/>
scroll | `(params: { e: WheelEvent })` | trigger on table content scroll

### BaseTableInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
refreshTable | \- | \- | required
