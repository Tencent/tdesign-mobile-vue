:: BASE_DOC ::

## API
### Popup Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
closeBtn | Boolean / Slot / Function | - | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
closeOnOverlayClick | Boolean | true | \- | N
overlayProps | Object | {} | \- | N
placement | String | top | options：top/left/right/bottom/center | N
preventScrollThrough | Boolean | true | \- | N
showOverlay | Boolean | true | \- | N
transitionName | String | - | \- | N
visible | Boolean | - | `v-model` and `v-model:visible` is supported。Typescript：`boolean` | N
zIndex | Number | - | \- | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClosed | Function |  | Typescript：`() => void`<br/> | N
onOpen | Function |  | Typescript：`() => void`<br/> | N
onOpened | Function |  | Typescript：`() => void`<br/> | N
onVisibleChange | Function |  | Typescript：`(visible: boolean, trigger: PopupSource)  => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/popup/type.ts)。<br/>`type PopupSource = 'close-btn' \| 'overlay'`<br/> | N

### Popup Events

name | params | description
-- | -- | --
close | `(context: { e: MouseEvent })` | \-
closed | \- | \-
open | \- | \-
opened | \- | \-
visible-change | `(visible: boolean, trigger: PopupSource) ` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/popup/type.ts)。<br/>`type PopupSource = 'close-btn' \| 'overlay'`<br/>
