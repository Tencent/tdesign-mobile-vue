:: BASE_DOC ::

## API
### List Props

name | type | default | description | required
-- | -- | -- | -- | --
asyncLoading | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
footer | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
header | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onLoadMore | Function |  | Typescript：`() => void`<br/> | N
onScroll | Function |  | Typescript：`(scrollTop: number) => void`<br/> | N

### List Events

name | params | description
-- | -- | --
load-more | \- | \-
scroll | `(scrollTop: number)` | \-
