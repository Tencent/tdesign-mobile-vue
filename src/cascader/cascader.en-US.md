:: BASE_DOC ::

## API

### Cascader Props

name | type | default | description | required
-- | -- | -- | -- | --
closeBtn | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | Typescript：`KeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
options | Array | [] | Typescript：`Array<CascaderOption>` | N
subTitles | Array | [] | Typescript：`Array<string>` | N
theme | String | step | options：step/tab | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Number | - | `v-model` and `v-model:value` is supported | N
defaultValue | String / Number | - | uncontrolled property | N
visible | Boolean | false | \- | N
onChange | Function |  | Typescript：`(value: string \| number, selectedOptions: string[]) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/> | N
onPick | Function |  | Typescript：`(context: { level: number; value: string | number; index: number }) => void`<br/> | N

### Cascader Events

name | params | description
-- | -- | --
change | `(value: string \| number, selectedOptions: string[])` | \-
close | `(trigger: TriggerSource)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/>
pick | `(context: { level: number, value: string \| number, index: number })` | \-


### CSS Variables
The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-cascader-active-color | @brand-color | - 
--td-cascader-border-color | @border-color | - 
--td-cascader-disabled-color | @font-gray-4 | - 
--td-cascader-options-height | 320px | - 
--td-cascader-options-title-color | @font-gray-3 | - 
--td-cascader-step-arrow-color | @font-gray-3 | - 
--td-cascader-step-dot-size | 8px | - 
--td-cascader-step-height | 44px | - 
--td-cascader-title-color | @font-gray-1 | - 
--td-cascder-title-font-size | 18px | - 
