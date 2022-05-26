:: BASE_DOC ::


## API
### Picker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancelBtn | String / Object | '取消' | 取消按钮文字。TS 类型：`string | ButtonProps` | N
confirmBtn | String / Object | '确认' | 确定按钮文字。TS 类型：`string | ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
footer | Slot / Function | - | 底部内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
header | Boolean / Slot / Function | true | 头部内容。值为 true 显示空白头部，值为 false 不显示任何内容，值类型为 TNode 表示自定义头部内容。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
title | String | '' | 标题 | N
value | Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`Array<PickerValue>` `type PickerValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
defaultValue | Array | - | 选中值。非受控属性。TS 类型：`Array<PickerValue>` `type PickerValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
visible | Boolean | false | 是否显示 | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击取消按钮时触发 | N
onChange | Function |  | TS 类型：`(value: Array<PickerValue>, context: { index: Array<number>; e: MouseEvent }) => void`<br/>选中变化时候触发 | N
onPick | Function |  | TS 类型：`(value: Array<PickerValue>,context: { index: number; column: number; e: MouseEvent }) => void`<br/>任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标 | N

### Picker Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 点击取消按钮时触发
change | `(value: Array<PickerValue>, context: { index: Array<number>; e: MouseEvent })` | 选中变化时候触发
pick | `(value: Array<PickerValue>,context: { index: number; column: number; e: MouseEvent })` | 任何一列选中都会触发，不同的列参数不同。`context.column` 表示第几列变化，`context.index` 表示变化那一列的选中项下标

### PickerItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
format | Function | - | 格式化标签。TS 类型：`(option: PickerItemOption) => string` | N
options | Array | [] | 数据源。TS 类型：`Array<PickerItemOption>` `interface PickerItemOption { label: string; value: string | number }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
