:: BASE_DOC ::

## API
### DateTimePicker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancelBtn | String | 取消 | 取消按钮文字 | N
confirmBtn | String | - | 确定按钮文字 | N
disableDate | Object / Array / Function | - | 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：`DisableDate` `type DisableDate = DateValue | DisableDateObj | ((date: DateValue) => boolean)` `interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
format | String | 'YYYY-MM-DD' | 用于格式化日期，[详细文档](https://day.js.org/docs/en/display/format) | N
mode | String / Array | ['year', 'month', 'date'] | 选择器模式，用于表示可以选择到哪一个层级。【示例一】year 或者 ['year'] 表示纯日期选择器，只能选择到年份，只显示年份。【示例二】'hour' 或 ['hour'] 表示纯时间选择器，只能选择到小时维度。【示例三】['year', 'month', 'date', 'hour', 'minute'] 表示，日期和时间 混合选择器，可以选择到具体哪一分钟，显示全部时间：年/月/日/时/分。TS 类型：`DateTimePickerMode` `type DateTimePickerMode = TimeModeValues | Array<TimeModeValues> ` `type TimeModeValues = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
showWeek | Boolean | false | 是否在日期旁边显示周几（如周一，周二，周日等） | N
title | String | - | 标题 | N
value | String / Number | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateValue` `type DateValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
defaultValue | String / Number | - | 选中值。非受控属性。TS 类型：`DateValue` `type DateValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>取消按钮点击时触发 | N
onChange | Function |  | TS 类型：`(value: DateValue) => void`<br/>选中值发生变化时触发 | N
onColumnChange | Function |  | TS 类型：`(context: DatePickerColumnChangeContext) => void`<br/>每一列选中数据变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts)。<br/>`interface DatePickerColumnChangeContext { value: DateValue; index: number }`<br/> | N
onConfirm | Function |  | TS 类型：`(context: { value: DateValue; e: MouseEvent }) => void`<br/>确认按钮点击时触发 | N

### DateTimePicker Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 取消按钮点击时触发
change | `(value: DateValue)` | 选中值发生变化时触发
column-change | `(context: DatePickerColumnChangeContext)` | 每一列选中数据变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts)。<br/>`interface DatePickerColumnChangeContext { value: DateValue; index: number }`<br/>
confirm | `(context: { value: DateValue; e: MouseEvent })` | 确认按钮点击时触发
