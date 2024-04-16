:: BASE_DOC ::

## API

### ActionSheet Props

name | type | default | description | required
-- | -- | -- | -- | --
align | String | center | options: center/left | N
cancelText | String | - | \- | N
count | Number | 8 | \- | N
description | String | - | \- | N
items | Array | - | required。Typescript：`Array<string \| ActionSheetItem>` `interface ActionSheetItem {label: string; color?: string; disabled?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts) | Y
showCancel | Boolean | true | \- | N
theme | String | list | options: list/grid | N
visible | Boolean | false | required。`v-model` and `v-model:visible` is supported | Y
defaultVisible | Boolean | false | required。uncontrolled property | Y
onCancel | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onClose | Function |  | Typescript：`(trigger: TriggerSource) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'command' \| 'select' `<br/> | N
onSelected | Function |  | Typescript：`(selected: ActionSheetItem \| string, index: number) => void`<br/> | N

### ActionSheet Events

name | params | description
-- | -- | --
cancel | `(context: { e: MouseEvent })` | \-
close | `(trigger: TriggerSource)` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/action-sheet/type.ts)。<br/>`type TriggerSource = 'overlay' \| 'command' \| 'select' `<br/>
selected | `(selected: ActionSheetItem \| string, index: number)` | \-

### CSS 变量

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-action-sheet-border-color | @gray-color-1 | - 
--td-action-sheet-border-radius | @radius-extra-large | - 
--td-action-sheet-cancel-height | 48px | - 
--td-action-sheet-color | @font-gray-1 | - 
--td-action-sheet-description-color | @font-gray-3 | - 
--td-action-sheet-dot-active-color | @brand-color | - 
--td-action-sheet-dot-color | @font-gray-4 | - 
--td-action-sheet-dot-size | 8px | - 
--td-action-sheet-list-item-disabled-color | @font-gray-4 | - 
--td-action-sheet-list-item-height | 56px | - 
--td-action-sheet-text-align | center | - 
--td-action-sheet-text-weight | 400 | -