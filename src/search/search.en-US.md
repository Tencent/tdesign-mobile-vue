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
maxcharacter | Number | - | The maximum number of characters that the user can enter. One Chinese character represents two characters in length. Use either `maxcharacter` or `maxlength` | N
maxlength | String / Number | - | The maximum length of text that the user can enter. One Chinese character is equal to one count length. By default, it is empty, and the input length is not limited. Use either `maxcharacter` or `maxlength` | N
placeholder | String | '' | \- | N
readonly | Boolean | undefined | \- | N
resultList | Array | [] | Typescript：`Array<string>` | N
shape | String | 'square' | options: square/round | N
value | String | - | `v-model` and `v-model:value` is supported | N
defaultValue | String | - | uncontrolled property | N
onActionClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onBlur | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: string, context: { e?: InputEvent \| MouseEvent }) => void`<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: string; e: FocusEvent }) => void`<br/> | N
onSearch | Function |  | Typescript：`(context?: { value: string; trigger: 'submit' \| 'option-click' \| 'clear'; e?: InputEvent \| MouseEvent }) => void`<br/> | N
onSubmit | Function |  | Typescript：`(context: { value: string; e: KeyboardEvent }) => void`<br/> | N

### Search Events

name | params | description
-- | -- | --
action-click | `(context: { e: MouseEvent })` | \-
blur | `(context: { value: string; e: FocusEvent })` | \-
change | `(value: string, context: { e?: InputEvent \| MouseEvent })` | \-
clear | `(context: { e: MouseEvent })` | \-
focus | `(context: { value: string; e: FocusEvent })` | \-
search | `(context?: { value: string; trigger: 'submit' \| 'option-click' \| 'clear'; e?: InputEvent \| MouseEvent })` | \-
submit | `(context: { value: string; e: KeyboardEvent })` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--search-label-color | @font-gray-1 | - 
--td-search-action-color | @brand-color | - 
--td-search-bg-color | @bg-color-secondarycontainer | - 
--td-search-clear-icon-color | @font-gray-3 | - 
--td-search-font-size | @font-size-m | - 
--td-search-height | 40px | - 
--td-search-icon-color | @font-gray-3 | - 
--td-search-padding | 8px 12px | - 
--td-search-placeholder-color | @font-gray-3 | - 
--td-search-square-radius | @radius-default | - 
--td-search-text-color | @font-gray-1 | -