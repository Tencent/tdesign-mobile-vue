:: BASE_DOC ::

## API
### Message Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 文本对齐方式。可选项：left/center。TS 类型：`MessageAlignType` `type MessageAlignType = 'left' | 'center'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
closeBtn | String / Boolean / Slot / Function | undefined | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮。TS 类型：`string | boolean | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 用于自定义消息弹出内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
duration | Number | 3000 | 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。 | N
theme | String | info | 消息组件风格。可选项：info/success/warning/error。TS 类型：`MessageThemeList` `type MessageThemeList = 'info' | 'success' | 'warning' | 'error'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
visible | Boolean | false | 是否显示，隐藏时默认销毁组件 | N
zIndex | Number | - | 元素层级，样式默认为 5000 | N
onClose | Function |  | TS 类型：`() => void`<br/>关闭Message时触发 | N
onClosed | Function |  | TS 类型：`() => void`<br/>关闭Message时并且动画结束后触发 | N
onOpen | Function |  | TS 类型：`() => void`<br/>展示Message时触发 | N
onOpened | Function |  | TS 类型：`() => void`<br/>展示Message时并且动画结束后触发 | N
onVisibleChange | Function |  | TS 类型：`(visible: boolean) => void`<br/>可见性变化时触发 | N

### Message Events

名称 | 参数 | 描述
-- | -- | --
close | - | 关闭Message时触发
closed | - | 关闭Message时并且动画结束后触发
open | - | 展示Message时触发
opened | - | 展示Message时并且动画结束后触发
visible-change | `(visible: boolean)` | 可见性变化时触发
