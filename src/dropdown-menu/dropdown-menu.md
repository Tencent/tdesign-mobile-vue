:: BASE_DOC ::

## API
### DropdownMenu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closeOnClickOverlay | Boolean | true | 是否在点击遮罩层后关闭菜单 | N
direction | String | down | 菜单展开方向。可选项：down/up | N
duration | String / Number | 200 | 动画时长 | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
zIndex | Number | 11600 | 菜单栏 z-index 层级 | N

### DropdownItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 是否禁用 | N
keys | Object | - | 用来定义 value / label 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | String | - | 标题 | N
multiple | Boolean | false | 是否多选 | N
options | Array | [] | 选项数据。TS 类型：`Array<DropdownOption>` `interface DropdownOption { label: string; disabled: boolean; value: DropdownValue; }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
optionsColumns | String / Number | 1 | 选项分栏（1-3） | N
value | String / Number | undefined | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DropdownValue ` `type DropdownValue = string \| number;`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
defaultValue | String / Number | undefined | 选中值。非受控属性。TS 类型：`DropdownValue ` `type DropdownValue = string \| number;`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/dropdown-menu/type.ts) | N
onChange | Function |  | TS 类型：`(value: DropdownValue) => void`<br/>值改变时触发 | N
onConfirm | Function |  | TS 类型：`(value: DropdownValue) => void`<br/>点击确认时触发 | N
onReset | Function |  | TS 类型：`(value: DropdownValue) => void`<br/>点击重置时触发 | N

### DropdownItem Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: DropdownValue)` | 值改变时触发
confirm | `(value: DropdownValue)` | 点击确认时触发
reset | `(value: DropdownValue)` | 点击重置时触发


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-dropdown-menu-active-colorm | @brand-color | - 
--td-dropdown-menu-bg-colorm | @bg-color-container | - 
--td-dropdown-menu-colorm | @font-gray-1 | - 
--td-dropdown-menu-disabled-colorm | @font-gray-4 | - 
--td-dropdown-menu-font-sizem | 14px | - 
--td-dropdown-menu-icon-sizem | 24px | - 
