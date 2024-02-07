:: BASE_DOC ::

## API
### Toast Props

name | type | default | description | required
-- | -- | -- | -- | --
direction | String | row | options：row/column | N
duration | Number | 2000 | \- | N
icon | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
message | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
overlayProps | Object | {} | Typescript：`OverlayProps `，[Overlay API Documents](./overlay?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/toast/type.ts) | N
placement | String | middle | options： top/middle/bottom | N
preventScrollThrough | Boolean | false | \- | N
showOverlay | Boolean | false | \- | N
theme | String | - | options：loading/success/error | N
onClose | Function |  | Typescript：`() => void`<br/> | N
onDestroy | Function |  | Typescript：`() => void`<br/> | N

### Toast Events

name | params | description
-- | -- | --
close | \- | \-
destroy | \- | \-
