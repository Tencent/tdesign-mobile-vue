# Rate 评分

定义：用户对某行为/事物进行打分

## 组件类型

在TDesign中，拥有两种不同类型的评分：基础评分、带描述评分

### 基础评分

使用场景：简单的星级评定，不涉及具体分数

::: demo demos/index
:::


### 带描述评分

使用场景：较为严谨的星级评定，展示具体分数或具体等级

::: demo demos/text
:::


## 组件样式

### 允许半选

::: demo demos/allowHalf
:::


### 自定义数量

::: demo demos/count
:::

### 自定大小

::: demo demos/size
:::

### 只读状态

::: demo demos/readonly
:::

### 自定义颜色

::: demo demos/color
:::

### 自定义图标

::: demo demos/icon
:::

## API

### Rate Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowHalf | Boolean | false | 是否允许半选 | N
clearable | Boolean | false | 是否允许取消选择 | N
color | String | - | 评分图标的颜色 | N
count | Number | 5 | 评分的数量 | N
readonly | Boolean | false | 是否为只读 | N
showText | Boolean | false | 是否显示辅助文字 | N
size | String | - | 评分图标的大小 | N
texts | Array | - | 自定义评分等级对应的辅助文字。TS 类型：`Array<string>` | N
value | Number | - | 必需。选择评分的值。支持语法糖：v-model | Y
defaultValue | Number | - | 必需。选择评分的值。非受控属性 | Y
onChange | Function |  | 评分数改变时触发。`(value: number) => {}` | N

### Rate Events
名称 | 参数 | 描述
-- | -- | --
change | `(value: number)` | 评分数改变时触发