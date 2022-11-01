:: BASE_DOC ::

## API
### Message Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | left | options：left/center。Typescript：`MessageAlignType` `type MessageAlignType = 'left' | 'center'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
closeBtn | Boolean / Slot / Function | false | Typescript：` boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
duration | Number | 3000 | - | N
icon | Boolean / Slot / Function | true | Typescript：` boolean | TNode`。| N
marquee | Boolean / Object | false | Typescript：`boolean | DrawMarquee` `interface DrawMarquee { speed?: number; loop?: number; delay?: number }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
offset | Array | - | Typescript：`Array<string | number>` | N
theme | String | info | options：info/success/warning/error。Typescript：`MessageThemeList` `type MessageThemeList = 'info' | 'success' | 'warning' | 'error'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/message/type.ts) | N
visible | Boolean | false | `v-model` and `v-model:visible` is supported | N
defaultVisible | Boolean | false | uncontrolled property | N
zIndex | Number | - | - | N
onChange | Function |  | Typescript：`(visible: boolean) => void`<br/> | N
onClose | Function |  | Typescript：`() => void`<br/>close message event | N
onClosed | Function |  | Typescript：`() => void`<br/> | N
onOpen | Function |  | Typescript：`() => void`<br/> | N
onOpened | Function |  | Typescript：`() => void`<br/> | N

### Message Events

name | params | description
-- | -- | --
change | `(visible: boolean)` | -
close | - | close message event
closed | - | -
open | - | -
opened | - | -
