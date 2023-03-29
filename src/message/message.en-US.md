:: BASE_DOC ::

## API
### Message Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | left | options：left/center。Typescript：`MessageAlignType` `type MessageAlignType = 'left' \| 'center'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
closeBtn | String / Boolean / Slot / Function | undefined | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
duration | Number | 3000 | \- | N
icon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
link | String / Object / Slot / Function | - | Typescript：`string \| object \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
marquee | Boolean / Object | false | Typescript：`boolean \| DrawMarquee` `interface DrawMarquee { speed?: number; loop?: number; delay?: number }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
offset | Array | - | Typescript：`Array<string \| number>` | N
theme | String | info | options：info/success/warning/error。Typescript：`MessageThemeList` `type MessageThemeList = 'info' \| 'success' \| 'warning' \| 'error'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
visible | Boolean | false | `v-model` and `v-model:visible` is supported | N
defaultVisible | Boolean | false | uncontrolled property | N
zIndex | Number | - | \- | N
onChange | Function |  | Typescript：`(visible: boolean) => void`<br/>`deprecated` | N
onClose | Function |  | Typescript：`(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent }) => void`<br/>`deprecated`。close message event。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
onCloseBtnClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClosed | Function |  | Typescript：`() => void`<br/>`deprecated` | N
onDurationEnd | Function |  | Typescript：`() => void`<br/> | N
onLinkClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onOpen | Function |  | Typescript：`() => void`<br/>`deprecated` | N
onOpened | Function |  | Typescript：`() => void`<br/>`deprecated` | N

### Message Events

name | params | description
-- | -- | --
change | `(visible: boolean)` | `deprecated`
close | `(context: { trigger: 'close-click' \| 'duration-end', e?: MouseEvent })` | `deprecated`。close message event。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)
close-btn-click | `(context: { e: MouseEvent })` | \-
closed | \- | `deprecated`
duration-end | \- | \-
link-click | `(context: { e: MouseEvent })` | \-
open | \- | `deprecated`
opened | \- | `deprecated`
