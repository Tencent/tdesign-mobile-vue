:: BASE_DOC ::

## API


### TreeSelect Props

name | type | default | description | required
-- | -- | -- | -- | --
clearable | Boolean | false | \- | N
customStyle | String | - | \- | N
filterable | Boolean | false | \- | N
height | String / Number | 336 | \- | N
keys | Object | - | alias filed name in data。Typescript：`TreeKeysType`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
multiple | Boolean | false | \- | N
multiple | Boolean | false | \- | N
options | Array | [] | Typescript：`Array<DataOption>` | N
placeholder | String | undefined | \- | N
selectInputProps | Object | - | Typescript：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
size | String | medium | options: small/medium/large | N
tagProps | Object | - | Typescript：`TagProps`，[Tag API Documents](./tag?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
value | String / Number / Object / Array | - | `v-model` and `v-model:value` is supported。Typescript：`TreeValueType` `type TreeSelectValue = string \| number \| TreeOptionData \| Array<string \| number \| TreeOptionData>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
defaultValue | String / Number / Object / Array | - | uncontrolled property。Typescript：`TreeValueType` `type TreeSelectValue = string \| number \| TreeOptionData \| Array<string \| number \| TreeOptionData>`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
onChange | Function |  | Typescript：`(value: TreeValueType, context: TreeSelectChangeContext<DataOption>) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`interface TreeSelectChangeContext<DataOption> { node: TreeNodeModel<DataOption>; data: DataOption; index?: number; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent \| Event }`<br/><br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/> | N

### TreeSelect Events

name | params | description
-- | -- | --
change | `(value: TreeValueType, context: TreeSelectChangeContext<DataOption>)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`interface TreeSelectChangeContext<DataOption> { node: TreeNodeModel<DataOption>; data: DataOption; index?: number; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent \| Event }`<br/><br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/>
