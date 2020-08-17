# 评分

::: demo 基础用法 ./demos/index.vue
:::

::: demo 允许半选 ./demos/allowHalf.vue
:::

::: demo 辅助文本 ./demos/text.vue
:::

::: demo 自定义数量 ./demos/count.vue
:::

::: demo 只读 ./demos/readonly.vue
:::


## Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|v-model/value|Number|0|Y|选择评分的值|
|count|Number|5|N|评分的数量  |
|readonly|Boolean|false |N|是否为只读 |
|allow-half|Boolean|false|N|是否允许半选|
|clearable|Boolean|false|N|是否允许取消选择|
|show-text|Boolean|false|N|是否显示辅助文字|
|texts|Array|-|N|评分等级对应的辅助文字|
|text-color|String|-|N|辅助文字颜色|
|color|String|-|N|评分图标的颜色（待完善）|
|size|String|-|N|评分图标的大小（待完善）|
