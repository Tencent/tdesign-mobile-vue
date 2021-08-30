# Stepper 步进器

定义：带加减按钮的数字输入框

## 组件类型

TDesign只提供一种基础步进器类型

### 基础步进器

使用场景：在表单中需要用户输入数量时可以使用

::: demo demos/index
:::

## 组件样式

### 禁止点击

::: demo demos/disabled
:::

### 禁止输入

::: demo demos/disableInput
:::

## 组件使用

### 绑定事件

::: demo demos/event
:::

## Props

| 属性         | 类型          | 默认值  | 必传 | 说明       |
| ------------ | ------------- | ------- | ---- | ---------- |
| v-model      | Number/String | 0       | N    | 当前绑定值 |
| disabled     | Boolean       | default | N    | 禁用       |
| step         | Number        |         | N    | 步长       |
| min          | Number        | 0       | N    | 最小值     |
| max          | Number        | 10000   | N    | 最大值     |
| label        | String        | ''      | N    | 标题       |
| disableInput | Boolean       | false   | N    | 禁用输入   |
| inputWidth   | String        | -       | N    | 输入框长度 |

### Events

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| change | 选择变化时触发 | val： number |
