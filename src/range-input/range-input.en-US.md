:: BASE_DOC ::

## API


### RangeInput Props

name | type | default | description | required
-- | -- | -- | -- | --
activeIndex | Number | - | \- | N
clearable | Boolean | false | \- | N
disabled | Boolean | - | \- | N
format | Array / Function | - | Typescript：`InputFormatType \| Array<InputFormatType>` | N
inputProps | Object / Array | - | Typescript：`InputProps \| Array<InputProps>`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placeholder | String / Array | - | Typescript：`string \| Array<string>` | N
prefixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
readonly | Boolean | false | \- | N
separator | String / Slot / Function | '-' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
status | String | default | options: default/success/warning/error | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | Array | [] | `v-model` and `v-model:value` is supported。Typescript：`RangeInputValue` `type RangeInputValue = Array<InputValue>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts) | N
defaultValue | Array | [] | uncontrolled property。Typescript：`RangeInputValue` `type RangeInputValue = Array<InputValue>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts) | N
onBlur | Function |  | Typescript：`(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; position?: RangeInputPosition; trigger?: 'input' \| 'initial' \| 'clear' })    => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts)。<br/>`type RangeInputPosition = 'first' \| 'second' \| 'all'`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClick | Function |  | Typescript：`(context?: { e?: MouseEvent; position?: RangeInputPosition }) => void`<br/> | N
onEnter | Function |  | Typescript：`(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent; position?: RangeInputPosition })  => void`<br/> | N
onFocus | Function |  | Typescript：`(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition }) => void`<br/> | N

### RangeInput Events

name | params | description
-- | -- | --
blur | `(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition })` | \-
change | `(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; position?: RangeInputPosition; trigger?: 'input' \| 'initial' \| 'clear' })   ` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/range-input/type.ts)。<br/>`type RangeInputPosition = 'first' \| 'second' \| 'all'`<br/>
clear | `(context: { e: MouseEvent })` | \-
click | `(context?: { e?: MouseEvent; position?: RangeInputPosition })` | \-
enter | `(value: RangeInputValue, context?: { e?: InputEvent \| MouseEvent; position?: RangeInputPosition }) ` | \-
focus | `(value: RangeInputValue, context?: { e?: FocusEvent; position?: RangeInputPosition })` | \-

### RangeInputInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
blur | `(options?: {position?: RangeInputPosition})` | \- | \-


### RangeInputPopup Props

name | type | default | description | required
-- | -- | -- | -- | --
status | String | default | options: default/success/warning/error | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
