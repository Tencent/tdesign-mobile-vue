:: BASE_DOC ::

## API

### TabBar Props

name | type | default | description | required
-- | -- | -- | -- | --
bordered | Boolean | true | \- | N
fixed | Boolean | true | \- | N
placeholder | Boolean | false | `1.12.0` | N
safeAreaInsetBottom | Boolean | true | \- | N
shape | String | normal | options: normal/round/round-glass | N
split | Boolean | true | \- | N
theme | String | normal | options: normal/tag | N
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
--td-tab-bar-glass-bg-color | rgba(255, 255, 255, 0.12) | Liquid glass background color
--td-tab-bar-glass-blur | 8px | Center frosted blur radius
--td-tab-bar-glass-edge-blur | 18px | Edge lens blur radius
--td-tab-bar-glass-saturate | 180% | Backdrop saturation
--td-tab-bar-glass-highlight-color | rgba(255, 255, 255, 0.72) | Edge specular highlight color
--td-tab-bar-glass-shadow | 0 8px 32px rgba(0, 0, 0, 0.18) | Drop shadow
--td-tab-bar-glass-sweep-duration | 6s | Specular sweep period
--td-tab-bar-glass-image | none | Refraction layer backdrop image, opt-in
--td-tab-bar-glass-refract | none | Refraction filter, e.g. blur(1.5px) url(#..), opt-in
--td-tab-bar-active-bg | @brand-color-light | -
--td-tab-bar-active-color | @brand-color | -
--td-tab-bar-color | @text-color-primary | -
--td-tab-bar-height | 40px | -
--td-tab-bar-hover-bg-color | rgba(0, 0, 0, 0.05) | -
--td-tab-bar-spread-border-color | @border-color | -
--td-tab-bar-spread-shadow | @shadow-3 | -
