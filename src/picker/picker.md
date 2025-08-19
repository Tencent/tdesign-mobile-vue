:: BASE_DOC ::


## API

### Picker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
cancelBtn | String / Boolean | true | 取消按钮文字。TS 类型：`boolean \| string` | N
columns | Array / Function | [] | 必需。配置每一列的选项。TS 类型：`PickerColumn \| Array<PickerColumn> \| ((item: Array<PickerValue>)  => Array<PickerColumn>)` `type PickerColumn = PickerColumnItem[]` `interface PickerColumnItem { label: string,value: string,disabled?: boolean}`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | Y
confirmBtn | String / Boolean | true | 确定按钮文字。TS 类型：`boolean \| string` | N
footer | Slot / Function | - | 底部内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
header | Slot / Function | - | 自定义头部内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | 用来定义 value / label / disabled 在 `columns ` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
option | Slot / Function | - | 自定义选项内容。参数为 `option: PickerColumnItem, index: number`。TS 类型：`(option: PickerColumnItem, index: number) => string \| Record<string, string \| boolean>` | N
renderLabel | Function | - | 自定义label。TS 类型：`(item: PickerColumnItem, index: number) => string` | N
swipeDuration | String / Number | 300 | 快速滑动时惯性滚动的时长，单位 ms，为 0 时表示取消惯性滚动。TS 类型：`string \| number` | N
title | String | '' | 标题 | N
value | Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`Array<PickerValue>` `type PickerValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
defaultValue | Array | - | 选中值。非受控属性。TS 类型：`Array<PickerValue>` `type PickerValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击取消按钮时触发 | N
onChange | Function |  | TS 类型：`(value: Array<PickerValue>, context: { columns: Array<PickerContext>, e: MouseEvent })  => void`<br/>选中变化时候触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts)。<br/>`interface PickerContext{ column: number,index: number }`<br/> | N
onConfirm | Function |  | TS 类型：`(value: Array<PickerValue>, context: { index: number[], e: MouseEvent, label: string[] }) => void`<br/>点击确认按钮时触发 | N
onPick | Function |  | TS 类型：`(value: Array<PickerValue>,context: PickerContext) => void`<br/>任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标 | N

### Picker Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 点击取消按钮时触发
change | `(value: Array<PickerValue>, context: { columns: Array<PickerContext>, e: MouseEvent }) ` | 选中变化时候触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts)。<br/>`interface PickerContext{ column: number,index: number }`<br/>
confirm | `(value: Array<PickerValue>, context: { index: number[], e: MouseEvent, label: string[] })` | 点击确认按钮时触发
pick | `(value: Array<PickerValue>,context: PickerContext)` | 任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-picker-bg-color | @bg-color-container | - 
--td-picker-border-radius | 12px | - 
--td-picker-button-font-size | 16px | - 
--td-picker-cancel-color | @text-color-secondary | - 
--td-picker-confirm-color | @brand-color | - 
--td-picker-group-height | 200px | - 
--td-picker-indicator-bg-color | @bg-color-secondarycontainer | - 
--td-picker-indicator-border-radius | 6px | - 
--td-picker-item-active-color | @text-color-primary | - 
--td-picker-item-color | @text-color-secondary | - 
--td-picker-item-disabled-color | @text-color-disabled | - 
--td-picker-item-height | 40px | - 
--td-picker-item-height | 40px | - 
--td-picker-mask-color-bottom | hsla(0, 0%, 100%, .4) | - 
--td-picker-mask-color-top | hsla(0, 0%, 100%, .92) | - 
--td-picker-title-color | @text-color-primary | - 
--td-picker-title-font-size | 18px | - 
--td-picker-title-font-weight | 600 | - 
--td-picker-title-line-height | 26px | - 
--td-picker-toolbar-height | 58px | - 
