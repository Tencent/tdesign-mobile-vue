:: BASE_DOC ::

## API
### Toast Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
direction | String | row | 图标排列方式。可选项：row/column | N
duration | Number | 2000 | 弹窗显示毫秒数 | N
icon | String / Slot / Function | - | 自定义图标。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
message | String / Slot / Function | - | 弹窗显示文字。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
overlayProps | Object | {} | 遮罩层属性，透传至 Overlay | N
placement | String | middle | 弹窗展示位置。可选项： top/middle/bottom | N
preventScrollThrough | Boolean | false | 防止滚动穿透，即不允许点击和滚动 | N
showOverlay | Boolean | false | 是否显示遮罩层 | N
theme | String | - | 提示类型。可选项：loading/success/fail | N
