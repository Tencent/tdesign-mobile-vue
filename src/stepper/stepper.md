# 步进器 Stepper

::: demo 基础用法 ./demos/index.vue
:::

::: demo 禁用 ./demos/disabled.vue
:::

::: demo 禁止输入 ./demos/disableInput.vue
:::
::: demo 绑定事件 ./demos/event.vue
:::

## Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|v-model|Number/String|0|N|当前绑定值|
|disabled|Boolean|default|N|禁用 |
|step| Number | |N|步长|
|min|Number|0|N|最小值|
|max|Number|10000|N|最大值|
|label|String|''|N|标题|
|disableInput|Boolean|false|N|禁用输入|
|inputWidth|String|-|N|输入框长度|

### Events
| 事件名 | 说明 | 回调参数 |
|-------|-----|---------|
| change | 选择变化时触发|val： number  |