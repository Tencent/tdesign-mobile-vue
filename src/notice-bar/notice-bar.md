---
title: Noticebar 公告栏
description: 在导航栏下方，用于给用户显示提示消息
spline: base
isComponent: true
toc: false
---


## 组件类型

在 TDesign 中，拥有四种不同类型的消息栏：静态消息栏、带图标静态消息栏、带操作消息栏、滚动消息栏

### 静态消息栏

用于呈现产品某项功能的解释说明、使用注意事项等，用于比较简短的内容提示，一般放在导航栏下面

::: demo demos/static
:::

### 带静态图标消息栏

视觉强调程度上强于普通消息栏

::: demo demos/index
:::

### 带操作消息栏

支持关闭消息通知或查看消息详情

::: demo demos/mode
:::

### 滚动消息栏

用于呈现用户需要强关注的信息
滚动消息栏提供了两种样式：横向滚动消息栏、纵向轮播消息栏
横向滚动消息栏：一般用于比较简短的内容提示
纵向轮播消息栏：当需要同时提示多条内容时，可使用轮播提示条来承载，避免页面上同时出现多条提示条挤占内容。

::: demo demos/scrolling
:::

## 样式

在 TDesign 中，拥有两种样式可以选择：蓝色消息栏、红色消息栏

### 蓝色消息栏

用于呈现产品某项功能的解释说明、使用注意事项等，一般而言，提示的内容不对业务正常使用造成影响

::: demo demos/typeInfo
:::

### 红色消息栏

用于呈现将影响业务的正常使用，强烈需要引起用户关注的内容 例如：产品到期或将到期

::: demo demos/typeError
:::

## API

### NoticeBar Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bgColor | String | - | 背景色 | N
color | String | - | 文本颜色 | N
content | String | - | 文本内容 | N
delay | Number | 0 | 延迟 | N
detailText | String | - | 详情 | N
detailTextColor | String | - | 详情颜色 | N
iconColor | String | - | 图标颜色 | N
leftIcon | Slot / Function | - | 左边图标。TS 类型：`TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
mode | String | - | 模式。可选项：link/closeable | N
rightIcon | Slot / Function | - | 左边图标。TS 类型：`TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
scrollable | Boolean | - | 是否需要滚动 | N
speed | Number | 50 | 滚动速度 | N
onClick | Function |  | 点击事件。`() => {}` | N
onClose | Function |  | 关闭。`() => {}` | N
onDetail | Function |  | 详情点击。`() => {}` | N

### NoticeBar Events
名称 | 参数 | 描述
-- | -- | --
click | - | 点击事件
close | - | 关闭
detail | - | 详情点击
