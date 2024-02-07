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
