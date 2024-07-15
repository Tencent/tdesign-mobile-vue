:: BASE_DOC ::

## API

### Textarea Props

name | type | default | description | required
-- | -- | -- | -- | --
allowInputOverMax | Boolean | false | \- | N
autofocus | Boolean | false | \- | N
autosize | Boolean | false | \- | N
bordered | Boolean | false | \- | N
disabled | Boolean | undefined | \- | N
indicator | Boolean | false | \- | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | options: vertical/horizontal | N
maxcharacter | Number | - | \- | N
maxlength | Number | - | \- | N
name | String | - | \- | N
placeholder | String | undefined | \- | N
readonly | Boolean | false | \- | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`TextareaValue` `type TextareaValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/textarea/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`TextareaValue` `type TextareaValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/textarea/type.ts) | N
onBlur | Function |  | Typescript：`(value: TextareaValue, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: TextareaValue, context?: { e?: InputEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: TextareaValue, context : { e: FocusEvent }) => void`<br/> | N

### Textarea Events

name | params | description
-- | -- | --
blur | `(value: TextareaValue, context: { e: FocusEvent })` | \-
change | `(value: TextareaValue, context?: { e?: InputEvent })` | \-
focus | `(value: TextareaValue, context : { e: FocusEvent })` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-textarea-background-color | @bg-color-container | - 
--td-textarea-border-color | rgba(220, 220, 220, 1) | - 
--td-textarea-border-radius | @radius-default | - 
--td-textarea-disabled-text-color | @font-gray-4 | - 
--td-textarea-indicator-text-color | @font-gray-3 | - 
--td-textarea-label-color | @font-gray-1 | - 
--td-textarea-label-width | 64px | - 
--td-textarea-padding | @textarea-vertical-padding @textarea-horizontal-padding | - 
--td-textarea-placeholder-color | @font-gray-3 | - 
--td-textarea-text-color | @font-gray-1 | -