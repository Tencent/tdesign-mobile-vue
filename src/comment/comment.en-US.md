:: BASE_DOC ::

## API

### Comment Props

name | type | default | description | required
-- | -- | -- | -- | --
actions | Array / Slot / Function | - | Typescript: `Array<CommentActionItem> \| TNode ` `type ActionPlacement = 'start' \| 'end'` `interface CommentActionItem { key: string; content?: string \| TNode; placement?: ActionPlacement; disabled?: boolean}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/comment/type.ts) | N
author | String / Slot / Function | - | Typescript: `string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
avatar | String / Object / Slot / Function | - | Typescript: `string \| AvatarProps \| TNode`，[Avatar API Documents](./avatar?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/comment/type.ts) | N
content | String / Slot / Function | - | Typescript: `string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
datetime | String / Slot / Function | - | Typescript: `string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
folds | Object | - | `v-model` and `v-model:folds` is supported。Typescript: `CommentFold ` `type CommentFoldState = 'collapsed' \| 'partial' \| 'expanded'` `interface CommentFold { state: CommentFoldState; total?: number; step?: number; content?: Partial<Record<CommentFoldState, TNode \| [TNode, TNode]>>}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/comment/type.ts) | N
reply | String / Slot / Function | - | Typescript: `string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onActions | Function |  | Typescript: `(context: { action: CommentActionItem \| TNode; e: Event }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onFolds | Function |  | Typescript: `(context: { fold: CommentFold; e: Event }) => void`<br/> | N

### Comment Events

name | params | description
-- | -- | --
actions | `(context: { action: CommentActionItem \| TNode; e: Event })` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)
folds | `(context: { fold: CommentFold; e: Event })` | \-
