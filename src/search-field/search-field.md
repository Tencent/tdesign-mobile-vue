# SearchField 搜索框

::: demo 示例用法 ./demos/base.vue
:::

## Props

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|autofocus|Boolean|true|N|是否自动聚焦|
|clearable|Boolean|true|N|是否启用清除图标，点击清除图标后会清空输入框|
|placeholder|String|-|N|占位提示文字|
|cancelButtonText|String|取消|N|取消按钮文字|

## Events

| 事件名 | 说明 | 回调参数 |
|-------|-----|---------|
|change|输入框内容变化时触发|val: 当前输入的值|
|clear|点击清除按钮后触发|-|
|cancel|点击取消按钮时触发|-|