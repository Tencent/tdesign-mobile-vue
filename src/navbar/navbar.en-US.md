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
