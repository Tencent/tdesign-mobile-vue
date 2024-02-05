:: BASE_DOC ::

## API

### Dialog Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
actions | Array / Slot / Function | - | 操作栏。TS 类型：`Array<ButtonProps>`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts) | N
buttonLayout | String | horizontal | 多按钮排列方式。可选项：horizontal/vertical | N
cancelBtn | String / Object / Slot / Function | - | 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件。TS 类型：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts) | N
closeOnOverlayClick | Boolean | undefined | 点击蒙层时是否触发关闭事件 | N
confirmBtn | String / Object / Slot / Function | - | 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件。TS 类型：`string \| ButtonProps \| TNode \| null`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | 是否在关闭弹框的时候销毁子元素 | N
overlayProps | Object | {} | 透传至 Overlay 组件 | N
preventScrollThrough | Boolean | true | 防止滚动穿透 | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
title | String / Slot / Function | - | 标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
visible | Boolean | false | 控制对话框是否显示 | N
width | String / Number | - | 对话框宽度，示例：320, '500px', '80%' | N
zIndex | Number | - | 对话框层级，Web 侧样式默认为 2500，移动端和小程序样式默认为 1500 | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件 | N
onClose | Function |  | TS 类型：`(context: DialogCloseContext) => void`<br/>关闭事件，点击 取消按钮 或 点击蒙层 时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent }`<br/> | N
onConfirm | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果“确认”按钮存在，则点击“确认”按钮时触发 | N
onOverlayClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果蒙层存在，点击蒙层时触发 | N

### Dialog Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 如果“取消”按钮存在，则点击“取消”按钮时触发，同时触发关闭事件
close | `(context: DialogCloseContext)` | 关闭事件，点击 取消按钮 或 点击蒙层 时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent }`<br/>
confirm | `(context: { e: MouseEvent })` | 如果“确认”按钮存在，则点击“确认”按钮时触发
overlay-click | `(context: { e: MouseEvent })` | 如果蒙层存在，点击蒙层时触发

### DialogOptions

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
className | String | - | 弹框类名，示例：'t-class-dialog-first t-class-dialog-second' | N
style | String / Object | - | 弹框 style 属性，输入 [CSSStyleDeclaration.cssText](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText)。TS 类型：`string \| Styles`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
`Omit<DialogProps, 'attach'>` | \- | - | 继承 `Omit<DialogProps, 'attach'>` 中的全部 API | N

### DialogInstance

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
destroy | \- | \- | 销毁弹框
hide | \- | \- | 隐藏弹框
show | \- | \- | 显示弹框
update | `(props: DialogOptions)` | \- | 更新弹框内容

### DialogPlugin

同时也支持 `this.$dialog`。

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | \- | - | TS 类型：`DialogOptions`

插件返回值：`DialogInstance`

### DialogPlugin.confirm

同时也支持 `this.$dialog.confirm`。

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | \- | - | TS 类型：`DialogOptions`

### DialogPlugin.alert

同时也支持 `this.$dialog.alert`。

参数名称 | 参数类型 | 参数默认值 | 参数说明
-- | -- | -- | --
options | Object | - | TS 类型：`Omit<DialogOptions, 'cancelBtn'>`
