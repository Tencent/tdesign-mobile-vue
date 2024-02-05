:: BASE_DOC ::

## API

### Skeleton Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | String | none | options：gradient/flashed/none | N
delay | Number | 0 | \- | N
loading | Boolean | true | \- | N
rowCol | Array | [1, 1, 1, { width: '70%' }] | Typescript：`SkeletonRowCol` `type SkeletonRowCol = Array<Number \| SkeletonRowColObj \| Array<SkeletonRowColObj>>` `interface SkeletonRowColObj { width?: string; height?: string; size?: string; marginRight?: string; marginLeft?: string; margin?: string; content?: string \| TNode; type?: 'rect' \| 'circle' \| 'text' }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/skeleton/type.ts) | N
theme | String | text | options：avatar/image/text/paragraph | N
