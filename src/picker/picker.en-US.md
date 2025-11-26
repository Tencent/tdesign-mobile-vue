:: BASE_DOC ::

## API

### Picker Props

name | type | default | description | required
-- | -- | -- | -- | --
cancelBtn | String / Boolean | true | Typescript：`boolean \| string` | N
columns | Array / Function | [] | required。Typescript：`PickerColumn \| Array<PickerColumn> \| ((item: Array<PickerValue>)  => Array<PickerColumn>)` `type PickerColumn = PickerColumnItem[]` `interface PickerColumnItem { label: string,value: string,disabled?: boolean}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | Y
confirmBtn | String / Boolean | true | Typescript：`boolean \| string` | N
footer | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
header | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`KeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
option | Slot / Function | - | Typescript：`(option: PickerColumnItem, index: number) => string \| Record<string, string \| boolean>` | N
renderLabel | Function | - | Typescript：`(item: PickerColumnItem, index: number) => string` | N
swipeDuration | String / Number | 300 | The duration of inertial scrolling during fast swiping, in milliseconds (ms). When set to 0, it disables inertial scrolling.。Typescript：`string \| number` | N
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
--td-picker-button-font | @font-body-large | -
--td-picker-cancel-color | @text-color-secondary | -
--td-picker-confirm-color | @brand-color | -
--td-picker-group-height | 200px | -
--td-picker-indicator-bg-color | @bg-color-secondarycontainer | -
--td-picker-indicator-border-radius | 6px | -
--td-picker-item-active-color | @text-color-primary | -
--td-picker-item-color | @text-color-secondary | -
--td-picker-item-disabled-color | @text-color-disabled | -
--td-picker-item-height | 40px | -
--td-picker-mask-color-bottom | hsla(0, 0%, 100%, .4) | -
--td-picker-mask-color-top | hsla(0, 0%, 100%, .92) | -
--td-picker-title-color | @text-color-primary | -
--td-picker-title-font | @font-title-large | -
--td-picker-toolbar-height | 58px | -
