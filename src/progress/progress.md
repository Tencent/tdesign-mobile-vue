---
title: Progress 进度条
description: 用于需要准确告知某个任务的当前进度
spline: base
isComponent: true
toc: false
---

### 基础进度条

一般用于操作任务周期较长时，表示当前任务所处的阶段

::: demo demos/index
:::

### 隐藏数值进度条

相比基础进度条更轻量，一般用于任务提示较短的场景

::: demo demos/text
:::

## 样式

### 颜色

::: demo demos/type
:::

## 自定义样式

::: demo demos/color
:::

## API

### Progress Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
color | String / Object / Array | '' | 进度条颜色。示例：'#ED7B2F' 或 'orange' 或 ['#f00', '#0ff', '#f0f'] 或 { '0%': '#f00', '100%': '#0ff' } 或  { from: '#000', to: '#000' } 等。TS 类型：`string | Array<string> | Record<string, string>` | N
label | String / Boolean / Slot / Function | true | 进度百分比，可自定义。TS 类型：`string | boolean | TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
percentage | Number | 0 | 进度条百分比 | N
size | String / Number | 'medium' | 进度条尺寸，示例：small/medium/large/240。small 值为 72； medium 值为 112；large 值为 160 | N
status | String | - | 进度条状态。可选项：success/error/warning/active。TS 类型：`StatusEnum`。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/progress/type.ts) | N
strokeWidth | String / Number | - | 进度条线宽。宽度数值不能超过 size 的一半，否则不能输出环形进度 | N
theme | String | line | 进度条风格。值为 line，标签（label）显示在进度条右侧；值为 plump，标签（label）显示在进度条里面；值为 circle，标签（label）显示在进度条正中间。可选项：line/plump/circle。TS 类型：`ThemeEnum`。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/progress/type.ts) | N
trackColor | String | '' | 进度条未完成部分颜色 | N
