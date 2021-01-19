# Collapse 折叠面板

::: demo 折叠面板 ./demos/index.vue
:::

## Collapse Props

| 属性名称            | 类型                  | 默认值 | 必传 | 说明                                  |
| ------------------- | --------------------- | ------ | ---- | ------------------------------------- |
| value/v-model:value | Array, String, Number |        | N    | 展开的面板，支持 v-model 双向绑定     |
| accordion           | Boolean               | false  | N    | 手风琴模式，每次只打开一个面板        |
| title               | String                |        | N    | 折叠面板标题                          |
| defaultExpandAll    | Boolean               | False  | N    | 默认`false`。若为`true`，默认展开全部 |
| labelWidth          | Number                |        | N    | 面板内列表标签宽度                    |

## Collapse Events

| 事件名称 | 说明                         | 参数                           |
| -------- | ---------------------------- | ------------------------------ |
| change   | 切换面板时触发，返回变化的值 | (value: Array, String, Number) |

## Collapse Panel Props

| 属性名称        | 类型                  | 默认值 | 必传 | 说明                                        |
| --------------- | --------------------- | ------ | ---- | ------------------------------------------- |
| name            | String, Number        |        | Y    | 面板标识                                    |
| title           | String, Number        |        | N    | 标题，支持命名 slot                         |
| extra           | String, Number        |        | N    | 展开按钮左侧补充描述，支持命名 slot         |
| content         | String, Number, Array |        | N    | 内容，默认 slot；数组，则为列表内容         |
| disabled        | Boolean               |        |      | 若为`true`，面板将不可展开/折叠             |
| labelWidth      | Number                |        |      | 面板内列表标签宽度，单项设置优先级高        |
| headerClickable | Boolean               | true   |      | 若为 true`，面板头部可点，触发展开/折叠事件 |

## Collapse Events

| 事件名称 | 说明               | 参数                   |
| -------- | ------------------ | ---------------------- |
| click    | 点击面板头部时触发 | (name: String, Number) |
