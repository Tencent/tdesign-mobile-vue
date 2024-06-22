:: BASE_DOC ::

## API

### Rate Props

name | type | default | description | required
-- | -- | -- | -- | --
allowHalf | Boolean | false | \- | N
color | String / Array | '#ED7B2F' | Typescript：`string \| Array<string>` | N
count | Number | 5 | \- | N
disabled | Boolean | undefined | \- | N
gap | Number | 8 | \- | N
icon | Array / Slot / Function | - | Typescript：`Array<TNode \| Function>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
showText | Boolean | false | \- | N
size | String | 24px | \- | N
texts | Array | [] | Typescript：`Array<string>` | N
value | Number | 0 | `v-model` and `v-model:value` is supported | N
defaultValue | Number | 0 | uncontrolled property | N
onChange | Function |  | Typescript：`(value: number) => void`<br/> | N

### Rate Events

name | params | description
-- | -- | --
change | `(value: number)` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-rate-disabled-selected-color | @warning-color-3 | - 
--td-rate-disabled-unselected-color | @gray-color-2 | - 
--td-rate-icon-scale | 1.33 | - 
--td-rate-selected-color | @warning-color | - 
--td-rate-text-active-color | @font-gray-1 | - 
--td-rate-text-active-font-weight | 600 | - 
--td-rate-text-color | @font-gray-4 | - 
--td-rate-text-font-size | @font-size-m | - 
--td-rate-unselected-color | @bg-color-secondarycomponent | -