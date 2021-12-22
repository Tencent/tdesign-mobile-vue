---
title: Stepper 步进器
description: 用于数量的增减。
spline: base
isComponent: true
toc: false
---

### 基础步进器

使用场景：在表单中需要用户输入数量时可以使用

::: demo demos/index
:::

### 组件样式

### 禁止点击

::: demo demos/disabled
:::

### 禁止输入

::: demo demos/disableInput
:::

### 组件使用

### 绑定事件

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
value | String / Number | 0 | 值。支持语法糖 | N
defaultValue | String / Number | 0 | 值。非受控属性 | N
