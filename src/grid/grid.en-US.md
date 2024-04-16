:: BASE_DOC ::

## API

### Grid Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | center | options: left/center | N
border | Boolean | false | \- | N
column | Number | 4 | \- | N
gutter | Number | - | \- | N
theme | String | default | options: default/card | N


### Col Props

name | type | default | description | required
-- | -- | -- | -- | --
offset | String / Number | - | \- | N
span | String / Number | - | \- | N


### Row Props

name | type | default | description | required
-- | -- | -- | -- | --
gutter | String / Number | - | \- | N


### GridItem Props

name | type | default | description | required
-- | -- | -- | -- | --
badge | Object | null | Typescript：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/grid/type.ts) | N
description | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
image | String / Object / Slot / Function | - | Typescript：`string \| object \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | vertical | options: vertical/horizontal | N
text | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-grid-bg-color | @bg-color-container | - 
--td-grid-card-radius | @radius-large | - 
--td-grid-item-bg-color | @bg-color-container | - 
--td-grid-item-border-color | @component-stroke | - 
--td-grid-item-description-color | @font-gray-3 | - 
--td-grid-item-description-font-size | 12px | - 
--td-grid-item-description-line-height | 20px | - 
--td-grid-item-description-padding-top | 4px | - 
--td-grid-item-horizontal-padding | 16px 0 | - 
--td-grid-item-horizontal-text-description-top | 2px | - 
--td-grid-item-horizontal-text-padding-left | 12px | - 
--td-grid-item-hover-bg-color | @bg-color-secondarycontainer | - 
--td-grid-item-image-bg-color | @bg-color-secondarycontainer | - 
--td-grid-item-image-border-radius | @radius-default | - 
--td-grid-item-image-middle-width | 40px | - 
--td-grid-item-image-small-width | 32px | - 
--td-grid-item-image-width | 48px | - 
--td-grid-item-text-color | @font-gray-1 | - 
--td-grid-item-text-font-size | 14px | - 
--td-grid-item-text-line-height | 22px | - 
--td-grid-item-text-padding-top | 8px | - 
--td-grid-item-vertical-padding | 16px 0 12px | -