:: BASE_DOC ::

## API
### Result Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
description | String / Slot / Function | - | 描述文字。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
icon | Slot / Function | - | 图标名称。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
image | String / Slot / Function | - | 图片地址。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
theme | String | default | 内置主题。。可选项：default/success/warning/error | N
title | String / Slot / Function | '' | 标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-result-description-color | @font-gray-2 | - 
--td-result-description-font-size | @font-size-base | - 
--td-result-description-line-height | 22px | - 
--td-result-description-margin-top | @spacer | - 
--td-result-icon-default-color | @brand-color | - 
--td-result-icon-error-color | @error-color | - 
--td-result-icon-success-color | @success-color | - 
--td-result-icon-warning-color | @warning-color | - 
--td-result-title-color | @font-gray-1 | - 
--td-result-title-font-size | @font-size-l | - 
--td-result-title-line-height | 28px | - 
--td-result-title-margin-top | @spacer-1 | - 
