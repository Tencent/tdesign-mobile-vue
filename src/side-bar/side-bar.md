:: BASE_DOC ::

## API
### SideBar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
value | String / Number | - | 选项值。支持语法糖 `v-model` 或 `v-model:value` | N
defaultValue | String / Number | - | 选项值。非受控属性 | N
onChange | Function |  | TS 类型：`(value: number \| string) => void`<br/>选项值发生变化时触发 | N
onClick | Function |  | TS 类型：`(value: number \| string, label: string) => void`<br/>点击选项时触发 | N

### SideBar Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: number \| string)` | 选项值发生变化时触发
click | `(value: number \| string, label: string)` | 点击选项时触发

### SideBarItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
badgeProps | Object | - | 透传至 Badge 组件 | N
disabled | Boolean | false | 是否禁用 | N
icon | Slot / Function | - | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | String | - | 展示的标签 | N
value | String / Number | - | 当前选项的值 | N


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-side-bar-active-color | @brand-color | - 
--td-side-bar-bg-color | @bg-color-secondarycontainer | - 
--td-side-bar-bg-color | @bg-color-secondarycontainer | - 
--td-side-bar-border-radius | 9px | - 
--td-side-bar-color | @font-gray-1 | - 
--td-side-bar-disabled-color | @font-gray-4 | - 
--td-side-bar-font-size | 16px | - 
--td-side-bar-height | 100% | - 
--td-side-bar-icon-size | 20px | - 
--td-side-bar-item-height | 56px | - 
--td-side-bar-item-line-height | 24px | - 
--td-side-bar-width | 103px | - 
