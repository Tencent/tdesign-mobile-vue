:: BASE_DOC ::

## API
### Checkbox Props

name | type | default | description | required
-- | -- | -- | -- | --
block | Boolean | true | \- | N
checkAll | Boolean | false | \- | N
checked | Boolean | false | `v-model` and `v-model:checked` is supported | N
defaultChecked | Boolean | false | uncontrolled property | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
contentDisabled | Boolean | - | \- | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | \- | N
icon | String / Boolean / Array | 'circle' | Typescript：`'circle' \| 'line' \| 'rectangle' \| boolean \| Array<TNode \| String>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
indeterminate | Boolean | false | \- | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxContentRow | Number | 5 | \- | N
maxLabelRow | Number | 3 | \- | N
name | String | - | \- | N
placement | String | left | options：left/right | N
readonly | Boolean | false | \- | N
value | String / Number / Boolean | - | value of checkbox。Typescript：`string \| number \| boolean` | N
onChange | Function |  | Typescript：`(checked: boolean, context: { e: Event }) => void`<br/> | N

### Checkbox Events

name | params | description
-- | -- | --
change | `(checked: boolean, context: { e: Event })` | \-

### CheckboxGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
disabled | Boolean | - | \- | N
max | Number | undefined | \- | N
name | String | - | \- | N
options | Array | - | Typescript：`Array<CheckboxOption>` `type CheckboxOption = string \| number \| CheckboxOptionObj` `interface CheckboxOptionObj extends TdCheckboxProps { text?: string; }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts) | N
value | Array | [] | `v-model` and `v-model:value` is supported。Typescript：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts) | N
defaultValue | Array | [] | uncontrolled property。Typescript：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts) | N
onChange | Function |  | Typescript：`(value: T, context: CheckboxGroupChangeContext) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts)。<br/>`interface CheckboxGroupChangeContext { e: Event; current: string \| number; option: CheckboxOption \| TdCheckboxProps; type: 'check' \| 'uncheck' }`<br/> | N

### CheckboxGroup Events

name | params | description
-- | -- | --
change | `(value: T, context: CheckboxGroupChangeContext)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts)。<br/>`interface CheckboxGroupChangeContext { e: Event; current: string \| number; option: CheckboxOption \| TdCheckboxProps; type: 'check' \| 'uncheck' }`<br/>


### CSS Variables
The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-checkbox-bg-color | @bg-color-container | - 
--td-checkbox-border-color | @component-stroke | - 
--td-checkbox-description-color | @font-gray-2 | - 
--td-checkbox-description-disabled-color | @font-gray-4 | - 
--td-checkbox-description-line-height | 22px | - 
--td-checkbox-font-size | 16px | - 
--td-checkbox-icon-checked-color | @brand-color | - 
--td-checkbox-icon-color | @gray-color-4 | - 
--td-checkbox-icon-disabled-bg-color | @bg-color-component-disabled | - 
--td-checkbox-icon-disabled-color | @brand-color-disabled | - 
--td-checkbox-icon-size | 24px | - 
--td-checkbox-tag-active-bg-color | @brand-color-light | - 
--td-checkbox-tag-active-color | @brand-color | - 
--td-checkbox-title-color | @font-gray-1 | - 
--td-checkbox-title-disabled-color | @font-gray-4 | - 
--td-checkbox-title-line-height | 24px | - 
--td-checkbox-vertical-padding | 16px | - 
