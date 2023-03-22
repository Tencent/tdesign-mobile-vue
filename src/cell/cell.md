:: BASE_DOC ::

## API
### Cell Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | middle | 内容的对齐方式，默认居中对齐。可选项：top/middle/bottom | N
arrow | Boolean | false | 是否显示右侧箭头 | N
bordered | Boolean | true | 是否显示下边框 | N
description | String / Slot / Function | - | 下方内容描述。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
hover | Boolean | - | 是否开启点击反馈 | N
image | String / Slot / Function | - | 主图。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
leftIcon | Slot / Function | - | 左侧图标，出现在单元格标题的左侧。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
note | String / Slot / Function | - | 和标题同行的说明文字。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
required | Boolean | false | 是否显示表单必填星号 | N
rightIcon | Slot / Function | - | 最右侧图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | 标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>右侧内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### Cell Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 右侧内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)

### CellGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bordered | Boolean | - | 是否显示组边框 | N
theme | String | default | `0.15.0`。单元格组风格。可选项：default/card | N
title | String | - | 单元格组标题 | N
