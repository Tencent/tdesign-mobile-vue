:: BASE_DOC ::

## API

### Radio Props

name | type | default | description | required
-- | -- | -- | -- | --
allowUncheck | Boolean | false | \- | N
block | Boolean | true | \- | N
borderless | Boolean | undefined | \- | N
checked | Boolean | false | `v-model` and `v-model:checked` is supported | N
defaultChecked | Boolean | false | uncontrolled property | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
contentDisabled | Boolean | - | \- | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | \- | N
icon | String / Array | 'circle' | Typescript：`'circle' \| 'line' \| 'dot' \| 'none' \|Array<TNode>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxContentRow | Number | 5 | \- | N
maxLabelRow | Number | 3 | \- | N
name | String | - | \- | N
placement | String | left | options: left/right | N
value | String / Number / Boolean | undefined | Typescript：`string \| number \| boolean` | N
onChange | Function |  | Typescript：`(checked: boolean, context: { e: Event }) => void`<br/> | N

### Radio Events

name | params | description
-- | -- | --
change | `(checked: boolean, context: { e: Event })` | \-


### RadioGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
allowUncheck | Boolean | false | \- | N
borderless | Boolean | false | \- | N
disabled | Boolean | - | \- | N
icon | String / Array | 'circle' | Typescript：`'circle' \| 'line' \| 'dot' \| Array<TNode>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`KeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
name | String | - | \- | N
options | Array | - | Typescript：`Array<RadioOption>` `type RadioOption = string \| number \| RadioOptionObj` `interface RadioOptionObj { label?: string \| TNode; value?: string \| number \| boolean; disabled?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
placement | String | left | options: left/right | N
value | String / Number / Boolean | - | `v-model` and `v-model:value` is supported。Typescript：`T` `type RadioValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
defaultValue | String / Number / Boolean | - | uncontrolled property。Typescript：`T` `type RadioValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
onChange | Function |  | Typescript：`(value: T, context: { e: Event }) => void`<br/> | N

### RadioGroup Events

name | params | description
-- | -- | --
change | `(value: T, context: { e: Event })` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-radio-bg-color | @bg-color-container | - 
--td-radio-border-color | @component-stroke | - 
--td-radio-content-color | @font-gray-2 | - 
--td-radio-content-disabled-color | @text-color-disabled | - 
--td-radio-content-line-height | 22px | - 
--td-radio-font-size | 16px | - 
--td-radio-icon-checked-color | @brand-color | - 
--td-radio-icon-color | @component-border | - 
--td-radio-icon-disabled-bg-color | @bg-color-component-disabled | - 
--td-radio-icon-disabled-color | @brand-color-disabled | - 
--td-radio-icon-size | 24px | - 
--td-radio-label-color | @font-gray-1 | - 
--td-radio-label-disabled-color | @text-color-disabled | - 
--td-radio-label-line-height | 24px | - 
--td-radio-vertical-padding | 16px | -