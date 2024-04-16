:: BASE_DOC ::

## API

### Empty Props

name | type | default | description | required
-- | -- | -- | -- | --
action | Slot / Function | - | action block。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
description | String / Slot / Function | - | empty component description。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
icon | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
image | String / Slot / Function | - | image url, or Image component props, or custom any node you need.。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-empty-action-margin-top | @spacer-4 | - 
--td-empty-description-color | @font-gray-3 | - 
--td-empty-description-font-size | @font-size-base | - 
--td-empty-description-line-height | 44rpx | - 
--td-empty-description-margin-top | @spacer-2 | - 
--td-empty-icon-color | @font-gray-3 | -