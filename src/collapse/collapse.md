# Collapse 折叠面板

## 组件类型
在TDesign中，拥有两种不同类型的折叠面板：基本型、手风琴模式型

### 基础型
主要用于对复杂区域进行分组和隐藏 常用于订单信息展示等
::: demo demos/basic
:::

### 手风琴模式
对信息进行分组展示和隐藏，每次只展示一组信息
::: demo demos/accordion
:::

### 更多（默认全部展开）
::: demo demos/more
:::

## Props

### Collapse Props

| 属性名称            | 类型                  | 默认值 | 必传 | 说明                                  |
| ------------------- | --------------------- | ------ | ---- | ------------------------------------- |
| value/v-model:value | Array, String, Number |        | N    | 展开的面板，支持 v-model 双向绑定     |
| accordion           | Boolean               | false  | N    | 手风琴模式，每次只打开一个面板        |
| title               | String                |        | N    | 折叠面板标题                          |
| defaultExpandAll    | Boolean               | False  | N    | 默认`false`。若为`true`，默认展开全部 |
| labelWidth          | Number                |        | N    | 面板内列表标签宽度                    |

### Collapse Panel Props

| 属性名称        | 类型                  | 默认值 | 必传 | 说明                                        |
| --------------- | --------------------- | ------ | ---- | ------------------------------------------- |
| name            | String, Number        |        | Y    | 面板标识                                    |
| title           | String, Number        |        | N    | 标题，支持命名 slot                         |
| extra           | String, Number        |        | N    | 展开按钮左侧补充描述，支持命名 slot         |
| content         | String, Number, Array |        | N    | 内容，默认 slot；数组，则为列表内容         |
| disabled        | Boolean               |        |      | 若为`true`，面板将不可展开/折叠             |
| labelWidth      | Number                |        |      | 面板内列表标签宽度，单项设置优先级高        |
| headerClickable | Boolean               | true   |      | 若为 true`，面板头部可点，触发展开/折叠事件 |

## Events

### Collapse Events

| 事件名称 | 说明                         | 参数                           |
| -------- | ---------------------------- | ------------------------------ |
| change   | 切换面板时触发，返回变化的值 | (value: Array, String, Number) |

### Collapse Panel Events

| 事件名称 | 说明               | 参数                   |
| -------- | ------------------ | ---------------------- |
| click    | 点击面板头部时触发 | (name: String, Number) |
