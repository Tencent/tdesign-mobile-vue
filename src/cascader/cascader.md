:: BASE_DOC ::

## API

### Cascader Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closeBtn | Boolean / Slot / Function | true | 关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | 用来定义 value / label 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
lazy | Boolean | false | 是否异步加载 | N
loadCompleted | Boolean | false | 是否完成异步加载 | N
options | Array | [] | 可选项数据源。TS 类型：`Array<CascaderOption>` | N
subTitles | Array | [] | 每级展示的次标题。TS 类型：`Array<string>` | N
theme | String | step | 展示风格。可选项：step/tab | N
title | String / Slot / Function | - | 标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Number | - | 选项值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String / Number | - | 选项值。非受控属性 | N
visible | Boolean | false | 是否展示 | N
onChange | Function |  | TS 类型：`(value: string \| number, selectedOptions: string[]) => void`<br/>值发生变更时触发 | N
onClose | Function |  | TS 类型：`(trigger: TriggerSource) => void`<br/>关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/> | N
onPick | Function |  | TS 类型：`(value: string \| number, index: number) => void`<br/>选择后触发 | N

### Cascader Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: string \| number, selectedOptions: string[])` | 值发生变更时触发
close | `(trigger: TriggerSource)` | 关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/>
pick | `(value: string \| number, index: number)` | 选择后触发
