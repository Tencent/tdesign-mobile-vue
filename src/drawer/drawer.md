---
title: Drawer 抽屉
description: 屏幕边缘滑出的浮层面板。 
spline: base
isComponent: true
toc: false
---

### 基础用法

::: demo demos/index
:::

### 带图标抽屉

::: demo demos/iconDrawer
:::

## API

| 属性            | 类型    | 默认值 | 必传 | 说明                                                                                    |
| --------------- | ------- | ------ | ---- | --------------------------------------------------------------------------------------- |
| v-model/visible | Boolean | false  | Y    | 显示与隐藏                                                                              |
| sidebar         | Object  | -      | N    | 列表参数，包含 name(菜单名称),path(跳转路径),icon(图标支持function、slot、string) |
