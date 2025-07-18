:: BASE_DOC ::

## API

### Calendar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
confirmBtn | String / Object / Slot / Function | '' | 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。TS 类型：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
firstDayOfWeek | Number | 0 | 第一天从星期几开始，默认 0 = 周日 | N
format | Function | - | 用于格式化日期的函数。TS 类型：`CalendarFormatType ` `type CalendarFormatType = (day: TDate) => TDate` `type TDateType = 'selected' \| 'disabled' \| 'start' \| 'centre' \| 'end' \| ''` `interface TDate { date: Date; day: number; type: TDateType; className?: string; prefix?: string; suffix?: string;}`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
maxDate | Number / Date | - | 最大可选的日期，不传则默认半年后。TS 类型：` number \| Date` | N
minDate | Number / Date | - | 最小可选的日期，不传则默认今天。TS 类型：` number \| Date` | N
readonly | Boolean | - | `1.9.3`。是否只读，只读状态下不能选择日期 | N
switchMode | String | none | `1.8.1`。切换模式。 `none` 表示平铺展示所有月份； `month` 表示支持按月切换， `year-month` 表示既按年切换，也支持按月切换。可选项：none/month/year-month | N
title | String / Slot / Function | - | 标题，不传默认为“请选择日期”。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
type | String | 'single' | 日历的选择类型，single = 单选；multiple = 多选; range = 区间选择。可选项：single/multiple/range | N
usePopup | Boolean | true | 是否使用弹出层包裹日历 | N
value | Number / Array / Date | - | 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
defaultValue | Number / Array / Date | - | 当前选择的日期，不传则默认今天，当 type = multiple 或 range 时传入数组。非受控属性。TS 类型：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
visible | Boolean | false | 是否显示日历；`usePopup` 为 true 时有效 | N
onChange | Function |  | TS 类型：`(value: Date) => void`<br/>不显示 confirm-btn 时，完成选择时触发（暂不支持 type = multiple） | N
onClose | Function |  | TS 类型：`(trigger: CalendarTrigger) => void`<br/>关闭按钮时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts)。<br/>`type CalendarTrigger = 'close-btn' \| 'confirm-btn' \| 'overlay'`<br/> | N
onConfirm | Function |  | TS 类型：`(value: Date) => void`<br/>点击确认按钮时触发 | N
onPanelChange | Function |  | TS 类型：`(context: { year: number, month: number }) => void`<br/>`1.8.1`。切换月或年时触发（switch-mode 不为 none 时有效） | N
onScroll | Function |  | TS 类型：`(context: {e: Event}) => void`<br/>滚动时触发 | N
onSelect | Function |  | TS 类型：`(value: Date) => void`<br/>点击日期时触发 | N

### Calendar Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: Date)` | 不显示 confirm-btn 时，完成选择时触发（暂不支持 type = multiple）
close | `(trigger: CalendarTrigger)` | 关闭按钮时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts)。<br/>`type CalendarTrigger = 'close-btn' \| 'confirm-btn' \| 'overlay'`<br/>
confirm | `(value: Date)` | 点击确认按钮时触发
panel-change | `(context: { year: number, month: number })` | `1.8.1`。切换月或年时触发（switch-mode 不为 none 时有效）
scroll | `(context: {e: Event})` | 滚动时触发
select | `(value: Date)` | 点击日期时触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-calendar-active-color | @brand-color | - 
--td-calendar-bg-color | @bg-color-container | - 
--td-calendar-dates-color | @text-color-primary | - 
--td-calendar-days-color | @text-color-secondary | - 
--td-calendar-item-centre-color | @brand-color-light | - 
--td-calendar-item-disabled-color | @text-color-disabled | - 
--td-calendar-item-suffix-color | @text-color-placeholder | - 
--td-calendar-radius | 12px | - 
--td-calendar-selected-color | @text-color-anti | - 
--td-calendar-switch-mode-icon-color | @text-color-secondary | - 
--td-calendar-switch-mode-icon-disabled-color | @text-color-disabled | - 
--td-calendar-title-color | @text-color-primary | - 
--td-calendar-title-font-size | 18px | - 
