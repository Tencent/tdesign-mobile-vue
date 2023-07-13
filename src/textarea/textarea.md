:: BASE_DOC ::

## API
### Textarea Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowInputOverMax | Boolean | false | 超出maxlength或maxcharacter之后是否还允许输入 | N
autofocus | Boolean | false | 自动聚焦，拉起键盘 | N
autosize | Boolean | false | 是否自动增高，值为 autosize 时，style.height 不生效 | N
bordered | Boolean | false | 是否显示外边框 | N
disabled | Boolean | false | 是否禁用文本框 | N
indicator | Boolean | false | 显示文本计数器，如 0/140。当 maxlength < 0 && maxcharacter < 0 成立时， indicator无效 | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | 标题输入框布局方式。可选项：vertical/horizontal | N
maxcharacter | Number | - | 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 | N
maxlength | Number | - | 用户最多可以输入的字符个数 | N
name | String | - | 名称，HTML 元素原生属性 | N
placeholder | String | undefined | 占位符 | N
value | String / Number | - | 文本框值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TextareaValue` `type TextareaValue = string`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/textarea/type.ts) | N
defaultValue | String / Number | - | 文本框值。非受控属性。TS 类型：`TextareaValue` `type TextareaValue = string`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/textarea/type.ts) | N
onBlur | Function |  | TS 类型：`(value: TextareaValue, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: TextareaValue, context?: { e?: InputEvent }) => void`<br/>输入内容变化时触发 | N
onFocus | Function |  | TS 类型：`(value: TextareaValue, context : { e: FocusEvent }) => void`<br/>获得焦点时触发 | N

### Textarea Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: TextareaValue, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: TextareaValue, context?: { e?: InputEvent })` | 输入内容变化时触发
focus | `(value: TextareaValue, context : { e: FocusEvent })` | 获得焦点时触发


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-textarea-background-color | @bg-color-container | - 
--td-textarea-border-color | rgba(220, 220, 220, 1) | - 
--td-textarea-border-radius | @radius-default | - 
--td-textarea-disabled-text-color | @font-gray-4 | - 
--td-textarea-indicator-text-color | @font-gray-3 | - 
--td-textarea-label-color | @font-gray-1 | - 
--td-textarea-label-width | 64px | - 
--td-textarea-padding | @textarea-vertical-padding @textarea-horizontal-padding | - 
--td-textarea-placeholder-color | @font-gray-3 | - 
--td-textarea-text-color | @font-gray-1 | - 
