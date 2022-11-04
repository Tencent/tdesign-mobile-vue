:: BASE_DOC ::

## API
### Navbar Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | Boolean | true |【developing】 | N
background | String | - | background | N
fixed | Boolean | true | \- | N
homeIcon | Boolean / Slot / Function | - | homeIcon。Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
leftIcon | Boolean / Slot / Function | false | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
rightIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | page title。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
titleMaxLength | Number | - | \- | N
visible | Boolean | true | \- | N
onLeftClick | Function |  | Typescript：`(trigger: NavBarTrigger) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/navbar/type.ts)。<br/>`type NavBarTrigger = 'home-icon' \| 'left-icon';`<br/> | N
onRightClick | Function |  | Typescript：`() => void`<br/> | N

### Navbar Events

name | params | description
-- | -- | --
left-click | `(trigger: NavBarTrigger)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/navbar/type.ts)。<br/>`type NavBarTrigger = 'home-icon' \| 'left-icon';`<br/>
right-click | \- | \-
