:: BASE_DOC ::

## API
### Search Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
action | String / Slot / Function | '' | 自定义右侧操作按钮文字。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
center | Boolean | false | 【讨论中】是否居中 | N
clearable | Boolean | true | 是否可清空 | N
disabled | Boolean | false | 【讨论中】是否禁用 | N
focus | Boolean | false | 是否聚焦 | N
leftIcon | Slot / Function | - | 左侧图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placeholder | String | '' | 占位符 | N
shape | String | 'square' | 【讨论中】搜索框形状。可选项：square/round | N
value | String | - | 值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String | - | 值。非受控属性 | N
onActionClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击右侧操作按钮文字时触发时触发 | N
onBlur | Function |  | TS 类型：`(value: string, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: string, context?: { e?: InputEvent | MouseEvent }) => void`<br/>值发生变化时触发 | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清除时触发 | N
onFocus | Function |  | TS 类型：`(value: string, context: { e: FocusEvent }) => void`<br/>获得焦点时触发 | N

### Search Events

名称 | 参数 | 描述
-- | -- | --
action-click | `(context: { e: MouseEvent })` | 点击右侧操作按钮文字时触发时触发
blur | `(value: string, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: string, context?: { e?: InputEvent | MouseEvent })` | 值发生变化时触发
clear | `(context: { e: MouseEvent })` | 点击清除时触发
focus | `(value: string, context: { e: FocusEvent })` | 获得焦点时触发
