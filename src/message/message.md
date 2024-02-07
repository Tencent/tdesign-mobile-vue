:: BASE_DOC ::

## API
### Message Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 文本对齐方式。可选项：left/center。TS 类型：`MessageAlignType` `type MessageAlignType = 'left' \| 'center'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
closeBtn | String / Boolean / Slot / Function | undefined | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。也可以完全自定义按钮。TS 类型：`string \| boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 用于自定义消息弹出内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
duration | Number | 3000 | 消息内置计时器，计时到达时会触发 duration-end 事件。单位：毫秒。值为 0 则表示没有计时器。 | N
icon | Boolean / Slot / Function | true | 用于自定义消息前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
link | String / Object / Slot / Function | - | 链接名称。值为字符串表示链接名称，值为 Object 类型，表示透传至 Link。TS 类型：`string \| object \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
marquee | Boolean / Object | false | 跑马灯效果。speed 指速度控制；loop 指循环播放次数，值为 -1 表示循环播放，值为 0 表示不循环播放；delay 表示延迟多久开始播放。TS 类型：`boolean \| DrawMarquee` `interface DrawMarquee { speed?: number; loop?: number; delay?: number }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
offset | Array | - | 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10rpx', '8rpx']。TS 类型：`Array<string \| number>` | N
theme | String | info | 消息组件风格。可选项：info/success/warning/error。TS 类型：`MessageThemeList` `type MessageThemeList = 'info' \| 'success' \| 'warning' \| 'error'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
visible | Boolean | false | 是否显示，隐藏时默认销毁组件。支持语法糖 `v-model` 或 `v-model:visible` | N
defaultVisible | Boolean | false | 是否显示，隐藏时默认销毁组件。非受控属性 | N
zIndex | Number | - | 元素层级，样式默认为 5000 | N
onChange | Function |  | TS 类型：`(visible: boolean) => void`<br/>已废弃。可见性变化时触发 | N
onClose | Function |  | TS 类型：`(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent }) => void`<br/>已废弃。关闭消息时触发。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onCloseBtnClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>当关闭按钮存在时，用户点击关闭按钮触发 | N
onClosed | Function |  | TS 类型：`() => void`<br/>已废弃。关闭消息并且动画结束后触发 | N
onDurationEnd | Function |  | TS 类型：`() => void`<br/>计时结束后触发 | N
onLinkClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>当link链接存在时，点击链接文本时触发 | N
onOpen | Function |  | TS 类型：`() => void`<br/>已废弃。展示Message时触发 | N
onOpened | Function |  | TS 类型：`() => void`<br/>已废弃。展示Message时并且动画结束后触发 | N

### Message Events

名称 | 参数 | 描述
-- | -- | --
change | `(visible: boolean)` | 已废弃。可见性变化时触发
close | `(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent })` | 已废弃。关闭消息时触发。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)
close-btn-click | `(context: { e: MouseEvent })` | 当关闭按钮存在时，用户点击关闭按钮触发
closed | \- | 已废弃。关闭消息并且动画结束后触发
duration-end | \- | 计时结束后触发
link-click | `(context: { e: MouseEvent })` | 当link链接存在时，点击链接文本时触发
open | \- | 已废弃。展示Message时触发
opened | \- | 已废弃。展示Message时并且动画结束后触发
