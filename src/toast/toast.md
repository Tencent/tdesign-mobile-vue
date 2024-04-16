:: BASE_DOC ::

## API

### Toast Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
direction | String | row | 图标排列方式。可选项：row/column | N
duration | Number | 2000 | 弹窗显示毫秒数 | N
icon | String / Slot / Function | - | 自定义图标。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
message | String / Slot / Function | - | 弹窗显示文字。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
overlayProps | Object | {} | 遮罩层属性，透传至 Overlay。TS 类型：`OverlayProps `，[Overlay API Documents](./overlay?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/toast/type.ts) | N
placement | String | middle | 弹窗展示位置。可选项： top/middle/bottom | N
preventScrollThrough | Boolean | false | 防止滚动穿透，即不允许点击和滚动 | N
showOverlay | Boolean | false | 是否显示遮罩层 | N
theme | String | - | 提示类型。可选项：loading/success/error | N
onClose | Function |  | TS 类型：`() => void`<br/>轻提示隐藏的时候触发 | N
onDestroy | Function |  | TS 类型：`() => void`<br/>轻提示销毁的时候触发 | N

### Toast Events

名称 | 参数 | 描述
-- | -- | --
close | \- | 轻提示隐藏的时候触发
destroy | \- | 轻提示销毁的时候触发

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-toast-bg-color | @font-gray-1 | - 
--td-toast-color | @font-white-1 | - 
--td-toast-column-icon-size | 32px | - 
--td-toast-max-width | 187px | - 
--td-toast-radius | 4px | - 
--td-toast-row-icon-size | 24px | -