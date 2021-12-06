# Badge 徽标

## 组件类型

图标右上角的红点、数字或者文字，用于告知用户，该区域的状态变化或者待处理任务的数量。

### 小红点
::: demo demos/dist
:::

### 数字型

::: demo demos/max-count
:::

### 文字型

::: demo demos/text
:::

### 角标

::: demo demos/shape
:::

### 颜色

::: demo demos/color
:::

### 偏移用法 

::: demo demos/offset
:::

## API

### Badge Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
color | String | - | 颜色 | N
content | String / Slot / Function | - | 徽标内容。TS 类型：`string | TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
count | String / Number / Slot / Function | - | 徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+。TS 类型：`string | number | TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
dot | Boolean | false | 是否为红点 | N
maxCount | Number | 99 | 封顶的数字值 | N
offset | Array | - | 设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem']。TS 类型：`Array<string | number>` | N
shape | String | circle | 形状。可选项：circle/round/ribbon | N
showZero | Boolean | false | 当数值为 0 时，是否展示徽标数字 | N
size | String | medium | 尺寸。可选项：small/medium | N
