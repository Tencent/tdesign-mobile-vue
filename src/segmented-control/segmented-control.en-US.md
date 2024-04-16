:: BASE_DOC ::

## API


### SegmentedControl Props

name | type | default | description | required
-- | -- | -- | -- | --
items | Array | - | Typescript：`Array<string \| number>` | N
value | String / Number / Array | - | `v-model` and `v-model:value` is supported。Typescript：`SegmentedControlValue` `type SegmentedControlValue = string \| number \| Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/segmented-control/type.ts) | N
defaultValue | String / Number / Array | - | uncontrolled property。Typescript：`SegmentedControlValue` `type SegmentedControlValue = string \| number \| Array<string \| number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/segmented-control/type.ts) | N
onChange | Function |  | Typescript：`(value: SegmentedControlValue) => void`<br/> | N

### SegmentedControl Events

name | params | description
-- | -- | --
change | `(value: SegmentedControlValue)` | \-
