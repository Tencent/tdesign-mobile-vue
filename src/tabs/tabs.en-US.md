:: BASE_DOC ::

## API
### Tabs Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | Object | - | Typescript：`TabAnimation` `type TabAnimation = { duration: number } & Record<string, any>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
list | Array | - | Typescript：`Array<TdTabPanelProps>` | N
placement | String | top | options：left/top | N
showBottomLine | Boolean | true | \- | N
size | String | medium | options：medium/large | N
spaceEvenly | Boolean | true | \- | N
sticky | Boolean | false | \- | N
stickyProps | Object | - | Typescript：`StickyProps`，[Sticky API Documents](./sticky?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
swipeable | Boolean | true | \- | N
theme | String | line | options：line/tag/card | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`TabValue` `type TabValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`TabValue` `type TabValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
onChange | Function |  | Typescript：`(value: TabValue, label: string) => void`<br/> | N
onClick | Function |  | Typescript：`(value: TabValue, label: string) => void`<br/> | N
onScroll | Function |  | Typescript：`(scrollTop: number, isFixed: boolean) => void`<br/> | N

### Tabs Events

name | params | description
-- | -- | --
change | `(value: TabValue, label: string)` | \-
click | `(value: TabValue, label: string)` | \-
scroll | `(scrollTop: number, isFixed: boolean)` | \-

### TabPanel Props

name | type | default | description | required
-- | -- | -- | -- | --
badgeProps | Object | null | \- | N
destroyOnHide | Boolean | true | \- | N
disabled | Boolean | false | \- | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
panel | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Number | - | Typescript：`TabValue` | N
