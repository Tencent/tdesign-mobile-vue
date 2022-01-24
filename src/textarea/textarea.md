:: BASE_DOC ::

## API

### Textarea Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autofocus | Boolean | false | 自动聚焦，拉起键盘 | N
autosize | Boolean | false | 是否自动增高，值为 autosize 时，style.height 不生效 | N
disabled | Boolean | false | 是否禁用文本框 | N
maxcharacter | Number | - | 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 | N
maxlength | Number | - | 用户最多可以输入的字符个数 | N
name | String | - | 名称，HTML 元素原生属性 | N
placeholder | String | undefined | 占位符 | N
value | String | - | 文本框值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String | - | 文本框值。非受控属性 | N
onBlur | Function |  | TS 类型：`(value: TextareaValue, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: TextareaValue, context?: { e?: InputEvent }) => void`<br/>输入内容变化时触发 | N
onFocus | Function |  | TS 类型：`(value: TextareaValue, context: { e: FocusEvent }) => void`<br/>获得焦点时触发 | N

### Textarea Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: TextareaValue, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: TextareaValue, context?: { e?: InputEvent })` | 输入内容变化时触发
focus | `(value: TextareaValue, context: { e: FocusEvent })` | 获得焦点时触发
