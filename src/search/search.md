:: BASE_DOC ::

## API
### Search Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
action | String / Slot / Function | '' | 自定义右侧操作按钮文字，如：“取消”。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
autocompleteOptions | Array | - | 【讨论中】联想词列表，如果不存在或长度为 0 则不显示联想框。可以使用函数 `label` 自定义联想词为任意内容；也可使用插槽 `option` 定义联想词内容，插槽参数为 `{ option: AutocompleteOption; index: number }`。如果 `group` 值为 `true` 则表示当前项为分组标题。TS 类型：`Array<AutocompleteOption>` `type AutocompleteOption = string \| { label: string \| TNode; group?: boolean }`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/search/type.ts) | N
center | Boolean | false | 是否居中 | N
clearable | Boolean | true | 是否可清空 | N
disabled | Boolean | - | 禁用状态 | N
focus | Boolean | false | 是否聚焦 | N
leftIcon | String / Slot / Function | 'search' | 左侧图标。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placeholder | String | '' | 占位符 | N
readonly | Boolean | false | 只读状态 | N
shape | String | 'square' | 搜索框形状。可选项：square/round | N
value | String | - | 值，搜索关键词。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String | - | 值，搜索关键词。非受控属性 | N
onActionClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击搜索框右侧操作内容时触发 | N
onBlur | Function |  | TS 类型：`(context: { value: string; e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent }) => void`<br/>搜索关键词发生变化时触发，可能场景有：搜索框内容发生变化、点击联想词 | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击清除时触发 | N
onFocus | Function |  | TS 类型：`(context: { value: string; e: FocusEvent }) => void`<br/>获得焦点时触发 | N
onSearch | Function |  | TS 类型：`(context?: { value: string; trigger: 'submit' \| 'option-click' \| 'clear'; e?: InputEvent \| MouseEvent }) => void`<br/>【讨论中】搜索触发，包含：手机键盘提交健、联想关键词点击、清空按钮点击等 | N
onSubmit | Function |  | TS 类型：`(context: { value: string; e: KeyboardEvent }) => void`<br/>提交时触发，如：手机键盘提交按钮点击 | N

### Search Events

名称 | 参数 | 描述
-- | -- | --
action-click | `(context: { e: MouseEvent })` | 点击搜索框右侧操作内容时触发
blur | `(context: { value: string; e: FocusEvent })` | 失去焦点时触发
change | `(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent })` | 搜索关键词发生变化时触发，可能场景有：搜索框内容发生变化、点击联想词
clear | `(context: { e: MouseEvent })` | 点击清除时触发
focus | `(context: { value: string; e: FocusEvent })` | 获得焦点时触发
search | `(context?: { value: string; trigger: 'submit' \| 'option-click' \| 'clear'; e?: InputEvent \| MouseEvent })` | 【讨论中】搜索触发，包含：手机键盘提交健、联想关键词点击、清空按钮点击等
submit | `(context: { value: string; e: KeyboardEvent })` | 提交时触发，如：手机键盘提交按钮点击
