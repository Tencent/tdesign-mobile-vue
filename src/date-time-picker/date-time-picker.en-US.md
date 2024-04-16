:: BASE_DOC ::

## API

### DateTimePicker Props

name | type | default | description | required
-- | -- | -- | -- | --
cancelBtn | String | 取消 | \- | N
confirmBtn | String | - | \- | N
end | String / Number | - | \- | N
format | String | 'YYYY-MM-DD HH:mm:ss' | \- | N
mode | String / Array | 'date' | Typescript：`DateTimePickerMode` `type DateTimePickerMode = TimeModeValues \| Array<TimeModeValues> ` `type TimeModeValues = 'year' \| 'month' \| 'date' \| 'hour' \| 'minute' \| 'second'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
renderLabel | Function | - | Typescript：`(type: string, value: number) => string` | N
showWeek | Boolean | false | \- | N
start | String / Number | - | \- | N
title | String | '选择时间' | title of picker | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`DateValue` `type DateValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`DateValue` `type DateValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: DateValue) => void`<br/> | N
onConfirm | Function |  | Typescript：`(value: DateValue) => void`<br/> | N
onPick | Function |  | Typescript：`(value: DateValue) => void`<br/> | N

### DateTimePicker Events

name | params | description
-- | -- | --
cancel | `(context: { e: MouseEvent })` | \-
change | `(value: DateValue)` | \-
confirm | `(value: DateValue)` | \-
pick | `(value: DateValue)` | \-

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-data-time-picker-year-width | 64px | -