# mobile vue 索引

::: demo 示例用法 ./demos/base.vue
:::

## indexes Props

| 属性      | 类型          | 默认值 | 必传 | 说明     |
| --------- | ------------- | ------ | ---- | -------- |
| indexList | Array<string> | []     | Y    | 索引列表 |

## indexes-anchor Props

| 属性  | 类型   | 默认值 | 必传 | 说明                      |
| ----- | ------ | ------ | ---- | ------------------------- |
| index | String | ''     | Y    | 与`indexList`里面元素匹配 |
| title | String | ''     | -    | 显示标题                  |

## indexes-cell Props

| 属性  | 类型   | 默认值 | 必传 | 说明             |
| ----- | ------ | ------ | ---- | ---------------- |
| title | string |        | Y    | 显示标题         |
| value | string |        | -    | 点击以后回调的值 |
