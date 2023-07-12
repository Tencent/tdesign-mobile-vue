:: BASE_DOC ::

## API
### Navbar Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | Boolean | true | \- | N
capsule | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
fixed | Boolean | true | \- | N
left | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
leftArrow | Boolean | false | \- | N
right | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | page title。Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
titleMaxLength | Number | - | \- | N
visible | Boolean | true | \- | N
onLeftClick | Function |  | Typescript：`() => void` | N
onRightClick | Function |  | Typescript：`() => void` | N

### Navbar Events

name | params | description
-- | -- | --
left-click | \- | \-
right-click | \- | \-


### CSS Variables
The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-navbar-bg-color | @bg-color-container | - 
--td-navbar-capsule-border-color | #e3e6ea | - 
--td-navbar-capsule-border-radius | 16px | - 
--td-navbar-capsule-height | 32px | - 
--td-navbar-capsule-width | 88px | - 
--td-navbar-color | @font-gray-1 | - 
--td-navbar-height | 48px | - 
--td-navbar-left-arrow-size | 24px | - 
--td-navbar-padding-top | 0 | - 
--td-navbar-right | 95px | - 
--td-navbar-title-font-size | 18px | - 
--td-navbar-title-font-weight | 600 | - 
