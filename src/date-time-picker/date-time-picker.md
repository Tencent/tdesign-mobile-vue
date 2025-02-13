:: BASE_DOC ::

## API

### DateTimePicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
autoClose | Boolean | false | 自动关闭；在确认、取消、点击遮罩层自动关闭，不需要手动设置 visible | N
cancelBtn | String | 取消 | 取消按钮文字 | N
confirmBtn | String | - | 确定按钮文字 | N
end | String / Number | - | 选择器的最大可选时间，默认为当前时间+10年 | N
filter | Function | - | 列选项过滤函数，支持自定义列内容。(type 值可为: year, month, date, hour, minute, second)。TS 类型：`(type: TimeModeValues, columns: DateTimePickerColumn) => DateTimePickerColumn` `type DateTimePickerColumn = DateTimePickerColumnItem[]` `interface DateTimePickerColumnItem { label: string,value: string}`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
footer | Slot / Function | - | 底部内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
format | String | 'YYYY-MM-DD HH:mm:ss' | 用于pick、change、confirm事件参数格式化[详细文档](https://day.js.org/docs/en/display/format) | N
header | Slot / Function | - | 顶部内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
mode | String / Array | 'date' | year = 年；month = 年月；date = 年月日；hour = 年月日时； minute = 年月日时分；当类型为数组时，第一个值控制年月日，第二个值控制时分秒。TS 类型：`DateTimePickerMode` `type DateTimePickerMode = TimeModeValues \| Array<TimeModeValues> ` `type TimeModeValues = 'year' \| 'month' \| 'date' \| 'hour' \| 'minute' \| 'second'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
renderLabel | Function | - | 自定义label。TS 类型：`(type: string, value: number) => string` | N
showWeek | Boolean | false | 【开发中】是否在日期旁边显示周几（如周一，周二，周日等） | N
start | String / Number | - | 选择器的最小可选时间，默认为当前时间-10年 | N
steps | Object | - | 时间间隔步数，示例：`{ minute: 5 }`。TS 类型：`Record<TimeModeValues, number>` | N
title | String | '选择时间' | 标题 | N
usePopup | Boolean | false | 是否使用弹出层包裹 | N
value | String / Number | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateValue` `type DateValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
defaultValue | String / Number | - | 选中值。非受控属性。TS 类型：`DateValue` `type DateValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts) | N
visible | Boolean | false | 是否显示 | N
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>取消按钮点击时触发 | N
onChange | Function |  | TS 类型：`(value: DateValue) => void`<br/>value改变时触发 | N
onClose | Function |  | TS 类型：`(trigger: TriggerSource) => void`<br/>关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts)。<br/>`import { TriggerSource } from '@Picker'`<br/> | N
onConfirm | Function |  | TS 类型：`(value: DateValue) => void`<br/>确认按钮点击时触发 | N
onPick | Function |  | TS 类型：`(value: DateValue) => void`<br/>选中值发生变化时触发 | N

### DateTimePicker Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 取消按钮点击时触发
change | `(value: DateValue)` | value改变时触发
close | `(trigger: TriggerSource)` | 关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/date-time-picker/type.ts)。<br/>`import { TriggerSource } from '@Picker'`<br/>
confirm | `(value: DateValue)` | 确认按钮点击时触发
pick | `(value: DateValue)` | 选中值发生变化时触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-data-time-picker-year-width | 64px | -