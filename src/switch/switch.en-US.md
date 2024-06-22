:: BASE_DOC ::

## API

### Switch Props

name | type | default | description | required
-- | -- | -- | -- | --
customValue | Array | - | Typescript：`Array<SwitchValue>` | N
disabled | Boolean | undefined | \- | N
icon | Array | [] | Typescript：`TNode[]`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | Array | [] | Typescript：`string[]` | N
loading | Boolean | false | \- | N
size | String | medium | options: small/medium/large | N
value | String / Number / Boolean | - | `v-model` and `v-model:value` is supported。Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | - | uncontrolled property。Typescript：`T` `type SwitchValue = string \| number \| boolean`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
onChange | Function |  | Typescript：`(value: T, context: { e: MouseEvent }) => void`<br/> | N

### Switch Events

name | params | description
-- | -- | --
change | `(value: T, context: { e: MouseEvent })` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-switch-checked-color | @brand-color | - 
--td-switch-checked-disabled-color | @brand-color-disabled | - 
--td-switch-dot-border-color | @bg-color-secondarycontainer | - 
--td-switch-dot-horizontal-margin | 3px | - 
--td-switch-dot-large-size | 26px | - 
--td-switch-dot-plain-horizontal-margin | 5px | - 
--td-switch-dot-plain-large-size | 22px | - 
--td-switch-dot-plain-size | 18px | - 
--td-switch-dot-plain-small-size | 14px | - 
--td-switch-dot-shadow | @shadow-1 | - 
--td-switch-dot-size | 22px | - 
--td-switch-dot-small-size | 18px | - 
--td-switch-height | 28px | - 
--td-switch-icon-large-size | 24px | - 
--td-switch-icon-size | 20px | - 
--td-switch-icon-small-size | 16px | - 
--td-switch-label-checked-color | @switch-checked-color | - 
--td-switch-label-color | @font-gray-4 | - 
--td-switch-large-height | 32px | - 
--td-switch-large-radius | calc(@switch-large-height / 2) | - 
--td-switch-large-width | 52px | - 
--td-switch-radius | calc(@switch-height / 2) | - 
--td-switch-small-height | 24px | - 
--td-switch-small-radius | calc(@switch-small-height / 2) | - 
--td-switch-small-width | 39px | - 
--td-switch-unchecked-color | @font-gray-4 | - 
--td-switch-unchecked-disabled-color | @bg-color-component-disabled | - 
--td-switch-width | 45px | - 
--td-switch-label-font-size | 12px | - 
--td-switch-label-font-size | 14px | - 
--td-switch-label-font-size | 16px | -