:: BASE_DOC ::

## API

### Popup Props

name | type | default | description | required
-- | -- | -- | -- | --
closeOnOverlayClick | Boolean | true | \- | N
customStyle | String | '' | \- | N
lockScroll | Boolean | true | \- | N
overlayProps | Object | {} | \- | N
placement | String | top | options：top/left/right/bottom/center | N
showOverlay | Boolean | true | \- | N
to | String | - | \- | N
transitionName | String | - | \- | N
visible | Boolean | false | `v-model` and `v-model:visible` is supported。Typescript：`boolean` | N
defaultVisible | Boolean | false | uncontrolled property。Typescript：`boolean` | N
zIndex | Number | - | \- | N
onClose | Function |  | Typescript：`() => void`<br/> | N
onClosed | Function |  | Typescript：`() => void`<br/> | N
onOpen | Function |  | Typescript：`() => void`<br/> | N
onOpened | Function |  | Typescript：`() => void`<br/> | N
onVisibleChange | Function |  | Typescript：`(visible: boolean, trigger: PopupSource)  => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/popup/type.ts)。<br/>`type PopupSource = 'close-btn' | 'overlay'`<br/> | N

### Popup Events

name | params | description
-- | -- | --
close | \- | \-
closed | \- | \-
open | \- | \-
opened | \- | \-
visible-change | `(visible: boolean, trigger: PopupSource) ` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/popup/type.ts)。<br/>`type PopupSource = 'close-btn' | 'overlay'`<br/>
