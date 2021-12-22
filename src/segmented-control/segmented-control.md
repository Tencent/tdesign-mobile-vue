---
title: SegmentedControl 分段器
description: 用于同类型内容不同视图的展示切换
spline: base
isComponent: true
toc: false
---

### 基础分段器
使用场景：同一性质内容体不同类型/状态/视图的页面切换
::: demo demos/index
:::

## API
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|v-model|<code>String &#124; Number &#124; Array<Number &#124; String></code>|0|N|当前选中的值|
|items|<code>Array<Number &#124; String></code>|[]|Y|分段器的选项|

### Props Items 参数
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|value|<code>String &#124; Number</code>|当前index值|N|选项的标识符|
|text|`String`|-|Y|选项显示的内容|

## Event
| 事件名 | 说明 | 回调参数 |
|-------|-----|---------|
|change|选中变化时候触发|<code>String &#124; Number &#124; Array<Number &#124; String></code>|
