:: BASE_DOC ::

## API
### Tabs Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
animation | Object | - | 动画效果设置。其中 duration 表示动画时长。TS 类型：`TabAnimation` `type TabAnimation = { duration: number } & Record<string, any>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
list | Array | - | 选项卡列表。TS 类型：`Array<TdTabPanelProps>` | N
showBottomLine | Boolean | true | 是否展示底部激活线条 | N
bottomLineMode | String | fixed | 激活下划线的模式。可选项：fixed/auto/full ｜ N
size | String | medium | 组件尺寸。可选项：medium/large | N
spaceEvenly | Boolean | true | 选项卡头部空间是否均分 | N
sticky | Boolean | false | 是否开启粘性布局 | N
stickyProps | Object | - | 透传至 Sticky 组件。TS 类型：`StickyProps`，[Sticky API Documents](./sticky?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
swipeable | Boolean | true | 是否可以滑动切换 | N
theme | String | line | 标签的样式。可选项：line/tag/card | N
value | String / Number | - | 激活的选项卡值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TabValue` `type TabValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
defaultValue | String / Number | - | 激活的选项卡值。非受控属性。TS 类型：`TabValue` `type TabValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
onChange | Function |  | TS 类型：`(value: TabValue, label: string) => void`<br/>激活的选项卡发生变化时触发 | N
onClick | Function |  | TS 类型：`(value: TabValue, label: string) => void`<br/>点击选项卡时触发 | N
onScroll | Function |  | TS 类型：`(scrollTop: number, isFixed: boolean) => void`<br/>页面滚动时触发 | N

### Tabs Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: TabValue, label: string)` | 激活的选项卡发生变化时触发
click | `(value: TabValue, label: string)` | 点击选项卡时触发
scroll | `(scrollTop: number, isFixed: boolean)` | 页面滚动时触发

### TabPanel Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
badgeProps | Object | null | 透传至 Badge 组件 | N
destroyOnHide | Boolean | true | 选项卡内容隐藏时是否销毁 | N
disabled | Boolean | false | 是否禁用当前选项卡 | N
label | String / Slot / Function | - | 选项卡名称，可自定义选项卡导航内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
panel | String / Slot / Function | - | 用于自定义选项卡面板内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Number | - | 选项卡的值，唯一标识。TS 类型：`TabValue` | N


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-tab-border-color | @component-stroke | - 
--td-tab-font-size | 14px | - 
--td-tab-icon-size | 16px | - 
--td-tab-track-color | @brand-color | - 
--td-tab-track-radius | 4px | - 
--td-tab-track-thickness | 3px | - 
--td-tab-track-width | 16px | 当前激活 tab 下划线的宽度，仅在 bottomLineMode 为 'fixed' 时有效
--td-tab-nav-bg-color | @bg-color-container | - 
--td-tab-item-active-color | @brand-color | - 
--td-tab-item-color | @font-gray-1 | - 
--td-tab-item-disabled-color | @font-gray-4 | - 
--td-tab-item-height | 48px | - 
--td-tab-item-tag-active-bg | @brand-color-light | - 
--td-tab-item-tag-bg | @bg-color-secondarycontainer | - 
--td-tab-item-tag-height | 32px | - 
--td-tab-item-vertical-height | 54px | - 
--td-tab-item-vertical-width | 104px | - 