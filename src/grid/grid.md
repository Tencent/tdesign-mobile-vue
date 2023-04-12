:: BASE_DOC ::

## API
### Grid Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | center | 内容对齐方式。可选项：left/center | N
border | Boolean | false | 是否显示边框 | N
column | Number | 4 | 每一行的列数量；为 0 时等于固定大小 | N
gutter | Number | - | 间隔大小 | N
theme | String | default | 宫格的风格。可选项：default/card | N

### GridItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
badgeProps | Object | null | 透传至 Badge 属性。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/grid/type.ts) | N
description | String / Slot / Function | - | 文本以外的更多描述，辅助信息。可以通过 Props 传入文本，也可以自定义标题节点。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
image | String / Object / Slot / Function | - | 图片，可以是图片地址，也可以自定义图片节点，如果传入对象则透传至 image 组件。TS 类型：`string \| object \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | vertical | 内容布局方式。可选项：vertical/horizontal | N
text | String / Slot / Function | - | 文本，可以通过 Props 传入文本，也可以自定义标题节点。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onClick | Function |  | TS 类型：`() => void`<br/>点击事件 | N

### GridItem Events

名称 | 参数 | 描述
-- | -- | --
click | \- | 点击事件
