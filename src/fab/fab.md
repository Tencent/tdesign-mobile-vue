:: BASE_DOC ::

## API

### Fab Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
buttonProps | Object | - | 透传至 Button 组件。TS 类型：`ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/fab/type.ts) | N
draggable | String / Boolean | false | 是否可拖拽。`true` / `'all'`可拖动<br>`'vertical'`可垂直拖动<br>`'horizontal'`可水平拖动<br>`false`禁止拖动。TS 类型：`boolean \| FabDirectionEnum ` `type FabDirectionEnum = 'all' \| 'vertical' \| 'horizontal'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/fab/type.ts) | N
icon | Slot / Function | - | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
style | String / Object | 'right: 16px; bottom: 32px;' | 悬浮按钮的样式，常用于调整位置。TS 类型：`string \| Styles`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
text | String | - | 文本内容 | N
yBounds | Array | - | 设置垂直方向边界限制，示例：[48, 48] 或 ['96px', 80]。TS 类型：`Array<string \| number>` | N
onClick | Function |  | TS 类型：`(context: {e: MouseEvent}) => void`<br/>悬浮按钮点击事件 | N
onDragEnd | Function |  | TS 类型：`(context: { e: TouchEvent }) => void`<br/>结束拖拽时触发 | N
onDragStart | Function |  | TS 类型：`(context: { e: TouchEvent }) => void`<br/>开始拖拽时触发 | N

### Fab Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: {e: MouseEvent})` | 悬浮按钮点击事件
drag-end | `(context: { e: TouchEvent })` | 结束拖拽时触发
drag-start | `(context: { e: TouchEvent })` | 开始拖拽时触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-fab-shadow | @shadow-2 | - 
