:: BASE_DOC ::

## API


### SegmentedControl Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
items | Array | - | 分段器选项。TS 类型：`Array<string \| number>` | N
value | String / Number / Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`SegmentedControlValue` `type SegmentedControlValue = string \| number \| Array<string \| number>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/segmented-control/type.ts) | N
defaultValue | String / Number / Array | - | 选中值。非受控属性。TS 类型：`SegmentedControlValue` `type SegmentedControlValue = string \| number \| Array<string \| number>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/segmented-control/type.ts) | N
onChange | Function |  | TS 类型：`(value: SegmentedControlValue) => void`<br/>选中值变化时触发 | N

### SegmentedControl Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: SegmentedControlValue)` | 选中值变化时触发
