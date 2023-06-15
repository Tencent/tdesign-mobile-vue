
:: BASE_DOC ::

## API
### Input Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | left | options：left/center/right | N
allowInputOverMax | Boolean | false | \- | N
autocomplete | String | undefined | \- | N
autofocus | Boolean | false | \- | N
clearable | Boolean | false | \- | N
disabled | Boolean | - | \- | N
errorMessage | String | - | `deprecated` | N
format | Function | - | Typescript：`InputFormatType` `type InputFormatType = (value: InputValue) => string`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | options：vertical/horizontal | N
borderless | Boolean | false | \- | N
maxcharacter | Number | - | \- | N
maxlength | Number | - | \- | N
name | String | - | \- | N
placeholder | String | undefined | \- | N
prefixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
readonly | Boolean | false | \- | N
size | String | small | options：small/medium。Typescript：`'medium' \| 'small'` | N
status | String | undefined | options：default/success/warning/error | N
suffix | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
suffixIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
type | String | text | options：text/number/url/tel/password/search/submit/hidden | N
value | String / Number | '' | `v-model` and `v-model:value` is supported。Typescript：`InputValue` `type InputValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
defaultValue | String / Number | '' | uncontrolled property。Typescript：`InputValue` `type InputValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/input/type.ts) | N
onBlur | Function |  | Typescript：`(value: InputValue, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: InputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; trigger: 'input' \| 'initial' \| 'clear' }) => void`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: InputValue, context: { e: FocusEvent }) => void`<br/> | N

### Input Events

name | params | description
-- | -- | --
blur | `(value: InputValue, context: { e: FocusEvent })` | \-
change | `(value: InputValue, context?: { e?: InputEvent \| MouseEvent \| CompositionEvent; trigger: 'input' \| 'initial' \| 'clear' })` | \-
clear | `(context: { e: MouseEvent })` | \-
focus | `(value: InputValue, context: { e: FocusEvent })` | \-
