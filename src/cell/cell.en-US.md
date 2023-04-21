:: BASE_DOC ::

## API
### Cell Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | middle | options：top/middle/bottom | N
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
bordered | Boolean | - | \- | N
theme | String | default | `0.15.0`。options：default/card | N
title | String | - | \- | N
