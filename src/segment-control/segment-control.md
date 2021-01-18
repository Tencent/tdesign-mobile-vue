# 分段器

::: demo 基础分段器 ./demos/index.vue
:::

::: demo 分段器多选 ./demos/multiple.vue
:::

## Props

| 属性       | 类型          | 默认值   | 必传         | 说明       |
| ---------- | ------------- | -------- | ------------ | ---------- | ------------ | --- | ------------ |
| v-model    | `String       | Number   | Array<Number | String>`   | 0            | N   | 当前选中的值 |
| items      | `Array<Number | String>` | []           | Y          | 分段器的选项 |
| isMultiple | Boolean       | false    | N            | 是否为多选 |

### Props Items 参数

| 属性  | 类型     | 默认值  | 必传          | 说明           |
| ----- | -------- | ------- | ------------- | -------------- | ------------ |
| value | `String  | Number` | 当前 index 值 | N              | 选项的标识符 |
| text  | `String` | -       | Y             | 选项显示的内容 |

## Event

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- | ------ | ------------ | -------- |
| change | 选中变化时候触发 | `String  | Number | Array<Number | String>` |
