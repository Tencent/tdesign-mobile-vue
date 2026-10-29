:: BASE_DOC ::

## API

### Comment Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
actions | Array / Slot / Function | - | 操作。TS 类型：`Array<CommentActionItem> \| TNode ` `type ActionPlacement = 'start' \| 'end'` `interface CommentActionItem { key: string; content?: string \| TNode; placement?: ActionPlacement; disabled?: boolean}`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/comment/type.ts) | N
author | String / Slot / Function | - | 作者。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
avatar | String / Object / Slot / Function | - | 头像。TS 类型：`string \| AvatarProps \| TNode`，[Avatar API Documents](./avatar?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/comment/type.ts) | N
content | String / Slot / Function | - | 内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
datetime | String / Slot / Function | - | 时间。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
folds | Object | - | 折叠/展开配置项。支持语法糖 `v-model` 或 `v-model:folds`。TS 类型：`CommentFold ` `type CommentFoldState = 'collapsed' \| 'partial' \| 'expanded'` `interface CommentFold { state: CommentFoldState; total?: number; step?: number; content?: Partial<Record<CommentFoldState, TNode \| [TNode, TNode]>>}`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/comment/type.ts) | N
reply | String / Slot / Function | - | 回复。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onActions | Function |  | TS 类型：`(context: { action: CommentActionItem \| TNode; e: Event }) => void`<br/>点击任一操作项（如回复/点赞/不喜欢）时触发并返回当前操作项。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onFolds | Function |  | TS 类型：`(context: { fold: CommentFold; e: Event }) => void`<br/>用户点击“展开回复/收起”时触发，并返回点击后的 fold 配置 | N

### Comment Events

名称 | 参数 | 描述
-- | -- | --
actions | `(context: { action: CommentActionItem \| TNode; e: Event })` | 点击任一操作项（如回复/点赞/不喜欢）时触发并返回当前操作项。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)
folds | `(context: { fold: CommentFold; e: Event })` | 用户点击“展开回复/收起”时触发，并返回点击后的 fold 配置
