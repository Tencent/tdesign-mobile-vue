:: BASE_DOC ::

## API
### Drawer Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | - | Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
closeOnOverlayClick | Boolean | undefined | \- | N
destroyOnClose | Boolean | false | \- | N
footer | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
items | Array | - | Typescript：`DrawerItem[] ` `interface DrawerItem { title: string; icon: TNode; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/drawer/type.ts) | N
placement | String | right | options：left/right | N
showOverlay | Boolean | true | \- | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
visible | Boolean | false | \- | N
zIndex | Number | - | \- | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/drawer/type.ts)。<br/>`type TriggerSource = 'overlay'`<br/> | N
onItemClick | Function |  | Typescript：`( index: number, item: DrawerItem, context: { e: MouseEvent }) => void`<br/> | N
onOverlayClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Drawer Events

name | params | description
-- | -- | --
close | `(trigger: TriggerSource)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/drawer/type.ts)。<br/>`type TriggerSource = 'overlay'`<br/>
item-click | `( index: number, item: DrawerItem, context: { e: MouseEvent })` | \-
overlay-click | `(context: { e: MouseEvent })` | \-

### DrawerOptions

name | type | default | description | required
-- | -- | -- | -- | --
className | String | - | \- | N
style | String / Object | - | Typescript：`string \| Styles`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
`Omit<DrawerProps, 'attach'>` | \- | - | extends `Omit<DrawerProps, 'attach'>` | N

### DrawerInstance

name | params | return | description
-- | -- | -- | --
destroy | \- | \- | \-
hide | \- | \- | \-
show | \- | \- | \-
update | `(props: DrawerOptions)` | \- | \-

### DrawerPlugin

同时也支持 `this.$drawer`。

name | params | default | description
-- | -- | -- | --
options | \- | - | Typescript：`DrawerOptions`
