---
title: Tag 标签
description: 用于表明主体的类目，属性或状态。
spline: base
isComponent: true
toc: false
---

### 展示型标签
通常跟在标题后方或内容信息下方，用于内容属性或状态的辅助性展示，不可点击。一般用在列表的场景中标签文字建议控制在4个汉字以内（2英文字母= 1汉字）

#### 风格

::: demo demos/theme
:::

#### 主题效果

::: demo demos/variant
:::

#### 大小

::: demo demos/size
:::

#### 圆角

::: demo demos/shape
:::

#### 超长省略

::: demo demos/ellipsis
:::

### 点击型标签
用于展示内容分类，单击后改变标签状态，对当前页面内容进行筛选及选择。
标签文字建议控制在6个汉字以内（2英文字母= 1汉字）
不带图标型，点击后只改变状态

### 可关闭

::: demo demos/closable
:::

### 点击型标签

::: demo demos/checkable
:::

## API

### Tag Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closable | Boolean | false | 标签是否可关闭 | N
content | String / Number / Slot / Function | - | 组件子元素。TS 类型：`string | number | TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态 | N
icon | Slot / Function | undefined | 标签中的图标，可自定义图标呈现。TS 类型：`TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxWidth | String / Number | - | 标签最大宽度，宽度超出后会出现省略号。示例：'50px' / 80。TS 类型：`CSSProperties['maxWidth'] | number`。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/tag/type.ts) | N
shape | String | square | 标签类型，有三种：方形、圆角方形、标记型。可选项：square/round/mark | N
size | String | medium | 标签尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
theme | String | default | 组件风格，用于描述组件不同的应用场景。可选项：default/primary/warning/danger/success | N
variant | String | dark | 影响标签风格（theme）。可选项：dark/light/plain | N
onClick | Function |  | 点击时触发。`(context: { e: MouseEvent }) => {}` | N
onClose | Function |  | 如果关闭按钮存在，点击关闭按钮时触发。`(context: { e: MouseEvent }) => {}` | N

### Tag Events
名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 点击时触发
close | `(context: { e: MouseEvent })` | 如果关闭按钮存在，点击关闭按钮时触发


### CheckTag Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
checked | Boolean | false | 标签选中的状态，默认风格（theme=default）才有选中态。支持语法糖 | N
defaultChecked | Boolean | false | 标签选中的状态，默认风格（theme=default）才有选中态。非受控属性 | N
closable | Boolean | false | 标签是否可关闭 | N
content | String / Number / Slot / Function | - | 组件子元素。TS 类型：`string | number | TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态 | N
icon | Slot / Function | - | 标签中的图标，可自定义图标呈现。TS 类型：`TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
shape | String | square | 标签类型，有三种：方形、圆角方形、标记型。可选项：square/round/mark | N
size | String | medium | 标签尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onChange | Function |  | 组件子元素。`(checked: boolean) => {}` | N
onClick | Function |  | 点击标签时触发。`(context: { e: MouseEvent }) => {}` | N

### CheckTag Events
名称 | 参数 | 描述
-- | -- | --
change | `(checked: boolean)` | 组件子元素。支持语法糖
click | `(context: { e: MouseEvent })` | 点击标签时触发
