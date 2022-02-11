:: BASE_DOC ::


## API
### Picker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancelBtn | String | 取消 | 取消按钮文字 | N
confirmBtn | String | 确认 | 确定按钮文字 | N
title | String | '' | 标题 | N
value | Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`Array<PickerValue>` `type PickerValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
defaultValue | Array | - | 选中值。非受控属性。TS 类型：`Array<PickerValue>` `type PickerValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
visible | Boolean | false | 是否显示 | N
onCancel | Function |  | TS 类型：`({ e: MouseEvent }) => void`<br/>点击取消按钮时触发 | N
onChange | Function |  | TS 类型：`(value: Array<PickerValue>) => void`<br/>选中变化时候触发 | N
onConfirm | Function |  | TS 类型：`({ e: MouseEvent }) => void`<br/>点击确认确认按钮时触发 | N

### Picker Events

名称 | 参数 | 描述
-- | -- | --
cancel | `({ e: MouseEvent })` | 点击取消按钮时触发
change | `(value: Array<PickerValue>)` | 选中变化时候触发
confirm | `({ e: MouseEvent })` | 点击确认确认按钮时触发

### PickerItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
options | Array | [] | 数据源。TS 类型：`Array<PickerItemOption>` `interface PickerItemOption { label: string; value: string | number }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
value | String / Number | - | 默认选中的选项 | N
