:: BASE_DOC ::

## API
### Tabs Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
animation | Object | - | 动画效果设置。其中 duration 表示动画时长。TS 类型：`TabAnimation` `type TabAnimation = { duration: number } & Record<string, any>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
list | Array | - | 选项卡列表。TS 类型：`Array<TdTabPanelProps>` | N
placement | String | top | 选项卡位置。可选项：left/top | N
showBottomLine | Boolean | true | 是否展示底部激活线条 | N
size | String | medium | 组件尺寸。可选项：medium/large | N
stickyProps | Object | - | 是否支持吸顶。TS 类型：`StickyProps`，[Sticky API Documents](./sticky?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
value | String / Number | - | 激活的选项卡值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`TabValue` `type TabValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
defaultValue | String / Number | - | 激活的选项卡值。非受控属性。TS 类型：`TabValue` `type TabValue = string | number`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tabs/type.ts) | N
onChange | Function |  | TS 类型：`(value: TabValue) => void`<br/>激活的选项卡发生变化时触发 | N

### Tabs Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: TabValue)` | 激活的选项卡发生变化时触发

### TabPanel Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
destroyOnHide | Boolean | true | 选项卡内容隐藏时是否销毁 | N
disabled | Boolean | false | 是否禁用当前选项卡 | N
label | String / Slot / Function | - | 选项卡名称，可自定义选项卡导航内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
panel | String / Slot / Function | - | 用于自定义选项卡面板内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
value | String / Number | - | 选项卡的值，唯一标识。TS 类型：`TabValue` | N
