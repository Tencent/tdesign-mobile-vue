:: BASE_DOC ::

## API

### Segmented Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
block | Boolean | false | 是否撑满父元素宽度 | N
disabled | Boolean | - | 是否禁用 | N
options | Object | [] | 数据化配置选项内容。TS 类型：`string[] \| number[] \| SegmentedItem[] ` `interface SegmentedItem { value: string \| number; label?: TNode; icon?: TNode; disabled?: boolean }`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/segmented/type.ts) | N
value | String / Number | - | 当前选中的值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String / Number | - | 当前选中的值。非受控属性 | N
onChange | Function |  | TS 类型：`(value: string \| number, selectedOption: SegmentedItem) => void`<br/>选项值发生变化时触发 | N

### Segmented Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: string \| number, selectedOption: SegmentedItem)` | 选项值发生变化时触发
