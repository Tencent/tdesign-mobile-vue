:: BASE_DOC ::

## API

### DateTimePicker Props

name | type | default | description | required
-- | -- | -- | -- | --
autoClose | Boolean | false | \- | N
cancelBtn | String | 取消 | \- | N
confirmBtn | String | - | \- | N
end | String / Number | - | \- | N
filter | Function | - | Typescript：`(type: TimeModeValues, columns: DateTimePickerColumn) => DateTimePickerColumn` `type DateTimePickerColumn = DateTimePickerColumnItem[]` `interface DateTimePickerColumnItem { label: string,value: string}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
footer | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
format | String | 'YYYY-MM-DD HH:mm:ss' | \- | N
header | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
mode | String / Array | 'date' | Typescript：`DateTimePickerMode` `type DateTimePickerMode = TimeModeValues \| Array<TimeModeValues> ` `type TimeModeValues = 'year' \| 'month' \| 'date' \| 'hour' \| 'minute' \| 'second'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
renderLabel | Function | - | Typescript：`(type: string, value: number) => string` | N
showWeek | Boolean | false | \- | N
start | String / Number | - | \- | N
steps | Object | - | Typescript：`Record<TimeModeValues, number>` | N
title | String | '选择时间' | title of picker | N
usePopup | Boolean | false | \- | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`DateValue` `type DateValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`DateValue` `type DateValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
visible | Boolean | false | \- | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: DateValue) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'cancel-btn' \| 'confirm-btn'`<br/> | N
onConfirm | Function |  | Typescript：`(value: DateValue) => void`<br/> | N
onPick | Function |  | Typescript：`(value: DateValue) => void`<br/> | N

### DateTimePicker Events

name | params | description
-- | -- | --
cancel | `(context: { e: MouseEvent })` | \-
change | `(value: DateValue)` | \-
close | `(trigger: TriggerSource)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'cancel-btn' \| 'confirm-btn'`<br/>
confirm | `(value: DateValue)` | \-
pick | `(value: DateValue)` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-data-time-picker-year-width | 64px | -