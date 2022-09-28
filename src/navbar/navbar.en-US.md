:: BASE_DOC ::

## API

### Navbar Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | Boolean | true | \- | N
background | String | - | background | N
fixed | Boolean | true | \- | N
homeIcon | Boolean / Slot / Function | - | homeIcon。Typescript：`boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
leftIcon | Boolean / Slot / Function | false | Typescript：`boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
rightIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | page title。Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
titleMaxLength | Number | - | \- | N
visible | Boolean | true | \- | N
onHomeClick | Function |  | Typescript：`() => void`<br/> | N
onLeftClick | Function |  | Typescript：`() => void`<br/> | N

### Navbar Events

name | params | description
-- | -- | --
home-click | \- | \-
left-click | \- | \-
