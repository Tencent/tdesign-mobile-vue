:: BASE_DOC ::

## API

### Avatar Props

name | type | default | description | required
-- | -- | -- | -- | --
alt | String | - | show it when url is not valid | N
badgeProps | Object | - | Typescript：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/avatar/type.ts) | N
hideOnLoadFailed | Boolean | false | hide image when loading image failed | N
icon | Slot / Function | - | use icon to fill。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
image | String | - | images url | N
imageProps | Object | - | Typescript：`ImageProps`，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/avatar/type.ts) | N
shape | String | - | shape。options: circle/round。Typescript：`ShapeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
size | String | - | size | N
onError | Function |  | Typescript：`(context: { e: Event }) => void`<br/>trigger on image load failed | N

### Avatar Events

name | params | description
-- | -- | --
error | `(context: { e: Event })` | trigger on image load failed


### AvatarGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
cascading | String | 'right-up' | multiple images cascading。options: left-up/right-up。Typescript：`CascadingValue` `type CascadingValue = 'left-up' \| 'right-up'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/avatar/type.ts) | N
collapseAvatar | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
max | Number | - | \- | N
shape | String | - | shape。options: circle/round。Typescript：`ShapeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
size | String | - | size | N
onCollapsedItemClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### AvatarGroup Events

name | params | description
-- | -- | --
collapsed-item-click | `(context: { e: MouseEvent })` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-avatar-group-margin-left-large | -8px | - 
--td-avatar-group-margin-left-medium | -6px | - 
--td-avatar-group-margin-left-small | -4px | - 
--td-avatar-bg-color | @brand-color-light-active | - 
--td-avatar-border-color | #fff | - 
--td-avatar-border-width-large | 4px | - 
--td-avatar-border-width-medium | 3px | - 
--td-avatar-border-width-small | 2px | - 
--td-avatar-circle-border-radius | @radius-circle | - 
--td-avatar-content-color | @brand-color | - 
--td-avatar-icon-large-font-size | 32px | - 
--td-avatar-icon-medium-font-size | 24px | - 
--td-avatar-icon-small-font-size | 20px | - 
--td-avatar-large-width | 64px | - 
--td-avatar-margin-left | 0 | - 
--td-avatar-medium-width | 48px | - 
--td-avatar-round-border-radius | @radius-default | - 
--td-avatar-small-width | 40px | - 
--td-avatar-text-large-font-size | 16px | - 
--td-avatar-text-medium-font-size | @font-size-base | - 
--td-avatar-text-small-font-size | @font-size-s | -