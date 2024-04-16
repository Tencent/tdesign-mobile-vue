:: BASE_DOC ::

## API

### Steps Props

name | type | default | description | required
-- | -- | -- | -- | --
current | String / Number | - | `v-model` and `v-model:current` is supported | N
defaultCurrent | String / Number | - | uncontrolled property | N
currentStatus | String | process | options: default/process/finish/error | N
layout | String | horizontal | options: horizontal/vertical | N
readonly | Boolean | false | \- | N
sequence | String | positive | options: positive/reverse | N
theme | String | default | options: default/dot | N
onChange | Function |  | Typescript：`(current: string \| number, previous: string \| number, context?: { e?: MouseEvent }) => void`<br/> | N

### Steps Events

name | params | description
-- | -- | --
change | `(current: string \| number, previous: string \| number, context?: { e?: MouseEvent })` | \-


### StepItem Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
icon | Boolean / Slot / Function | true | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
status | String | default | options: default/process/finish/error。Typescript：`StepStatus` `type StepStatus = 'default' \| 'process' \| 'finish' \| 'error'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/steps/type.ts) | N
title | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
titleRight | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-step-item-circle-font-size | 14px | - 
--td-step-item-circle-size | 22px | - 
--td-step-item-default-circle-bg | @bg-color-secondarycontainer | - 
--td-step-item-default-circle-color | @font-gray-3 | - 
--td-step-item-default-dot-border-color | @component-border | - 
--td-step-item-default-icon-color | @font-gray-3 | - 
--td-step-item-default-title-color | @font-gray-3 | - 
--td-step-item-description-color | @font-gray-3 | - 
--td-step-item-dot-size | 8px | - 
--td-step-item-error-circle-bg | @error-color-1 | - 
--td-step-item-error-circle-color | @error-color | - 
--td-step-item-error-dot-border-color | @error-color | - 
--td-step-item-error-icon-color | @error-color | - 
--td-step-item-error-title-color | @error-color | - 
--td-step-item-finish-circle-bg | @brand-color-light | - 
--td-step-item-finish-circle-color | @brand-color | - 
--td-step-item-finish-dot-border-color | @brand-color | - 
--td-step-item-finish-icon-color | @brand-color | - 
--td-step-item-finish-line-color | @brand-color | - 
--td-step-item-finish-title-color | @font-gray-1 | - 
--td-step-item-line-color | @component-border | - 
--td-step-item-process-circle-bg | @brand-color | - 
--td-step-item-process-circle-color | @font-white-1 | - 
--td-step-item-process-dot-border-color | @brand-color | - 
--td-step-item-process-icon-color | @brand-color | - 
--td-step-item-process-title-color | @brand-color | -