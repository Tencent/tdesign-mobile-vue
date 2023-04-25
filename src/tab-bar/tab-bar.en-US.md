:: BASE_DOC ::

## API
### TabBar Props

name | type | default | description | required
-- | -- | -- | -- | --
bordered | Boolean | true | \- | N
fixed | Boolean | true | \- | N
safeAreaInsetBottom | Boolean | true | \- | N
shape | String | 'normal' | options：normal/round | N
split | Boolean | true | \- | N
theme | String | 'normal' | options：normal/tag | N
value | String / Number / Array | undefined | `v-model` and `v-model:value` is supported。Typescript：`string \| number \| Array<string \| number>` | N
defaultValue | String / Number / Array | undefined | uncontrolled property。Typescript：`string \| number \| Array<string \| number>` | N
onChange | Function |  | Typescript：`(value: string \| number) => void`<br/> | N

### TabBar Events

name | params | description
-- | -- | --
change | `(value: string \| number)` | \-

### TabBarItem Props

name | type | default | description | required
-- | -- | -- | -- | --
badgeProps | Object | - | Typescript：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
subTabBar | Array | - | Typescript：`SubTabBarItem[] ` `interface SubTabBarItem { value: string; label: string }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
value | String / Number | - | \- | N
