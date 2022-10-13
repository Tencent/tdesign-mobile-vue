:: BASE_DOC ::

## API
### Cascader Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
value | `Number | String` | [] | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TdCascaderItems`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts) | N
options | Array | [] | 级联可选项。TS 类型：`TdCascaderItems`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts) | N
closeIcon | `String | Slot` | - | 关闭 icon 图标名 | N
title | `String | Slot` | - | 标题 | N

### Cascader Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: string | number, selectedItems: TdCascaderItems, context: { e: MouseEvent })` | 全部选项完成选择触发
pick | `(value: string | number, index: number, context: { e: MouseEvent })` | 点击选项时触发
cancel | `(context: { e: MouseEvent })` | 关闭 Cascader 触发
click-tab | `(index: number)` | 点击 tab 触发
