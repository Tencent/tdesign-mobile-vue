---
title: DropdownMenu 下拉菜单
description: 菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。
spline: base
isComponent: true
toc: false
---

### 单选下拉菜单
用于选择项需要单选的场景

::: demo demos/single-choice
:::


### 多选下拉菜单
用于选择项可以进行多选的场景
选择后标签不改变名称，标题最多展示4个字符超出“…”处理
多选下拉菜单根据选择项内容的差异，可以有以下不同的样式

::: demo demos/options-layout
:::

### 树形下拉菜单
用于选择项需要多级选择的场景 例如地区、区域、食物的选择

::: demo demos/tree-menu
:::

## 样式

### 禁用菜单/选项

::: demo demos/disabled
:::


### 2自定义选单

::: demo demos/customized-menu
:::

**注意：同时指定了 `options` 属性和内部自定义内容时，将优先展示自定义内容。**

## API

### DropdownMenu Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
activeColor | String | - | 菜单标题和选项的选中态颜色 | N
closeOnClickOverlay | Boolean | true | 是否在点击遮罩层后关闭菜单 | N
duration | String / Number | 200 | 动画时长 | N
overlay | Boolean | true | 是否显示遮罩层 | N
zIndex | Number | - | 菜单栏 z-index 层级 | N


### DropdownItem Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 是否禁用 | N
options | Array | - | 选项数据。TS 类型：`Array<TdDropdownItemOption>`。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
optionsColumns | String / Number | - | 选项分栏（1-3） | N
optionsLayout | String | columns | 选项排列。可选项：columns/tree | N
selectMode | String | single | 选取模式。可选项：single/multi | N
title | String | - | 标题 | N
value | String / Number / Array | - | 选中值。支持语法糖。TS 类型：`TdDropdownItemOptionValueType | Array<TdDropdownItemOptionValueType> `。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
defaultValue | String / Number / Array | - | 选中值。非受控属性。TS 类型：`TdDropdownItemOptionValueType | Array<TdDropdownItemOptionValueType> `。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
