:: BASE_DOC ::

## API

### Sticky Props

name | type | default | description | required
-- | -- | -- | -- | --
container | Object | - | | N
disabled | Boolean | false | \- | N
offsetTop | String / Number | 0 | \- | N
zIndex | Number | 99 | \- | N
onScroll | Function |  | Typescript：`(context: { scrollTop: number, isFixed: boolean }) => void`<br/>Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### Sticky Events

name | params | description
-- | -- | --
scroll | `(context: { scrollTop: number, isFixed: boolean })` | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)
