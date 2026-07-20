:: BASE_DOC ::

## API

### TabBar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bordered | Boolean | true | 是否显示外边框 | N
fixed | Boolean | true | 是否固定在底部 | N
placeholder | Boolean | false | 固定在底部时是否开启占位 | N
safeAreaInsetBottom | Boolean | true | 是否开启底部安全区适配 | N
shape | String | normal | 标签栏的形状，可选 `normal` / `round` | N
effect | String | normal | 标签栏的视觉效果，可选 `normal` / `glass`。当 `shape="round"` 且 `theme="tag"` 时，`normal` 为普通悬浮胶囊，`glass` 为液态玻璃风格 | N
split | Boolean | true | 是否需要分割线 | N
theme | String | normal | 选项风格，可选 `normal` / `tag` | N
value | String / Number / Array | - | 当前选中标签的索引，支持 `v-model` 或 `v-model:value` | N
defaultValue | String / Number / Array | - | 当前选中标签的索引，非受控属性 | N
zIndex | Number | 1 | 标签栏层级 | N
onChange | Function |  | 选中标签切换时触发 | N

### TabBar Events

名称 | 参数 | 说明
-- | -- | --
change | `(value: string \| number)` | 选中标签切换时触发

### TabBarItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
badgeProps | Object | - | 图标右上角提示信息 | N
icon | Slot / Function | - | 图标名称 | N
subTabBar | Array | - | 二级菜单 | N
value | String / Number | - | 标识符 | N

### 使用说明

悬浮胶囊标签栏推荐使用如下组合：

```vue
<t-tab-bar v-model="value" shape="round" theme="tag" effect="normal" :fixed="false" :split="false" />
```

如需液态玻璃效果，将 `effect` 切换为 `glass`：

```vue
<t-tab-bar v-model="value" shape="round" theme="tag" effect="glass" :fixed="false" :split="false" />
```

`effect="glass"` 主要负责组件本身的玻璃样式，建议在调用层补充合适的图片或渐变背景，以更好地体现玻璃质感。

### CSS Variables

名称 | 默认值 | 说明
-- | -- | --
--td-tab-bar-bg-color | @bg-color-container | 标签栏背景色
--td-tab-bar-border-color | @border-color | 标签栏边框色
--td-tab-bar-round-shadow | @shadow-3 | 悬浮胶囊阴影
--td-tab-bar-active-bg | @brand-color-light | 选中项背景色
--td-tab-bar-active-color | @brand-color | 选中项文字和图标色
--td-tab-bar-color | @text-color-primary | 默认文字和图标色
--td-tab-bar-height | 40px | 标签栏项高度
--td-tab-bar-hover-bg-color | rgba(0, 0, 0, 0.05) | 悬浮态背景色
--td-tab-bar-spread-border-color | @border-color | 二级菜单分割线颜色
--td-tab-bar-spread-shadow | @shadow-3 | 二级菜单阴影
--td-tab-bar-liquid-glass-item-active-bg | rgba(255, 255, 255, 0.06) | `effect="glass"` 选中项玻璃底色
--td-tab-bar-liquid-glass-item-active-border-color | rgba(255, 255, 255, 0.58) | `effect="glass"` 选中项边框色
