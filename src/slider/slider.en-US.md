:: BASE_DOC ::

## API

### Slider Props

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean | undefined | \- | N
label | String / Boolean / Slot / Function | false | Typescript：`string \| boolean \| TNode<{ value: SliderValue; position?: 'start' \| 'end' }>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
marks | Object / Array | - | Typescript：`Array<number> \| SliderMarks` `interface SliderMarks { [mark: number]: string \| TNode<{ value: number }> }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
max | Number | 100 | \- | N
min | Number | 0 | \- | N
range | Boolean | false | \- | N
showExtremeValue | Boolean | false | \- | N
step | Number | 1 | \- | N
theme | String | default | options: default/capsule | N
value | Number / Array | 0 | `v-model` and `v-model:value` is supported。Typescript：`SliderValue` `type SliderValue = number \| Array<number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
defaultValue | Number / Array | 0 | uncontrolled property。Typescript：`SliderValue` `type SliderValue = number \| Array<number>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
onChange | Function |  | Typescript：`(value: SliderValue) => void`<br/> | N

### Slider Events

name | params | description
-- | -- | --
change | `(value: SliderValue)` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-slider-active-color | @brand-color | - 
--td-slider-bar-height | 4px | - 
--td-slider-capsule-bar-color | @bg-color-component | - 
--td-slider-capsule-bar-heihgt | 24px | - 
--td-slider-capsule-line-heihgt | 18px | - 
--td-slider-default-color | @bg-color-component-disabled | - 
--td-slider-default-color | @bg-color-secondarycomponent | - 
--td-slider-disabled-color | @brand-color-disabled | - 
--td-slider-disabled-text-color | @font-gray-4 | - 
--td-slider-dot-bg-color | @bg-color-container | - 
--td-slider-dot-color | @bg-color-secondarycontainer | - 
--td-slider-dot-size | 20px | -