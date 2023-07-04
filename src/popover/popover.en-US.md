:: BASE_DOC ::

## API
### Popover Props

name | type | default | description | required
-- | -- | -- | -- | --
closeOnClickOutside | Boolean | true | \- | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placement | String | top | options：top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom | N
showArrow | Boolean | true | \- | N
theme | String | dark | options：dark/light/brand/success/warning/error | N
triggerElement | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
visible | Boolean | - | `v-model` and `v-model:visible` is supported | N
onVisibleChange | Function |  | Typescript：`(visible: boolean) => void`<br/> | N

### Popover Events

name | params | description
-- | -- | --
visible-change | `(visible: boolean)` | \-
