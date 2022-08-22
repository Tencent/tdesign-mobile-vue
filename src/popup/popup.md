:: BASE_DOC ::

## API
### Popup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
lockScroll | Boolean | true | 是否锁定内容滚动 | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/center | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
to | String | - | 透传给teleport组件的to属性 | N
transitionName | String | - | 弹出层内容区的动画名，等价于transition组件的name属性 | N
visible | Boolean | false | 是否显示浮层。支持语法糖 `v-model` 或 `v-model:visible`。TS 类型：`boolean` | N
defaultVisible | Boolean | false | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
zIndex | Number | - | 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 | N
closeOverlayClick | Boolean | - | 点击遮罩层是否触发关闭事件 | N
onClose | Function |  | TS 类型：`() => void`<br/>组件准备关闭时触发 | N
onClosed | Function |  | TS 类型：`() => void`<br/>组件关闭且动画结束后执行 | N
onOpen | Function |  | TS 类型：`() => void`<br/>组件准备展示时触发 | N
onOpened | Function |  | TS 类型：`() => void`<br/>组件展示且动画结束后执行 | N
onVisibleChange | Function |  | TS 类型：`(visible: boolean) => void`<br/>当浮层隐藏或显示时触发 | N

### Popup Events

名称 | 参数 | 描述
-- | -- | --
close | - | 组件准备关闭时触发
closed | - | 组件关闭且动画结束后执行
open | - | 组件准备展示时触发
opened | - | 组件展示且动画结束后执行
visible-change | `(visible: boolean)` | 当浮层隐藏或显示时触发
