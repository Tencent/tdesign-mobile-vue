:: BASE_DOC ::

## API
### Grid Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | center | options：left/center | N
border | Boolean | false | \- | N
column | Number | 4 | \- | N
gutter | Number | - | \- | N
theme | String | default | options：default/card | N

### GridItem Props

name | type | default | description | required
-- | -- | -- | -- | --
badge | Object | null | Typescript：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/grid/type.ts) | N
description | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
image | String / Object / Slot / Function | - | Typescript：`string \| object \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | vertical | options：vertical/horizontal | N
text | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
