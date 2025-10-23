:: BASE_DOC ::

## API

### Cascader Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
checkStrictly | Boolean | false | 父子节点选中状态不再关联，可各自选中或取消 | N
closeBtn | Boolean / Slot / Function | true | 关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
header | Slot / Function | - | 头部。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | 用来定义 value / label / children / disabled 在 `options` 中对应的字段别名。TS 类型：`CascaderKeysType` `type CascaderKeysType = TreeKeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts) | N
middleContent | Slot / Function | - | 中间内容。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
options | Array | [] | 可选项数据源。TS 类型：`Array<CascaderOption>` | N
overlayProps | Object | {} | 遮罩层的属性，透传至 overlay。TS 类型：`OverlayProps`，[Overlay API Documents](./overlay?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts) | N
placeholder | String / Slot / Function | '选择选项' | 未选中时的提示文案。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
subTitles | Array | [] | 每级展示的次标题。TS 类型：`Array<string>` | N
theme | String | step | 展示风格。可选项：step/tab | N
title | String / Slot / Function | - | 标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Number | - | 选项值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String / Number | - | 选项值。非受控属性 | N
visible | Boolean | false | 是否展示 | N
onChange | Function |  | TS 类型：`(value: string \| number, selectedOptions: CascaderOption[]) => void`<br/>值发生变更时触发 | N
onClose | Function |  | TS 类型：`(trigger: CascaderTriggerSource) => void`<br/>关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type CascaderTriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/> | N
onPick | Function |  | TS 类型：`(context: { value: string \| number, label: string, index: number, level: number }) => void`<br/>选择后触发 | N

### Cascader Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: string \| number, selectedOptions: CascaderOption[])` | 值发生变更时触发
close | `(trigger: CascaderTriggerSource)` | 关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/cascader/type.ts)。<br/>`type CascaderTriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/>
pick | `(context: { value: string \| number, label: string, index: number, level: number })` | 选择后触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-cascader-disabled-color | @text-color-disabled | -
--td-cascader-options-title-color | @text-color-placeholder | -
--td-cascader-step-arrow-color | @text-color-placeholder | -
--td-cascader-active-color | @brand-color | -
--td-cascader-bg-color | @bg-color-container | -
--td-cascader-border-color | @component-stroke | -
--td-cascader-options-height | 320px | -
--td-cascader-step-dot-size | 8px | -
--td-cascader-step-height | 44px | -
--td-cascader-title-color | @text-color-primary | -
--td-cascder-title-font-size | 18px | -
