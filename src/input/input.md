---
title: Input 输入框
description: 用于文本信息输入。
spline: base
isComponent: true
toc: false
---

### 基础单选框

使用场景：最常规的文字填写，且需填写的文字字数较少时可以使用

::: demo demos/normal
:::

### 特殊输入框

使用场景：较复杂场景的文字填写，主要运用于密码输入、手机验证码输入、价格数量重量输入等场景

::: demo demos/other
:::

### 多行输入框

使用场景：当需要输入文字较多时，使用多行输入框

::: demo demos/textarea
:::

## API
### Input Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 文本内容位置，居左/居中/居右。可选项：left/center/right | N
autocomplete | Boolean | false | 是否开启自动填充功能 | N
autofocus | Boolean | false | 自动聚焦 | N
clearable | Boolean | false | 是否可清空 | N
disabled | Boolean | false | 是否禁用输入框 | N
errorMessage | String | - | 错误提示文本，值为空不显示 | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxcharacter | Number | - | 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度 | N
maxlength | Number | - | 用户最多可以输入的文本长度。值小于等于 0 的时候，则不限制输入长度 | N
name | String | - | 名称 | N
placeholder | String | - | 占位符 | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
readonly | Boolean | false | 输入框是否只读 | N
required | Boolean | false | 是否显示表单必填星号 | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
type | String | text | 输入框类型。可选项：textarea/text/number/url/tel/password/search/submit/hidden | N
value | String / Number | - | 输入框的值。支持语法糖。TS 类型：`InputValue`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
defaultValue | String / Number | - | 输入框的值。非受控属性。TS 类型：`InputValue`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
onBlur | Function |  | 失去焦点时触发。`(value: InputValue, context: { e: FocusEvent }) => {}` | N
onChange | Function |  | 输入框值发生变化时触发。`(value: InputValue, context?: { e?: InputEvent | MouseEvent }) => {}` | N
onClear | Function |  | 清空按钮点击时触发。`(context: { e: MouseEvent }) => {}` | N
onFocus | Function |  | 获得焦点时触发。`(value: InputValue, context: { e: FocusEvent }) => {}` | N

### Input Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: InputValue, context: { e: FocusEvent })` | 失去焦点时触发
change | `(value: InputValue, context?: { e?: InputEvent | MouseEvent })` | 输入框值发生变化时触发
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
focus | `(value: InputValue, context: { e: FocusEvent })` | 获得焦点时触发
