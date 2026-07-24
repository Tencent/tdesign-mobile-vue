:: BASE_DOC ::

## API

### TabBar Props

name | type | default | description | required
-- | -- | -- | -- | --
bordered | Boolean | true | \- | N
effect | String | normal | Tab bar material effect。options: normal/glass | N
fixed | Boolean | true | \- | N
placeholder | Boolean | false | `1.12.0` | N
safeAreaInsetBottom | Boolean | true | \- | N
shape | String | normal | options: normal/round | N
split | Boolean | true | \- | N
theme | String | normal | Option style. normal uses a weak active state, tag uses an item tag, and capsule uses a shared capsule indicator. options: normal/tag/capsule | N
value | String / Number / Array | - | `v-model` and `v-model:value` is supported。Typescript: `string \| number \| Array<string \| number>` | N
defaultValue | String / Number / Array | - | uncontrolled property。Typescript: `string \| number \| Array<string \| number>` | N
zIndex | Number | 1 | `1.12.0` | N
onChange | Function |  | Typescript: `(value: string \| number) => void`<br/> | N

### TabBar Events

name | params | description
-- | -- | --
change | `(value: string \| number)` | \-


### TabBarItem Props

name | type | default | description | required
-- | -- | -- | -- | --
badgeProps | Object | - | Typescript: `BadgeProps`，[Badge API Documents](./badge?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
icon | Slot / Function | - | Typescript: `TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
subTabBar | Array | - | Typescript: `SubTabBarItem[] ` `interface SubTabBarItem { value: string; label: string }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
value | String / Number | - | \- | N

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description
-- | -- | --
--td-tab-bar-bg-color | @bg-color-container | -
--td-tab-bar-border-color | @border-color | -
--td-tab-bar-round-shadow | @shadow-3 | -
--td-tab-bar-glass-bg-color | rgba(255, 255, 255, 50%) | Glass material baseline fill
--td-tab-bar-glass-shadow | @shadow-3 | Glass material shadow
--td-tab-bar-glass-fallback-blur | 8px | Gaussian blur radius when SVG enhancement is unavailable
--td-tab-bar-glass-sheen-opacity | 1 | Material sheen opacity
--td-tab-bar-selected-bg-color | @brand-color | Selected capsule color for a round TabBar
--td-tab-bar-selected-bg-opacity | 16% | Selected capsule color mix for a round TabBar
--td-tab-bar-selected-sheen-opacity | 0.62 | Round selected capsule sheen opacity
--td-tab-bar-selected-border-color | @component-border | Normal round selected outline color
--td-tab-bar-active-bg | @brand-color-light | -
--td-tab-bar-active-color | @brand-color | -
--td-tab-bar-color | @text-color-primary | -
--td-tab-bar-height | 40px | -
--td-tab-bar-hover-bg-color | rgba(0, 0, 0, 0.05) | -
--td-tab-bar-spread-border-color | @border-color | -
--td-tab-bar-spread-shadow | @shadow-3 | -
