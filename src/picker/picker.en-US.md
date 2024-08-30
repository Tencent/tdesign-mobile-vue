:: BASE_DOC ::

## API

### Picker Props

name | type | default | description | required
-- | -- | -- | -- | --
cancelBtn | String / Boolean | true | Typescript：`boolean \| string` | N
columns | Array / Function | [] | required。Typescript：`PickerColumn \| Array<PickerColumn> \| ((item: Array<PickerValue>)  => Array<PickerColumn>)` `type PickerColumn = PickerColumnItem[]` `interface PickerColumnItem { label: string,value: string}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | Y
confirmBtn | String / Boolean | true | Typescript：`boolean \| string` | N
header | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
renderLabel | Function | - | Typescript：`(item: PickerColumnItem) => string` | N
title | String | '' | \- | N
value | Array | - | `v-model` and `v-model:value` is supported。Typescript：`Array<PickerValue>` `type PickerValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
defaultValue | Array | - | uncontrolled property。Typescript：`Array<PickerValue>` `type PickerValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: Array<PickerValue>, context: { columns: Array<PickerContext>, e: MouseEvent })  => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts)。<br/>`interface PickerContext{ column: number,index: number }`<br/> | N
onConfirm | Function |  | Typescript：`(value: Array<PickerValue>, context: { index: number[], e: MouseEvent, label: string[] }) => void`<br/> | N
onPick | Function |  | Typescript：`(value: Array<PickerValue>,context: PickerContext) => void`<br/> | N

### Picker Events

name | params | description
-- | -- | --
cancel | `(context: { e: MouseEvent })` | \-
change | `(value: Array<PickerValue>, context: { columns: Array<PickerContext>, e: MouseEvent }) ` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts)。<br/>`interface PickerContext{ column: number,index: number }`<br/>
confirm | `(value: Array<PickerValue>, context: { index: number[], e: MouseEvent, label: string[] })` | \-
pick | `(value: Array<PickerValue>,context: PickerContext)` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-picker-bg-color | @bg-color-container | - 
--td-picker-border-radius | 12px | - 
--td-picker-button-font-size | 16px | - 
--td-picker-cancel-color | @font-gray-2 | - 
--td-picker-confirm-color | @brand-color | - 
--td-picker-group-height | 200px | - 
--td-picker-indicator-bg-color | @bg-color-secondarycontainer | - 
--td-picker-indicator-border-radius | 6px | - 
--td-picker-item-active-color | @font-gray-1 | - 
--td-picker-item-color | @font-gray-2 | - 
--td-picker-item-height | 40px | - 
--td-picker-item-height | 40px | - 
--td-picker-mask-color-bottom | hsla(0, 0%, 100%, .4) | - 
--td-picker-mask-color-top | hsla(0, 0%, 100%, .92) | - 
--td-picker-title-color | @font-gray-1 | - 
--td-picker-title-font-size | 18px | - 
--td-picker-title-font-weight | 600 | - 
--td-picker-title-line-height | 26px | - 
--td-picker-toolbar-height | 58px | -