---
title: TabBar 标签栏
description: 用于在不同功能模块之间进行快速切换，位于页面底部。
spline: base
isComponent: true
toc: false
---

### 纯文本标签栏

#### 单层级纯文本标签栏
使用场景：当功能模块为单层级，且理解门槛较高难以使用图标进行表意时，可使用单层级纯文本标签栏

::: demo demos/index
:::

#### 双层级纯文本标签栏
使用场景：当功能模块为双层级，且理解门槛较高难以使用图标进行表意时，可使用多层级纯文本标签栏

::: demo demos/text-spread
:::

### 文本加图标标签栏
使用场景：当功能模块较易理解且需要通过标签栏体现品牌风格时，可使用文本加图标标签栏

::: demo demos/icon-text
:::

### 纯图标标签栏
使用场景：当功能模块使用图标即可表意清楚且需要通过标签栏体现品牌风格时，可使用纯图标标签栏
::: demo demos/pure-icon
:::


## API

### TabBar Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bordered | Boolean | true | 是否显示外边框 | N
fixed | Boolean | true | 是否固定在底部 | N
value | String / Number | 0 | 当前选中标签的索引 | N
onChange | Function |  | 选中标签切换时触发。`() => {}` | N

### TabBar Events
名称 | 参数 | 描述
-- | -- | --
change | - | 选中标签切换时触发


### TabBarItem Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
badgeProps | Object | - | 图标右上角提示信息。TS 类型：`TdBadgeProps`。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
icon | String / Slot / Function | - | 图标名称。TS 类型：`string | TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
subTabBar | Array | - | 二级菜单。TS 类型：`SubTabBarItem[] `。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
value | String / Number | - | 标识符 | N
