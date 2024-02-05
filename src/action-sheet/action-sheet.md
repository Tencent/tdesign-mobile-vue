:: BASE_DOC ::

## API

### ActionSheet Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | center | 水平对齐方式。可选项：center/left | N
cancelText | String | - | 设置取消按钮的文本 | N
count | Number | 8 | 设置每页展示菜单的数量，仅当 type=grid 时有效 | N
description | String | - | 动作面板描述文字 | N
items | Array | - | 必需。菜单项。TS 类型：`Array<string \| ActionSheetItem>` `interface ActionSheetItem {label: string; color?: string; disabled?: boolean }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts) | Y
showCancel | Boolean | true | 是否显示取消按钮 | N
theme | String | list | 展示类型，列表和表格形式展示。可选项：list/grid | N
visible | Boolean | false | 必需。显示与隐藏。支持语法糖 `v-model` 或 `v-model:visible` | Y
defaultVisible | Boolean | false | 必需。显示与隐藏。非受控属性 | Y
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击取消按钮时触发 | N
onClose | Function |  | TS 类型：`(trigger: TriggerSource) => void`<br/>关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'command' \| 'select' `<br/> | N
onSelected | Function |  | TS 类型：`(selected: ActionSheetItem \| string, index: number) => void`<br/>选择菜单项时触发 | N

### ActionSheet Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 点击取消按钮时触发
close | `(trigger: TriggerSource)` | 关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'command' \| 'select' `<br/>
selected | `(selected: ActionSheetItem \| string, index: number)` | 选择菜单项时触发
