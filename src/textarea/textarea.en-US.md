:: BASE_DOC ::

## API

### Textarea Props

name | type | default | description | required
-- | -- | -- | -- | --
allowInputOverMax | Boolean | false | \- | N
autofocus | Boolean | false | \- | N
autosize | Boolean | false | \- | N
disabled | Boolean | false | \- | N
indicator | Boolean | false | \- | N
label | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxcharacter | Number | - | \- | N
maxlength | Number | - | \- | N
name | String | - | \- | N
placeholder | String | undefined | \- | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`TextareaValue` `type TextareaValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/textarea/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`TextareaValue` `type TextareaValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/textarea/type.ts) | N
onBlur | Function |  | Typescript：`(value: TextareaValue, context: { e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: TextareaValue, context?: { e?: InputEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(value: TextareaValue, context : { e: FocusEvent }) => void`<br/> | N

### Textarea Events

name | params | description
-- | -- | --
blur | `(value: TextareaValue, context: { e: FocusEvent })` | \-
change | `(value: TextareaValue, context?: { e?: InputEvent })` | \-
focus | `(value: TextareaValue, context : { e: FocusEvent })` | \-
