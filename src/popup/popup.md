---
title: Popup 弹出层
description: 定义：由其他控件触发，屏幕滑出或弹出一块自定义内容区域
spline: base
isComponent: true
toc: false
---



## 组件类型
TDesign中，拥有两种不同类型的弹出层：中部弹出、底部弹出、顶部弹出、左侧弹出、右侧弹出

###  中部弹出
使用场景：常用于轻提示场景

::: demo demos/placementCenter
:::

### 底部弹出
使用场景：常用于较重要的操作反馈提示场景或不打断主任务的临时操作

::: demo demos/placementBottom
:::


### 顶部弹出
使用场景：常用于及时反馈

::: demo demos/placementTop
:::

### 左侧弹出
使用场景：常用于页面导航场景

::: demo demos/placementLeft
:::

### 右侧弹出
使用场景：常用于页面导航场景

::: demo demos/placementRight
:::


## 样式

### 自定义动画

::: demo demos/custom-animation
:::

## API

### Popup Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
lockScroll | Boolean | true | 是否锁定内容滚动 | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/center | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
teleportDisabled | Boolean | false | 是否禁用teleport | N
to | String | body | 透传给teleport组件的to属性 | N
transitionName | String | - | 弹出层内容区的动画名，等价于transition组件的name属性 | N
visible | Boolean | false | 是否显示浮层。支持语法糖。TS 类型：`boolean` | N
defaultVisible | Boolean | false | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
zIndex | Number | - | 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 | N
onClose | Function |  | 组件准备关闭时触发。`() => {}` | N
onClosed | Function |  | 组件关闭且动画结束后执行。`() => {}` | N
onOpen | Function |  | 组件准备展示时触发。`() => {}` | N
onOpened | Function |  | 组件展示且动画结束后执行。`() => {}` | N
onVisibleChange | Function |  | 当浮层隐藏或显示时触发。`(visible: boolean) => {}` | N

### Popup Events
名称 | 参数 | 描述
-- | -- | --
close | - | 组件准备关闭时触发
closed | - | 组件关闭且动画结束后执行
open | - | 组件准备展示时触发
opened | - | 组件展示且动画结束后执行
visible-change | `(visible: boolean)` | 当浮层隐藏或显示时触发
