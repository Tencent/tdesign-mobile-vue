:: BASE_DOC ::

## API

### Dialog Props

name | type | default | description | required
-- | -- | -- | -- | --
actions | Array / Slot / Function | - | Typescript：`Array<ButtonProps>`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts) | N
buttonLayout | String | horizontal | options: horizontal/vertical | N
cancelBtn | String / Object / Slot / Function | - | Typescript：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts) | N
closeBtn | Boolean | false | \- | N
closeOnOverlayClick | Boolean | undefined | \- | N
confirmBtn | String / Object / Slot / Function | - | Typescript：`string \| ButtonProps \| TNode \| null`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | \- | N
overlayProps | Object | {} | Typescript：`OverlayProps`，[Overlay API Documents](./overlay?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts) | N
preventScrollThrough | Boolean | true | \- | N
showOverlay | Boolean | true | \- | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
visible | Boolean | - | \- | N
width | String / Number | - | \- | N
zIndex | Number | - | \- | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: DialogCloseContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent }`<br/> | N
onClosed | Function |  | Typescript：`() => void`<br/> | N
onConfirm | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onOverlayClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Dialog Events

name | params | description
-- | -- | --
cancel | `(context: { e: MouseEvent })` | \-
close | `(context: DialogCloseContext)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dialog/type.ts)。<br/>`type DialogEventSource = 'cancel' \| 'overlay'`<br/><br/>`interface DialogCloseContext { trigger: DialogEventSource; e: MouseEvent }`<br/>
closed | `()` | \-
confirm | `(context: { e: MouseEvent })` | \-
overlay-click | `(context: { e: MouseEvent })` | \-

### DialogOptions

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | \- | N
style | String / Object | - | Typescript：`string \| Styles`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
`Omit<DialogProps, 'attach'>` | \- | - | extends `Omit<DialogProps, 'attach'>` | N

### DialogInstance

name | params | return | description
-- | -- | -- | --
destroy | \- | \- | required
hide | \- | \- | required
show | \- | \- | required
update | `(props: DialogOptions)` | \- | required

### DialogPlugin

同时也支持 `this.$dialog`。

name | params | default | description
-- | -- | -- | --
options | \- | - | Typescript：`DialogOptions`

插件返回值：`DialogInstance`

### DialogPlugin.confirm

同时也支持 `this.$dialog.confirm`。

name | params | default | description
-- | -- | -- | --
options | \- | - | Typescript：`DialogOptions`

### DialogPlugin.alert

同时也支持 `this.$dialog.alert`。

name | params | default | description
-- | -- | -- | --
options | Object | - | Typescript：`Omit<DialogOptions, 'cancelBtn'>`

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-border-radius | @radius-extra-large | - 
--td-dialog-body-max-height | 456px | - 
--td-dialog-close-color | @font-gray-3 | - 
--td-dialog-close-font-size | 22px | - 
--td-dialog-content-color | @font-gray-2 | - 
--td-dialog-content-font-size | 16px | - 
--td-dialog-content-line-height | 24px | - 
--td-dialog-title-color | @font-gray-1 | - 
--td-dialog-title-font-size | 18px | - 
--td-dialog-title-line-height | 26px | - 
--td-dialog-width | 311px | -