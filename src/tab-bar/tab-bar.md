:: BASE_DOC ::

## API

### TabBar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
bordered | Boolean | true | 是否显示外边框 | N
effect | String | normal | 标签栏的材质效果。可选项：normal/glass | N
fixed | Boolean | true | 是否固定在底部 | N
placeholder | Boolean | false | `1.12.0`。固定在底部时是否开启占位 | N
safeAreaInsetBottom | Boolean | true | 是否开启底部安全区适配 | N
shape | String | normal | 标签栏的形状。可选项：normal/round | N
split | Boolean | true | 是否需要分割线 | N
theme | String | normal | 选项风格。normal 为弱选中，tag 为逐项标签选中，capsule 为共享胶囊选中态。可选项：normal/tag/capsule | N
value | String / Number / Array | - | 当前选中标签的索引。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`string \| number \| Array<string \| number>` | N
defaultValue | String / Number / Array | - | 当前选中标签的索引。非受控属性。TS 类型：`string \| number \| Array<string \| number>` | N
zIndex | Number | 1 | `1.12.0`。标签栏层级 | N
onChange | Function |  | TS 类型：`(value: string \| number) => void`<br/>选中标签切换时触发 | N

### TabBar Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: string \| number)` | 选中标签切换时触发


### TabBarItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
badgeProps | Object | - | 图标右上角提示信息。TS 类型：`BadgeProps`，[Badge API Documents](./badge?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
icon | Slot / Function | - | 图标名称。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
subTabBar | Array | - | 二级菜单。TS 类型：`SubTabBarItem[] ` `interface SubTabBarItem { value: string; label: string }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/tab-bar/type.ts) | N
value | String / Number | - | 标识符 | N

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述
-- | -- | --
--td-tab-bar-bg-color | @bg-color-container | -
--td-tab-bar-border-color | @border-color | -
--td-tab-bar-round-shadow | @shadow-3 | -
--td-tab-bar-glass-bg-color | rgba(255, 255, 255, 50%) | 玻璃材质基线填充色
--td-tab-bar-glass-shadow | @shadow-3 | 玻璃材质阴影
--td-tab-bar-glass-fallback-blur | 8px | SVG 增强不可用时的高斯模糊半径
--td-tab-bar-glass-sheen-opacity | 1 | 材质高光轮廓透明度
--td-tab-bar-selected-bg-color | @brand-color | 圆角 TabBar 选中态胶囊颜色
--td-tab-bar-selected-bg-opacity | 16% | 圆角 TabBar 选中态胶囊颜色混合比例
--td-tab-bar-selected-sheen-opacity | 0.62 | 圆角 TabBar 选中态高光轮廓透明度
--td-tab-bar-selected-border-color | @component-border | normal round 选中态描边颜色
--td-tab-bar-active-bg | @brand-color-light | -
--td-tab-bar-active-color | @brand-color | -
--td-tab-bar-color | @text-color-primary | -
--td-tab-bar-height | 40px | -
--td-tab-bar-hover-bg-color | rgba(0, 0, 0, 0.05) | -
--td-tab-bar-spread-border-color | @border-color | -
--td-tab-bar-spread-shadow | @shadow-3 | -
