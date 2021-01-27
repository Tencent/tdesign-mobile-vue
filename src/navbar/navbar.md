# Navbar 导航栏

## 1. 组件类型
主要用于展示当前位置和返回上一层极，也可用于管理当前屏幕的内容

### 1.1 导航栏 - 基础

::: demo ./demos/index.vue
:::

### 1.2 导航栏 - 带icon

::: demo ./demos/index-icon.vue
:::

### 1.3 事件反馈

::: demo ./demos/event.vue
:::

## Props

| 属性      | 类型    | 默认值 | 必传 | 说明                        |
| --------- | ------- | ------ | ---- | --------------------------- |
| title     | String  | 导航栏 | N    | 标题文字                    |
| leftArrow | Boolean | true   | N    | 是否展示左箭头              |
| maxLen    | Number  | 6      | N    | 标题文字长度，多余展示`...` |

## Event

| 事件名      | 说明              | 回调参数 |
| ----------- | ----------------- | -------- |
| click-right | 点击右侧更多 icon | event    |
| click-text  | 点击标题文字      | event    |
