---
title: Rate 评分
description: 用于对某行为/事物进行打分。
spline: base
isComponent: true
toc: false
---

### 基础评分

使用场景：简单的星级评定，不涉及具体分数

::: demo demos/index
:::


### 带描述评分

使用场景：较为严谨的星级评定，展示具体分数或具体等级

::: demo demos/text
:::


## 组件样式

### 允许半选

::: demo demos/allowHalf
:::


### 自定义数量

::: demo demos/count
:::

### 自定大小

::: demo demos/size
:::

### 只读状态

::: demo demos/readonly
:::

### 自定义颜色

::: demo demos/color
:::

### 自定义图标

::: demo demos/icon
:::

## API

### Rate Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowHalf | Boolean | false | 是否允许半选 | N
color | String | - | 评分图标的颜色，样式中默认为 #ED7B2F。TS 类型：`string | Array<string>` | N
count | Number | 5 | 评分的数量 | N
showText | Boolean | false | 是否显示对应的辅助文字 | N
size | String | - | 评分图标的大小，示例：`20` | N
texts | Array | - | 自定义评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分']。TS 类型：`Array<string>` | N
value | Number | 0 | 必需。选择评分的值。支持语法糖 | Y
onChange | Function |  | 评分数改变时触发。`(value: number) => {}` | N

### Rate Events
名称 | 参数 | 描述
-- | -- | --
change | `(value: number)` | 评分数改变时触发
