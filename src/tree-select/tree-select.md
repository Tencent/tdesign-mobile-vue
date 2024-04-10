:: BASE_DOC ::

## API


### TreeSelect Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
clearable | Boolean | false | 是否允许清空 | N
customStyle | String | - | 自定义组件样式 | N
filterable | Boolean | false | 是否可搜索 | N
height | String / Number | 336 | 高度，默认单位为 px | N
keys | Object | - | 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label: 'name', children: 'list' }`。TS 类型：`TreeKeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
multiple | Boolean | false | 是否允许多选 | N
multiple | Boolean | false | 是否多选 | N
options | Array | [] | 选项。TS 类型：`Array<DataOption>` | N
placeholder | String | undefined | 占位符 | N
selectInputProps | Object | - | 【开发中】透传 SelectInput 筛选器输入框组件的全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
size | String | medium | 尺寸。可选项：small/medium/large | N
tagProps | Object | - | 透传 Tag 标签组件全部属性。TS 类型：`TagProps`，[Tag API Documents](./tag?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
value | String / Number / Object / Array | - | 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TreeValueType` `type TreeSelectValue = string \| number \| TreeOptionData \| Array<string \| number \| TreeOptionData>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
defaultValue | String / Number / Object / Array | - | 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`。非受控属性。TS 类型：`TreeValueType` `type TreeSelectValue = string \| number \| TreeOptionData \| Array<string \| number \| TreeOptionData>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
onChange | Function |  | TS 类型：`(value: TreeValueType, context: TreeSelectChangeContext<DataOption>) => void`<br/>节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue` 。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`interface TreeSelectChangeContext<DataOption> { node: TreeNodeModel<DataOption>; data: DataOption; index?: number; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent \| Event }`<br/><br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/> | N

### TreeSelect Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: TreeValueType, context: TreeSelectChangeContext<DataOption>)` | 节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue` 。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`interface TreeSelectChangeContext<DataOption> { node: TreeNodeModel<DataOption>; data: DataOption; index?: number; trigger: TreeSelectValueChangeTrigger; e?: MouseEvent \| KeyboardEvent \| Event }`<br/><br/>`type TreeSelectValueChangeTrigger = 'clear' \| 'tag-remove' \| 'backspace' \| 'check' \| 'uncheck'`<br/>
