# Preview 图片预览

## 基础用法

::: demo demos/index
:::

## 图片列表

::: demo demos/imageList
:::

## 默认展示

::: demo demos/initialIndex
:::

## 遮罩颜色

::: demo demos/background
:::

## API

| 属性            | 类型            | 默认值            | 必传 | 说明           |
| --------------- | --------------- | ----------------- | ---- | -------------- |
| images          | `Array<String>` | []                | Y    | 图片数组       |
| visible         | Boolean         | false             | N    | 隐藏/显示预览  |
| showIndex       | Boolean         | true              | N    | 是否显示页码   |
| initialIndex    | Number          | 0                 | N    | 默认展示第几项 |
| backgroundColor | String          | rgba(0, 0, 0, .6) | N    | 遮罩的背景颜色 |

## Events

| 事件名称 | 参数 | 说明       |
| -------- | ---- | ---------- |
| change   | -    | 翻页时回调 |
