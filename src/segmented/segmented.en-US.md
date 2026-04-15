:: BASE_DOC ::

## API

### Segmented Props

name | type | default | description | required
-- | -- | -- | -- | --
block | Boolean | false | \- | N
disabled | Boolean | - | \- | N
options | Object | [] | Typescript: `string[] \| number[] \| SegmentedItem[] ` `interface SegmentedItem { value: string \| number; label?: string \| TNode; icon?: TNode; disabled?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/segmented/type.ts) | N
value | String / Number | - | `v-model` and `v-model:value` is supported | N
defaultValue | String / Number | - | uncontrolled property | N
onChange | Function |  | Typescript: `(value: string \| number, selectedOption: SegmentedItem) => void`<br/> | N

### Segmented Events

name | params | description
-- | -- | --
change | `(value: string \| number, selectedOption: SegmentedItem)` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-segmented-bg-color | @bg-color-component-disabled | -
--td-segmented-item-active-bg | @bg-color-container | -
--td-segmented-item-active-color | @brand-color | -
--td-segmented-item-color | @text-color-primary | -
--td-segmented-item-disabled-color | @text-color-disabled | -
--td-segmented-item-label-font | @font-body-medium | -
--td-segmented-transition | all @anim-duration-base @anim-time-fn-easing | -
