:: BASE_DOC ::

## API

| 属性      | 类型    | 默认值 | 必传 | 说明                        |
| --------- | ------- | ------ | ---- | --------------------------- |
| title     | String  | 导航栏 | N    | 标题文字                    |
| leftArrow | Boolean | true   | N    | 是否展示左箭头              |
| maxLen    | Number  | 6      | N    | 标题文字长度，多余展示`...` |
| rightShow | Boolean  | true    | N    | 是否展示右侧更多按钮 |

## Event

| 事件名      | 说明              | 回调参数 |
| ----------- | ----------------- | -------- |
| click-right | 点击右侧更多 icon | event    |
| click-text  | 点击标题文字      | event    |

## Slot

| 插槽名 | 说明             |
| ------ | ---------------- |
| left   | 自定义左侧关闭按钮 |
| right   | 自定义右侧icon |
| -   | 默认title文案 |
