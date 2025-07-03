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
fixedRows | Array | - | `1.9.3`。Typescript：`Array<number>` | N
height | String / Number | - | table height | N
loading | Boolean / Slot / Function | undefined | loading state table。Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
loadingProps | Object | - | Typescript：`Partial<LoadingProps>`，[Loading API Documents](./loading?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts) | N
maxHeight | String / Number | - | table max height | N
rowAttributes | Object / Array / Function | - | `1.9.3`。`tr` attributes。Typescript：`TableRowAttributes<T>` `type TableRowAttributes<T> = HTMLElementAttributes \| ((params: { row: T; rowIndex: number; type: 'body' \| 'foot' }) => HTMLElementAttributes) \| Array<TableRowAttributes<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts) | N
rowClassName | String / Object / Array / Function | - | `1.9.3`。table `th` classname。Typescript：`ClassName \| ((params: RowClassNameParams<T>) => ClassName)` `interface RowClassNameParams<T> { row: T; rowIndex: number; rowKey?: string; type?: 'body' \| 'foot' }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts) | N
rowKey | String | 'id' | required。unique key for each row data | Y
showHeader | Boolean | true | show table header | N
stripe | Boolean | false | show stripe style | N
tableContentWidth | String | - | \- | N
tableLayout | String | fixed | table-layout css properties, [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout). set value to be `fixed` on `resizable=true` please。options: auto/fixed | N
verticalAlign | String | middle | vertical align。options: top/middle/bottom | N
onCellClick | Function |  | Typescript：`(context: BaseTableCellEventContext<T>) => void`<br/>trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/> | N
onRowClick | Function |  | Typescript：`(context: RowEventContext<T>) => void`<br/>trigger on row click。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/> | N
onScroll | Function |  | Typescript：`(params: { e: Event }) => void`<br/>trigger on table content scroll | N

### BaseTable Events

name | params | description
-- | -- | --
cell-click | `(context: BaseTableCellEventContext<T>)` | trigger on cell clicked。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface BaseTableCellEventContext<T> { row: T; col: BaseTableCol; rowIndex: number; colIndex: number; e: MouseEvent }`<br/>
row-click | `(context: RowEventContext<T>)` | trigger on row click。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts)。<br/>`interface RowEventContext<T> { row: T; index: number; e: MouseEvent }`<br/>
scroll | `(params: { e: Event })` | trigger on table content scroll

### BaseTableInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
refreshTable | \- | \- | required

### BaseTableCol

name | type | default | description | required
-- | -- | -- | -- | --
align | String | left | align type。options: left/right/center | N
cell | String / Function | - | Typescript：`string \| TNode<BaseTableCellParams<T>>` `interface BaseTableCellParams<T> { row: T; rowIndex: number; col: BaseTableCol<T>; colIndex: number }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts) | N
className | String / Object / Array / Function | - | cell classnames。Typescript：`TableColumnClassName<T> \| TableColumnClassName<T>[]` `type TableColumnClassName<T> = ClassName \| ((context: CellData<T>) => ClassName)` `interface CellData<T> extends BaseTableCellParams<T> { type: 'th' \| 'td' }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts) | N
colKey | String | - | unique key for column | N
ellipsis | Boolean / Object / Slot / Function | false | ellipsis cell content。Typescript：`boolean \| TNode<BaseTableCellParams<T>>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
ellipsisTitle | Boolean / Object / Slot / Function | - | ellipsis title content。Typescript：`boolean \| TNode<BaseTableColParams<T>>` `interface BaseTableColParams<T> { col: BaseTableCol<T>; colIndex: number }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/table/type.ts) | N
fixed | String | left | `1.9.3`。fixed current column to left or right。options: left/right | N
minWidth | String / Number | - | add CSS property `min-width` to HTML Element `<col>`，Browsers with [TablesNG](https://docs.google.com/document/d/16PFD1GtMI9Zgwu0jtPaKZJ75Q2wyZ9EZnVbBacOfiNA/preview)  support `minWidth` | N
title | String / Function | - | th content。Typescript：`string \| TNode<{ col: BaseTableCol; colIndex: number }>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
width | String / Number | - | column width | N
