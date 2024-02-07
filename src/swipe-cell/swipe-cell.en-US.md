:: BASE_DOC ::

## API

### SwipeCell Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | - | \- | N
left | Array / Slot / Function | - | Typescript：`Array<SwipeActionItem>` | N
opened | Boolean / Array | false | Typescript：`boolean \| Array<boolean>` | N
right | Array / Slot / Function | - | Typescript：`Array<SwipeActionItem>` `interface SwipeActionItem {text: string; className?: string; style?: string; onClick?: () => void; [key: string]: any }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swipe-cell/type.ts) | N
onChange | Function |  | Typescript：`(value: string) => void`<br/> | N
onClick | Function |  | Typescript：`(action: SwipeActionItem, source: SwipeSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swipe-cell/type.ts)。<br/>`type SwipeSource = 'left' \| 'right'`<br/> | N

### SwipeCell Events

name | params | description
-- | -- | --
change | `(value: string)` | \-
click | `(action: SwipeActionItem, source: SwipeSource)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swipe-cell/type.ts)。<br/>`type SwipeSource = 'left' \| 'right'`<br/>
