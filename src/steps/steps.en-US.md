:: BASE_DOC ::

## API
### Steps Props

name | type | default | description | required
-- | -- | -- | -- | --
current | String / Number | - | `v-model` and `v-model:current` is supported | N
defaultCurrent | String / Number | - | uncontrolled property | N
currentStatus | String | process | options：default/process/finish/error | N
layout | String | horizontal | options：horizontal/vertical | N
options | Array | - | Typescript：`Array<TdStepItemProps>` | N
readonly | Boolean | false | \- | N
separator | String | line | options：line/dashed/arrow | N
theme | String | default | options：default/dot | N
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
status | String | default | options：default/process/finish/error。Typescript：`StepStatus` `type StepStatus = 'default' \| 'process' \| 'finish' \| 'error'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/steps/type.ts) | N
subStepItems | Array | [] | Typescript：`SubStepItem[]` `interface SubStepItem { status: StepStatus, title: string }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/steps/type.ts) | N
title | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
