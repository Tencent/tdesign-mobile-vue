:: BASE_DOC ::

## API

### ActionSheet Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
align | String | center | 水平对齐方式。可选项：center/left | N
cancelText | String | - | 设置取消按钮的文本 | N
count | Number | 8 | 设置每页展示菜单的数量，仅当 type=grid 时有效 | N
description | String | - | 动作面板描述文字 | N
items | Array | - | 菜单项。TS 类型：`Array<string \| ActionSheetItem>` `interface ActionSheetItem { label: string; color?: string; disabled?: boolean; icon?: TNode; badge?: BadgeProps }`，[Badge API Documents](./badge?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts) | N
popupProps | Object | {} | 透传 Popup 组件全部属性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts) | N
showCancel | Boolean | true | 是否显示取消按钮 | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
theme | String | list | 展示类型，列表和表格形式展示。可选项：list/grid | N
visible | Boolean | false | 必需。显示与隐藏。支持语法糖 `v-model` 或 `v-model:visible` | Y
defaultVisible | Boolean | false | 必需。显示与隐藏。非受控属性 | Y
onCancel | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击取消按钮时触发 | N
onClose | Function |  | TS 类型：`(trigger: ActionSheetTriggerSource) => void`<br/>关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts)。<br/>`type ActionSheetTriggerSource = 'overlay' \| 'command' \| 'select' `<br/> | N
onSelected | Function |  | TS 类型：`(selected: ActionSheetItem \| string, index: number) => void`<br/>选择菜单项时触发 | N

### ActionSheet Events

名称 | 参数 | 描述
-- | -- | --
cancel | `(context: { e: MouseEvent })` | 点击取消按钮时触发
close | `(trigger: ActionSheetTriggerSource)` | 关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts)。<br/>`type ActionSheetTriggerSource = 'overlay' \| 'command' \| 'select' `<br/>
selected | `(selected: ActionSheetItem \| string, index: number)` | 选择菜单项时触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-action-sheet-border-color | @component-stroke | - 
--td-action-sheet-border-radius | @radius-extra-large | - 
--td-action-sheet-cancel-height | 48px | - 
--td-action-sheet-color | @text-color-primary | - 
--td-action-sheet-description-color | @text-color-placeholder | - 
--td-action-sheet-dot-active-color | @brand-color | - 
--td-action-sheet-dot-color | @text-color-disabled | - 
--td-action-sheet-dot-size | 8px | - 
--td-action-sheet-gap-color | var(--td-bg-color-page, @component-stroke) | - 
--td-action-sheet-list-item-disabled-color | @text-color-disabled | - 
--td-action-sheet-list-item-height | 56px | - 
--td-action-sheet-text-align | center | - 
--td-action-sheet-text-weight | 400 | - 
