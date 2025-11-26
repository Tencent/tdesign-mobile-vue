:: BASE_DOC ::

## API

### Cell Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | middle | options: top/middle/bottom | N
arrow | Boolean | false | \- | N
bordered | Boolean | true | \- | N
description | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
hover | Boolean | - | \- | N
image | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
leftIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
note | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
required | Boolean | false | \- | N
rightIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### Cell Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)


### CellGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
bordered | Boolean | false | \- | N
theme | String | default | `0.15.0`。options: default/card | N
title | String | - | \- | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-border-left-space | @cell-horizontal-padding | -
--td-cell-bg-color | @bg-color-container | -
--td-cell-border-color | @component-stroke | -
--td-cell-border-right-space | 0 | -
--td-cell-description-color | @text-color-secondary | -
--td-cell-description-font | @font-body-medium | -
--td-cell-group-border-color | @border-color | -
--td-cell-group-title-bg-color | @bg-color-secondarycontainer | -
--td-cell-group-title-color | @text-color-placeholder | -
--td-cell-group-title-font-size | 14px | -
--td-cell-group-title-line-height | 45px | -
--td-cell-group-title-padding-left | 16px | -
--td-cell-height | auto | -
--td-cell-horizontal-padding | 16px | -
--td-cell-hover-color | @bg-color-secondarycontainer | -
--td-cell-image-height | 48px | -
--td-cell-image-width | 48px | -
--td-cell-left-icon-color | @brand-color | -
--td-cell-left-icon-font-size | 24px | -
--td-cell-note-color | @text-color-placeholder | -
--td-cell-note-font | @font-body-medium | -
--td-cell-required-color | @error-color-6 | -
--td-cell-required-font | @font-body-medium | -
--td-cell-right-icon-color | @text-color-placeholder | -
--td-cell-right-icon-font-size | 24px | -
--td-cell-title-color | @text-color-primary | -
--td-cell-title-font | @font-body-large | -
--td-cell-vertical-padding | 16px | -
