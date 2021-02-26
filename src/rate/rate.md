# Rate 评分

定义：用户对某行为/事物进行打分

## 1. 组件类型

在TDesign中，拥有两种不同类型的评分：基础评分、带描述评分

### 1.1. 基础评分

使用场景：简单的星级评定，不涉及具体分数

::: demo ./demos/index.vue
:::


### 1.2. 带描述评分

使用场景：较为严谨的星级评定，展示具体分数或具体等级

::: demo ./demos/text.vue
:::


## 2. 组件样式

### 2.1. 允许半选

::: demo ./demos/allowHalf.vue
:::


### 2.2. 自定义数量

::: demo ./demos/count.vue
:::

### 2.3. 只读状态

::: demo ./demos/readonly.vue
:::

### 2.4. 自定义颜色

::: demo ./demos/color.vue
:::

### 2.5. 自定义图标

::: demo ./demos/icon.vue
:::

## Props

| 属性          | 类型    | 默认值 | 必传 | 说明                   |
| ------------- | ------- | ------ | ---- | ---------------------- |
| v-model/value | Number  | 0      | Y    | 选择评分的值           |
| count         | Number  | 5      | N    | 评分的数量             |
| readonly      | Boolean | false  | N    | 是否为只读             |
| allow-half    | Boolean | false  | N    | 是否允许半选           |
| clearable     | Boolean | false  | N    | 是否允许取消选择       |
| show-text     | Boolean | false  | N    | 是否显示辅助文字       |
| texts         | Array   | -      | N    | 评分等级对应的辅助文字 |
| text-color    | String  | -      | N    | 辅助文字颜色           |
| color         | String  | -      | N    | 评分图标的颜色         |
| size          | String  | -      | N    | 评分图标的大小         |
