:: BASE_DOC ::

## API

### TreeSelect Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
customStyle | String | - | 自定义组件样式 | N
filterable | Boolean | false | 是否可搜索 | N
height | String / Number | 336 | 高度，默认单位为 px | N
keys | Object | - | 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label: 'name', children: 'list' }`。TS 类型：`TreeKeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
multiple | Boolean | false | 是否允许多选 | N
options | Array | [] | 选项。TS 类型：`Array<DataOption>` | N
value | String / Number / Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TreeSelectValue` `type TreeSelectValue = string \| number \| Array<TreeSelectValue>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
defaultValue | String / Number / Array | - | 选中值。非受控属性。TS 类型：`TreeSelectValue` `type TreeSelectValue = string \| number \| Array<TreeSelectValue>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts) | N
onChange | Function |  | TS 类型：`(value: TreeSelectValue, level: TreeLevel)  => void`<br/>点击任何节点均会触发；level 代表当前点击的层级，0 代表最左侧，依次递进。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`type TreeLevel = 0 \| 1 \| 2`<br/> | N

### TreeSelect Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: TreeSelectValue, level: TreeLevel) ` | 点击任何节点均会触发；level 代表当前点击的层级，0 代表最左侧，依次递进。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tree-select/type.ts)。<br/>`type TreeLevel = 0 \| 1 \| 2`<br/>
