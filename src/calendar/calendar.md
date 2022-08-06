:: BASE_DOC ::

## API

### Calendar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
modelValue | Boolean | false | 控制日历显示与隐藏 | Y
bgColor | String |  #0053DB | 按钮和单元格背景颜色 | N
confirmBtn | String |  确认 | 确认按钮文案 | N
head |  Slot / Function |  - | 头部插槽（左上角处，默认不显示任何内容），TS 类型：`string | TNode` [通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
cell |  Slot / Function |  今天日期 | 自定义单元格 类型：`string | TNode` [通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Date |  new Date | 当前高亮的日期，默认今天 | N

### Calendar Events

名称 | 参数 | 描述
-- | -- | --
cell-click | cell: `type CalendarCell = {year: number;month: number;day: number;}`| 点击单元格触发 |
confirm | dateValue: `type CalendarValue = {year: number;month: number;day: number;week: number;date: string;isToday: boolean;}` | 点击确认按钮触发 |

