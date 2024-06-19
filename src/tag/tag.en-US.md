:: BASE_DOC ::

## API

### Tag Props

name | type | default | description | required
-- | -- | -- | -- | --
closable | Boolean | false | \- | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | \- | N
icon | Slot / Function | undefined | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxWidth | String / Number | - | \- | N
shape | String | square | options: square/round/mark | N
size | String | medium | options: small/medium/large/extra-large | N
theme | String | default | options: default/primary/warning/danger/success | N
variant | String | dark | options: dark/light/outline/light-outline | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Tag Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | \-
close | `(context: { e: MouseEvent })` | \-


### CheckTag Props

name | type | default | description | required
-- | -- | -- | -- | --
checked | Boolean | - | `v-model` and `v-model:checked` is supported | N
defaultChecked | Boolean | - | uncontrolled property | N
closable | Boolean | false | \- | N
content | String / Number / Array / Slot / Function | - | Typescript：`string \| number \| string[] \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
shape | String | square | options: square/round/mark | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
variant | String | dark | options: dark/light/outline/light-outline | N
onChange | Function |  | Typescript：`(checked: boolean) => void`<br/> | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### CheckTag Events

name | params | description
-- | -- | --
change | `(checked: boolean)` | \-
click | `(context: { e: MouseEvent })` | \-
close | `(context: { e: MouseEvent })` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-tag-danger-color | @error-color | - 
--td-tag-danger-light-color | @error-color-1 | - 
--td-tag-default-color | @bg-color-component | - 
--td-tag-default-font-color | @font-gray-1 | - 
--td-tag-default-light-color | @bg-color-secondarycontainer | - 
--td-tag-disabled-background-color | @bg-color-component-disabled | - 
--td-tag-disabled-border-color | @component-border | - 
--td-tag-disabled-color | @font-gray-4 | - 
--td-tag-extra-large-font-size | @font-size-base | - 
--td-tag-extra-large-height | 40px | - 
--td-tag-extra-large-icon-size | 16px | - 
--td-tag-extra-large-padding | 16px - 1px | - 
--td-tag-large-font-size | @font-size-base | - 
--td-tag-large-height | 28px | - 
--td-tag-large-icon-size | 16px | - 
--td-tag-large-padding | 8px - 1px | - 
--td-tag-medium-font-size | @font-size-s | - 
--td-tag-medium-height | 24px | - 
--td-tag-medium-icon-size | 14px | - 
--td-tag-medium-padding | 8px - 1px | - 
--td-tag-outline-bg-color | @bg-color-container | - 
--td-tag-primary-color | @brand-color | - 
--td-tag-primary-light-color | @brand-color-light | - 
--td-tag-small-font-size | @font-size | - 
--td-tag-small-height | 20px | - 
--td-tag-small-icon-size | 12px | - 
--td-tag-small-padding | 6px - 1px | - 
--td-tag-square-border-radius | 4px | - 
--td-tag-success-color | @success-color | - 
--td-tag-success-light-color | @success-color-1 | - 
--td-tag-warning-color | @warning-color | - 
--td-tag-warning-light-color | @warning-color-1 | - 
--td-tag-close-icon-color | @font-gray-3 | - 
--td-tag-mark-border-radius | @tag-round-border-radius | - 
--td-tag-round-border-radius | 999px | -