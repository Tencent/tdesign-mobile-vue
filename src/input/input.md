# Input 输入框

定义：用于单行或多行文本信息输入

## 组件类型

在TDesign中，拥有 3种不同形式的输入框：基础输入框、特殊输入框、多行输入框

### 基础单选框

使用场景：最常规的文字填写，且需填写的文字字数较少时可以使用

::: demo demos/normal
:::

### 特殊输入框

使用场景：较复杂场景的文字填写，主要运用于密码输入、手机验证码输入、价格数量重量输入等场景

::: demo demos/other
:::
W

### 多行输入框

使用场景：当需要输入文字较多时，使用多行输入框

::: demo demos/textarea
:::

## API

| 属性          | 类型        | 默认值 | 必传 | 说明                                |
| ------------- | ----------- | ------ | ---- | ----------------------------------- |
| label         | string      | -      | N    | 标题                                |
| v-model       | string      | -      | N    | 单元格的内容                        |
| error         | boolean     | false  | N    | 是否为警告模式                      |
| error-message | string      | -      | N    | 警告文本                            |
| rightIcon     | Slot        | -      | N    | 输入框右侧的图标                    |
| suffix        | string/Slot | -      | N    | 输入框后缀内容                      |
| type          | string      | input  | N    | 输入框类型，input/textarea/password |
| maxlength     | number      | 500    | N    | 允许输入最大长度                    |
| rows          | number      | 4      | N    | 默认的行数，仅 textarea 有效        |
| max-rows      | number      | 12     | N    | 允许最大的行数，仅 textarea 有效    |
| clearable     | boolean     | false  | N    | 是否显示清除按钮                    |
| disabled      | boolean     | false  | N    | 是否禁用                            |

## Events

| 事件名称   | 回调参数      | 说明                 |
| ---------- | ------------- | -------------------- |
| click-icon | -             | 点击右侧 icon 时触发 |
| focus      | -             | 聚焦时触发           |
| blur       | -             | 失焦时触发           |
| change     | (val: string) | 内容改变时触发       |

## Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| label      | 标题插槽             |
| suffix     | 输入框后缀内容插槽   |
| right-icon | 输入框右侧的图标插槽 |
