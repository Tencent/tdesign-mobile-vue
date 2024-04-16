:: BASE_DOC ::

## API

### Calendar Props

name | type | default | description | required
-- | -- | -- | -- | --
confirmBtn | String / Object / Slot / Function | '' | Typescript：`string \| ButtonProps \| TNode \| null`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
defaultVisible | Boolean | false | \- | N
firstDayOfWeek | Number | 0 | \- | N
format | Function | - | Typescript：`CalendarFormatType ` `type CalendarFormatType = (day: TDate) => TDate` `type TDateType = 'selected' \| 'disabled' \| 'start' \| 'centre' \| 'end' \| ''` `interface TDate { date: Date; day: number; type: TDateType; className?: string; prefix?: string; suffix?: string;}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
maxDate | Number / Date | - | Typescript：` number \| Date` | N
minDate | Number / Date | - | Typescript：` number \| Date` | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
type | String | 'single' | options: single/multiple/range | N
usePopup | Boolean | true | \- | N
value | Number / Array / Date | - | `v-model` and `v-model:value` is supported。Typescript：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
defaultValue | Number / Array / Date | - | uncontrolled property。Typescript：`number \| Date \| TCalendarValue[]` `type TCalendarValue = number \| Date`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts) | N
visible | Boolean | false | \- | N
onChange | Function |  | Typescript：`(value: Date) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: CalendarTrigger) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts)。<br/>`type CalendarTrigger = 'close-btn' \| 'confirm-btn' \| 'overlay'`<br/> | N
onConfirm | Function |  | Typescript：`(value: Date) => void`<br/> | N
onSelect | Function |  | Typescript：`(value: Date) => void`<br/> | N

### Calendar Events

name | params | description
-- | -- | --
change | `(value: Date)` | \-
close | `(trigger: CalendarTrigger)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/calendar/type.ts)。<br/>`type CalendarTrigger = 'close-btn' \| 'confirm-btn' \| 'overlay'`<br/>
confirm | `(value: Date)` | \-
select | `(value: Date)` | \-

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-calendar-active-color | @brand-color | - 
--td-calendar-bg-color | @bg-color-container | - 
--td-calendar-days-color | @font-gray-2 | - 
--td-calendar-item-centre-color | @brand-color-light | - 
--td-calendar-item-disabled-color | @font-gray-4 | - 
--td-calendar-item-suffix-color | @font-gray-3 | - 
--td-calendar-radius | 12px | - 
--td-calendar-selected-color | @font-white-1 | - 
--td-calendar-title-color | @font-gray-1 | - 
--td-calendar-title-font-size | 18px | -