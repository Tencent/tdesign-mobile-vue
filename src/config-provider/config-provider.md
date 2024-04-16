---
title: 全局特性配置
description: 全局特性配置包含各个组件的文本语言配置及其他通用配置，可以减少重复的通用配置。
spline: base
isComponent: true
tdDocTabs: [{ tab: 'demo', name: '示例' }, { tab: 'api', name: 'API' }]
toc: false
---

### 国际化配置

TDesign 支持国际化/多语言配置，目前支持的语言包括:

语言 | 对应文件
-- | --
简体中文 | `zh_CN`
英语 | `en_US`


如果你想贡献更多语言包，欢迎参考 [如何新增语言包](https://github.com/Tencent/tdesign-common/blob/develop/js/global-config/locale/CONTRIBUTING.md) 发起 PR。

### Upload 表格

{{ upload-en }}

### Table 表格

{{ table-en }}

### 其他组件

{{ other-en }}

## API
### GlobalConfigProvider

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
animation | Object | - | 动画效果控制，`ripple` 指波纹动画， `expand` 指展开动画，`fade` 指渐变动画。默认为 `{ include: ['ripple','expand','fade'], exclude: [] }`。TS 类型：`Partial<Record<'include'\|'exclude', Array<AnimationType>>>` `type AnimationType = 'ripple' \| 'expand' \| 'fade'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/config-provider/type.ts) | N
classPrefix | String | t | CSS 类名前缀 | N

### InputConfig

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
placeholder | String | - | 语言配置，“请输入”占位符描述文本 | N

### ImageConfig

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
errorText | String | - | 图片加载失败显示的文本，中文默认为“图片无法显示” | N
loadingText | String | - | 图片加载中显示的文本，中文默认为“图片加载中” | N
replaceImageSrc | Function | - | 统一替换图片 `src` 地址，参数为组件的全部属性，返回值为新的图片地址。TS 类型：`(params: ImageProps) => string`，[Image API Documents](./image?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/config-provider/type.ts) | N
