# Stepper 步进器

定义：带加减按钮的数字输入框

## 1. 组件类型

TDesign只提供一种基础步进器类型

### 1.1. 基础步进器

使用场景：在表单中需要用户输入数量时可以使用

::: demo demos/index
:::

## 2. 组件样式

### 2.1. 禁止点击

::: demo demos/disabled
:::

### 2.2. 禁止输入

::: demo demos/disableInput
:::

## 3. 组件使用

### 3.1 绑定事件

::: demo demos/event
:::

## API

### Stepper Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 禁用 | N
disableInput | Boolean | false | 禁用输入框 | N
inputWidth | Number | - | 输入框宽度 | N
label | String | - | 标签 | N
max | Number | 100 | 最大值 | N
min | Number | 0 | 最小值 | N
step | Number | 1 | 步进 | N
theme | String | normal | 组件风格。可选项：normal/mode | N
value | String / Number | 0 | 值 | N
