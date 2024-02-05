:: BASE_DOC ::

## API
### Search Props

name | type | default | description | required
-- | -- | -- | -- | --
action | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
autocompleteOptions | Array | - | autocomplete words list。Typescript：`Array<AutocompleteOption>` `type AutocompleteOption = string \| { label: string \| TNode; group?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/search/type.ts) | N
center | Boolean | false | \- | N
clearable | Boolean | true | \- | N
disabled | Boolean | - | \- | N
focus | Boolean | false | \- | N
leftIcon | String / Slot / Function | 'search' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
placeholder | String | '' | \- | N
readonly | Boolean | false | \- | N
shape | String | 'square' | options：square/round | N
value | String | - | `v-model` and `v-model:value` is supported | N
defaultValue | String | - | uncontrolled property | N
onActionClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onBlur | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent }) => void`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onSearch | Function |  | Typescript：`(context?: { value: string; trigger: 'submit' \| 'option-click' \| 'clear'; e?: InputEvent \| MouseEvent }) => void`<br/> | N
onSubmit | Function |  | Typescript：`(context: { value: string; e: KeyboardEvent }) => void`<br/> | N

### Search Events

name | params | description
-- | -- | --
action-click | `(context: { e: MouseEvent })` | \-
blur | `(context: { value: string; e: FocusEvent })` | \-
change | `(value: string, context: { trigger: 'input-change' \| 'option-click'; e?: InputEvent \| MouseEvent })` | \-
clear | `(context: { e: MouseEvent })` | \-
focus | `(context: { value: string; e: FocusEvent })` | \-
search | `(context?: { value: string; trigger: 'submit' \| 'option-click' \| 'clear'; e?: InputEvent \| MouseEvent })` | \-
submit | `(context: { value: string; e: KeyboardEvent })` | \-
