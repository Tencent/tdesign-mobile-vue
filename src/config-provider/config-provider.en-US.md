---
title: "Global property configuration"
description: "The global attribute configuration contains the text language configuration of each component and other common configurations to reduce duplicate common configurations."
isComponent: true
tdDocTabs: [{ tab: 'demo', name: '示例' }, { tab: 'api', name: 'API' }]
toc: false
---

### Internationalization

The supported language TDesign provided:

Language | File
-- | --
Chinese (Simplified) | `zh_CN`
English | `en_US`


If you want to contribute more language packs, please refer to [How to add a language pack](https://github.com/Tencent/tdesign-common/blob/develop/js/global-config/locale/CONTRIBUTING.md) PR.

### Upload

{{ upload-en }}

### Table 

{{ table-en }}

### others

{{ other-en }}

## API

### GlobalConfigProvider

name | type | default | description | required
-- | -- | -- | -- | --
animation | Object | - | Typescript：`Partial<Record<'include'\|'exclude', Array<AnimationType>>>` `type AnimationType = 'ripple' \| 'expand' \| 'fade'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/config-provider/type.ts) | N
classPrefix | String | t | \- | N

### InputConfig

name | type | default | description | required
-- | -- | -- | -- | --
placeholder | String | - | \- | N

### ImageConfig

name | type | default | description | required
-- | -- | -- | -- | --
errorText | String | - | loading text, default value is "Error" | N
loadingText | String | - | loading text, default value is "loading" | N
replaceImageSrc | Function | - | replace all `src` attribute of images。Typescript：`(params: ImageProps) => string`，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/config-provider/type.ts) | N
