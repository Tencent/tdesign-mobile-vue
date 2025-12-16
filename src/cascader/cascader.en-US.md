:: BASE_DOC ::

## API

### Cascader Props

name | type | default | description | required
-- | -- | -- | -- | --
checkStrictly | Boolean | false | \- | N
closeBtn | Boolean / Slot / Function | true | Typescript: `boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
header | Slot / Function | - | Typescript: `TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | Typescript: `CascaderKeysType` `type CascaderKeysType = TreeKeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts) | N
load | Function | - | `1.11.2`。loading subtree data (only effective when the node's children value is true)。Typescript: `(node: CascaderOption) => Promise<Array<CascaderOption>>` | N
middleContent | Slot / Function | - | Typescript: `TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
options | Array | [] | Typescript: `Array<CascaderOption>` | N
overlayProps | Object | {} | Typescript: `OverlayProps`，[Overlay API Documents](./overlay?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts) | N
placeholder | String / Slot / Function | '选择选项' | Typescript: `string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
subTitles | Array | [] | Typescript: `Array<string>` | N
theme | String | step | options: step/tab | N
title | String / Slot / Function | - | Typescript: `string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Number | - | `v-model` and `v-model:value` is supported | N
defaultValue | String / Number | - | uncontrolled property | N
visible | Boolean | false | \- | N
onChange | Function |  | Typescript: `(value: string \| number, selectedOptions: CascaderOption[]) => void`<br/> | N
onClose | Function |  | Typescript: `(trigger: CascaderTriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type CascaderTriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/> | N
onPick | Function |  | Typescript: `(context: { value: string \| number, label: string, index: number, level: number }) => void`<br/> | N

### Cascader Events

name | params | description
-- | -- | --
change | `(value: string \| number, selectedOptions: CascaderOption[])` | \-
close | `(trigger: CascaderTriggerSource)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type CascaderTriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/>
pick | `(context: { value: string \| number, label: string, index: number, level: number })` | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-cascader-active-color | @brand-color | -
--td-cascader-bg-color | @bg-color-container | -
--td-cascader-border-color | @component-stroke | -
--td-cascader-disabled-color | @text-color-disabled | -
--td-cascader-options-height | 320px | -
--td-cascader-options-title-color | @text-color-placeholder | -
--td-cascader-step-arrow-color | @text-color-placeholder | -
--td-cascader-step-dot-size | 8px | -
--td-cascader-step-height | 44px | -
--td-cascader-title-color | @text-color-primary | -
--td-cascader-title-font | @font-title-large | -
--td-cascader-title-padding | @spacer-2 | -
