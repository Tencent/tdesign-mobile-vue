:: BASE_DOC ::

## API


### RangeInput Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
activeIndex | Number | - | 输入框高亮状态序号 | N
clearable | Boolean | false | 是否可清空 | N
disabled | Boolean | - | 是否禁用范围输入框 | N
format | Array / Function | - | 指定输入框展示值的格式。TS 类型：`InputFormatType \| Array<InputFormatType>` | N
inputProps | Object / Array | - | 透传 Input 输入框组件全部属性，数组第一项表示第一个输入框属性，第二项表示第二个输入框属性。示例：`[{ label: 'A', name: 'A-name' }, { label: 'B',  name: 'B-name' }]`。TS 类型：`InputProps \| Array<InputProps>`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts) | N
label | String / Slot / Function | - | 左侧内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placeholder | String / Array | - | 占位符，示例：'请输入' 或者 ['开始日期', '结束日期']。TS 类型：`string \| Array<string>` | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
readonly | Boolean | false | 只读状态 | N
separator | String / Slot / Function | '-' | 范围分隔符。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffix | String / Slot / Function | - | 后置图标前的后置内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | Array | [] | 范围输入框的值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`RangeInputValue` `type RangeInputValue = Array<InputValue>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts) | N
defaultValue | Array | [] | 范围输入框的值。非受控属性。TS 类型：`RangeInputValue` `type RangeInputValue = Array<InputValue>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts) | N
onBlur | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition }) => void`<br/>范围输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; position?: RangeInputPosition; trigger?: 'input' \| 'initial' \| 'clear' })    => void`<br/>范围输入框值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts)。<br/>`type RangeInputPosition = 'first' \| 'second' \| 'all'`<br/> | N
onClear | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>清空按钮点击时触发 | N
onClick | Function |  | TS 类型：`(context?: { e?: MouseEvent; position?: RangeInputPosition }) => void`<br/>范围输入框点击时触发 | N
onEnter | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent; position?: RangeInputPosition })  => void`<br/>回车键按下时触发 | N
onFocus | Function |  | TS 类型：`(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition }) => void`<br/>范围输入框获得焦点时触发 | N

### RangeInput Events

名称 | 参数 | 描述
-- | -- | --
blur | `(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition })` | 范围输入框失去焦点时触发
change | `(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; position?: RangeInputPosition; trigger?: 'input' \| 'initial' \| 'clear' })   ` | 范围输入框值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts)。<br/>`type RangeInputPosition = 'first' \| 'second' \| 'all'`<br/>
clear | `(context: { e: MouseEvent })` | 清空按钮点击时触发
click | `(context?: { e?: MouseEvent; position?: RangeInputPosition })` | 范围输入框点击时触发
enter | `(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent; position?: RangeInputPosition }) ` | 回车键按下时触发
focus | `(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition })` | 范围输入框获得焦点时触发

### RangeInputInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
blur | `(options?: {position?: RangeInputPosition})` | \- | 使其中一个输入框失去焦点


### RangeInputPopup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
status | String | default | 输入框状态。可选项：default/success/warning/error | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
