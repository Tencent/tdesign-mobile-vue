---
title: Divider 分割符
description: 用于分割、组织、细化有一定逻辑的组织元素内容和页面结构。
spline: base
isComponent: true
toc: false
---

## 基础分割线
基础分割线是没有文字的独立线条，又分为水平分割线和垂直分割线。

### 水平分割线
水平分割线常用来对不同元素内容进行分割。

### 垂直分割线
垂直分割线常用来做行内分割。

::: demo demos/vertical
:::

## 带文字的分割线
带文字的分割线是在分割线中嵌入文字，在需要对分割内容进行解释说明时使用

::: demo demos/align
:::


## API

### Divider Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | center | 文本位置（仅在水平分割线有效）。可选项：left/right/center | N
content | String / Slot / Function | - | 子元素。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-vue/blob/develop/src/common.ts) | N
dashed | Boolean | false | 是否虚线（仅在水平分割线有效） | N
default | String / Slot / Function | - | 子元素，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | 分隔线类型有两种：水平和垂直。可选项：horizontal/vertical | N
lineColor | String | - | 分隔线颜色 | N
theme | String | horizontal | 已废弃。请更为使用 `layout`。分隔线类型有两种：水平和垂直。可选项：horizontal/vertical | N
