:: BASE_DOC ::

## API
### Fab Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
buttonProps | Object | - | 透传至 Button 组件 | N
icon | Slot / Function | - | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
style | String | right: 16px; bottom: 32px; | 悬浮按钮的样式，常用于调整位置 | N
text | String | - | 文本内容 | N
onClick | Function |  | TS 类型：`({e: MouseEvent}) => void`<br/>悬浮按钮点击事件 | N

### Fab Events

名称 | 参数 | 描述
-- | -- | --
click | `({e: MouseEvent})` | 悬浮按钮点击事件
