:: BASE_DOC ::

## API
### Button Props

name | type | default | description | required
-- | -- | -- | -- | --
block | Boolean | false | make button to be a block-level element | N
content | String / Slot / Function | - | button's children elements。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | disable the button, make it can not be clicked | N
ghost | Boolean | false | make background-color to be transparent | N
icon | Slot / Function | - | use it to set left icon in button。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
loading | Boolean | false | set button to be loading state | N
loadingProps | Object | - | Typescript：`LoadingProps`，[Loading API Documents](./loading?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/button/type.ts) | N
shape | String | rectangle | button shape。options：rectangle/square/round/circle | N
size | String | medium | a button has three size。options：extra-small/small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffix | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
theme | String | default | button theme。options：default/primary/danger/light | N
type | String | button | type of button element in html。options：submit/reset/button | N
variant | String | base | button variant。options：base/outline/text | N
onClick | Function |  | Typescript：`(e: MouseEvent) => void`<br/>trigger on click | N

### Button Events

name | params | description
-- | -- | --
click | `(e: MouseEvent)` | trigger on click
