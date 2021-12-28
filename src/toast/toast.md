:: BASE_DOC ::

## API

### Toast Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
direction | String | - | 图标排列方式。可选项：row/column | N
duration | Number | 2000 | 弹窗显示毫秒数 | N
icon | Slot / Function | - | 自定义图标。TS 类型：`TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
message | String | - | 弹窗显示文字 | N
position | String | middle | 弹窗展示位置。可选项： top/middle/bottom | N
showOverlay | Boolean | - | 是否显示背景遮罩，禁止背景点击和滚动 | N
type | String | - | 提示类型。可选项：loading/success/fail | N
