---
title: Toast 轻提示
description: 用于轻量级反馈或提示，不会打断用户操作。
spline: base
isComponent: true
toc: false
---

### 文本轻提示

当进行某一操作，需要对该操作进行解释或者提示时，提示2秒后自动消失 提示内容整体居中对齐，最多显示两行 整体位置可以位于内容区顶部、底部、中心等，需整体居中对齐

::: demo demos/text
:::

### 图标轻提示

当进行某一操作，需要对该操作表明当前状态及结果时

::: demo demos/icon
:::

### 文本加图标轻提示

相比图标轻提示可以加一些辅助文字，对当前状态进行解释说明

::: demo demos/iconText
:::

## 样式

### 提示位置

::: demo demos/position
:::

### 遮罩

::: demo demos/mask
:::

## API

### Toast Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
direction | String | - | 图标排列方式。可选项：row/column | N
duration | Number | 2000 | 弹窗显示毫秒数 | N
icon | Slot / Function | - | 自定义图标。TS 类型：`TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
message | String | - | 弹窗显示文字 | N
position | String | middle | 弹窗展示位置。可选项： top/middle/bottom | N
showOverlay | Boolean | - | 是否显示背景遮罩，禁止背景点击和滚动 | N
type | String | - | 提示类型。可选项：loading/success/fail | N
