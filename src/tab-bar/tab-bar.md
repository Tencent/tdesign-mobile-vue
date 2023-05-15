:: BASE_DOC ::

## API
### TabBar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bordered | Boolean | true | 是否显示外边框 | N
fixed | Boolean | true | 是否固定在底部 | N
safeAreaInsetBottom | Boolean | true | 是否为 iPhoneX 留出底部安全距离 | N
shape | String | 'normal' | 标签栏的形状。可选项：normal/round | N
split | Boolean | true | 是否需要分割线 | N
theme | String | 'normal' | 选项风格。可选项：normal/tag | N
value | String / Number / Array | undefined | 当前选中标签的索引。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`string \| number \| Array<string \| number>` | N
defaultValue | String / Number / Array | undefined | 当前选中标签的索引。非受控属性。TS 类型：`string \| number \| Array<string \| number>` | N
onChange | Function |  | TS 类型：`(value: string \| number) => void`<br/>选中标签切换时触发 | N

### TabBar Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: string \| number)` | 选中标签切换时触发

### TabBarItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
badgeProps | Object | - | 图标右上角提示信息。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
icon | Slot / Function | - | 图标名称。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
subTabBar | Array | - | 二级菜单。TS 类型：`SubTabBarItem[] ` `interface SubTabBarItem { value: string; label: string }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
value | String / Number | - | 标识符 | N
