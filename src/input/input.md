:: BASE_DOC ::

## API

### Input Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
align | String | left | 文本内容位置，居左/居中/居右。可选项：left/center/right | N
allowInputOverMax | Boolean | false | 超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入 | N
autocomplete | String | undefined | 是否开启自动填充功能，HTML5 原生属性，[点击查看详情](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | N
autofocus | Boolean | false | 自动聚焦 | N
borderless | Boolean | false | 是否开启无边框模式 | N
clearTrigger | String | always | 清空图标触发方式，仅在输入框有值时有效。可选项：always / focus | N
clearable | Boolean | false | 是否可清空 | N
cursorColor | String | #0052d9 | 光标颜色 | N
disabled | Boolean | undefined | 是否禁用输入框 | N
enterkeyhint | String | - | 用于控制回车键样式，此 API 仅在部分浏览器支持，HTML5 原生属性，[点击查看详情](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)。可选项：enter/done/go/next/previous/search/send | N
extra | Slot / Function | - | 右侧额外内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
format | Function | - | 指定输入框展示值的格式。TS 类型：`InputFormatType` `type InputFormatType = (value: InputValue) => string`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | 标题输入框布局方式。可选项：vertical/horizontal | N
maxcharacter | Number | - | 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用 | N
maxlength | String / Number | - | 用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为空，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用 | N
name | String | - | 名称 | N
placeholder | String | undefined | 占位符 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
readonly | Boolean | undefined | 只读状态 | N
size | String | small | 已废弃。输入框尺寸。可选项：small/medium。TS 类型：`'medium' \| 'small'` | N
spellCheck | Boolean | false | 是否开启拼写检查，HTML5 原生属性，[点击查看详情](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/spellcheck) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
type | String | text | 输入框类型。可选项：text/number/url/tel/password/search/submit/hidden | N
value | String / Number | - | 输入框的值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`InputValue` `type InputValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
defaultValue | String / Number | - | 输入框的值。非受控属性。TS 类型：`InputValue` `type InputValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
onBlur | Function |  | TS 类型：`(value: InputValue, context: { e: FocusEvent }) => void`<br/>失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: InputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; trigger: 'input' \| 'initial' \| 'clear' }) => void`<br/>输入框值发生变化时触发。`trigger=initial` 表示传入的数据不符合预期，组件自动处理后触发 change 告知父组件。如：初始值长度超过 `maxlength` 限制 | N
onClear | Function |  | TS 类型：`(context: { e: TouchEvent }) => void`<br/>清空按钮点击时触发 | N
onFocus | Function |  | TS 类型：`(value: InputValue, context: { e: FocusEvent }) => void`<br/>获得焦点时触发 | N
onValidate | Function |  | TS 类型：`(context: { error?: 'exceed-maximum' \| 'below-minimum' }) => void`<br/>`1.9.1`。字数超出限制时触发 | N

### Input Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: InputValue, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: InputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; trigger: 'input' \| 'initial' \| 'clear' })` | 输入框值发生变化时触发。`trigger=initial` 表示传入的数据不符合预期，组件自动处理后触发 change 告知父组件。如：初始值长度超过 `maxlength` 限制
clear | `(context: { e: TouchEvent })` | 清空按钮点击时触发
focus | `(value: InputValue, context: { e: FocusEvent })` | 获得焦点时触发
validate | `(context: { error?: 'exceed-maximum' \| 'below-minimum' })` | `1.9.1`。字数超出限制时触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-input-align-items | center | - 
--td-input-bg-color | @bg-color-container | - 
--td-input-border-color | @component-stroke | - 
--td-input-border-left-space | 16px | - 
--td-input-border-radius | @radius-default | - 
--td-input-border-right-space | 0 | - 
--td-input-cursor-color | @brand-color | - 
--td-input-default-text-color | @text-color-primary | - 
--td-input-default-tips-color | @text-color-placeholder | - 
--td-input-disabled-text-color | @text-color-disabled | - 
--td-input-error-text-color | @error-color | - 
--td-input-error-tips-color | @error-color | - 
--td-input-label-text-color | @text-color-primary | - 
--td-input-placeholder-text-color | @text-color-placeholder | - 
--td-input-prefix-icon-color | @text-color-primary | - 
--td-input-success-text-color | @success-color | - 
--td-input-success-tips-color | @success-color | - 
--td-input-suffix-icon-color | @text-color-placeholder | - 
--td-input-suffix-text-color | @text-color-primary | - 
--td-input-vertical-padding | 16px | - 
--td-input-warning-text-color | @warning-color | - 
--td-input-warning-tips-color | @warning-color | - 
