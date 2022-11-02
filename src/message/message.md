:: BASE_DOC ::

## API
### Message Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 文本对齐方式。可选项：left/center。TS 类型：`MessageAlignType` `type MessageAlignType = 'left' | 'center'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
closeBtn | Boolean / Slot / Function | false | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮，也可以完全自定义按钮。TS 类型：`string | boolean | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 用于自定义消息弹出内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
duration | Number | 3000 | 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。 | N
icon | Boolean / Slot / Function | true | 消息提醒前面的图标。值为 true 则根据 theme 显示对应的图标，值为 false 则不显示图标，也可以完全自定义图标节点。TS 类型：`boolean | 'info' | 'bell'` | N
marquee | Boolean / Object | false | 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放。TS 类型：`boolean | DrawMarquee` `interface DrawMarquee { speed?: number; loop?: number; delay?: number }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
offset | Array | - | 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10rpx', '8rpx']。TS 类型：`Array<string | number>` | N
theme | String | info | 消息组件风格。可选项：info/success/warning/error。TS 类型：`MessageThemeList` `type MessageThemeList = 'info' | 'success' | 'warning' | 'error'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
visible | Boolean | false | 是否显示，隐藏时默认销毁组件。支持语法糖 `v-model` 或 `v-model:visible` | N
defaultVisible | Boolean | false | 是否显示，隐藏时默认销毁组件。非受控属性 | N
zIndex | Number | - | 元素层级，样式默认为 5000 | N
onChange | Function |  | TS 类型：`(visible: boolean) => void`<br/>可见性变化时触发 | N
onClose | Function |  | TS 类型：`() => void`<br/>关闭Message时触发 | N
onClosed | Function |  | TS 类型：`() => void`<br/>关闭Message时并且动画结束后触发 | N
onOpen | Function |  | TS 类型：`() => void`<br/>展示Message时触发 | N
onOpened | Function |  | TS 类型：`() => void`<br/>展示Message时并且动画结束后触发 | N

### Message Events

名称 | 参数 | 描述
-- | -- | --
change | `(visible: boolean)` | 可见性变化时触发
close | \- | 关闭Message时触发
closed | \- | 关闭Message时并且动画结束后触发
open | \- | 展示Message时触发
opened | \- | 展示Message时并且动画结束后触发
