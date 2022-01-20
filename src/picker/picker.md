:: BASE_DOC ::


## API
### Picker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancelBtn | String | 取消 | 取消按钮文字 | N
confirmBtn | String | 确认 | 确定按钮文字 | N
title | String | '' | 标题 | N
value | Array | - | 选中值。TS 类型：`Array<PickerValue>`。[详细类型定义]() | N
visible | Boolean | false | 是否显示 | N
onCancel | Function |  | 点击取消按钮时触发。`({ e: MouseEvent }) => {}` | N
onChange | Function |  | 选中变化时候触发。`(value: Array<PickerValue>) => {}` | N
onConfirm | Function |  | 点击确认确认按钮时触发。`({ e: MouseEvent }) => {}` | N

### Picker Events

名称 | 参数 | 描述
-- | -- | --
cancel | `({ e: MouseEvent })` | 点击取消按钮时触发
change | `(value: Array<PickerValue>)` | 选中变化时候触发
confirm | `({ e: MouseEvent })` | 点击确认确认按钮时触发

### PickerItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
options | Array | [] | 数据源。TS 类型：`Array<PickerItemOption>`。[详细类型定义]() | N
value | String / Number | - | 默认选中的侯选项 | N
