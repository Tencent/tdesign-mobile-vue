:: BASE_DOC ::

## API
### Popup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
closeBtn | Boolean / Slot / Function | - | 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以自定义关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
closeOnOverlayClick | Boolean | true | 点击遮罩层是否关闭 | N
overlayProps | Object | {} | 遮罩层的属性，透传至 overlay | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/center | N
preventScrollThrough | Boolean | true | 防止滚动穿透 | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
transitionName | String | - | 弹出层内容区的动画名，等价于transition组件的name属性 | N
visible | Boolean | - | 是否显示浮层。支持语法糖 `v-model` 或 `v-model:visible`。TS 类型：`boolean` | N
zIndex | Number | - | 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 | N
onClose | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>组件准备关闭时触发 | N
onClosed | Function |  | TS 类型：`() => void`<br/>组件关闭且动画结束后执行 | N
onOpen | Function |  | TS 类型：`() => void`<br/>组件准备展示时触发 | N
onOpened | Function |  | TS 类型：`() => void`<br/>组件展示且动画结束后执行 | N
onVisibleChange | Function |  | TS 类型：`(visible: boolean, trigger: PopupSource)  => void`<br/>当浮层隐藏或显示时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/popup/type.ts)。<br/>`type PopupSource = 'close-btn' \| 'overlay'`<br/> | N

### Popup Events

名称 | 参数 | 描述
-- | -- | --
close | `(context: { e: MouseEvent })` | 组件准备关闭时触发
closed | \- | 组件关闭且动画结束后执行
open | \- | 组件准备展示时触发
opened | \- | 组件展示且动画结束后执行
visible-change | `(visible: boolean, trigger: PopupSource) ` | 当浮层隐藏或显示时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/popup/type.ts)。<br/>`type PopupSource = 'close-btn' \| 'overlay'`<br/>
