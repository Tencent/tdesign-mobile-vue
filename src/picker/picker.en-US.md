:: BASE_DOC ::

## API
### Picker Props

name | type | default | description | required
-- | -- | -- | -- | --
cancelBtn | String / Boolean | true | Typescript：`boolean \| string` | N
columns | Array / Function | [] | required。Typescript：`Array<PickerColumn> \| ((item: Array<PickerValue>)  => Array<PickerColumn>)` `type PickerColumn = PickerColumnItem[]` `interface PickerColumnItem { label: string,value: string}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | Y
confirmBtn | String / Boolean | true | Typescript：`boolean \| string` | N
header | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
renderLabel | Function | - | Typescript：`(item: PickerColumnItem) => string` | N
title | String | '' | \- | N
value | Array | - | `v-model` and `v-model:value` is supported。Typescript：`Array<PickerValue>` `type PickerValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
defaultValue | Array | - | uncontrolled property。Typescript：`Array<PickerValue>` `type PickerValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/picker/type.ts) | N
visible | Boolean | false | \- | N
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
