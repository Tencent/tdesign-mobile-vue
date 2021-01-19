# 弹出层

::: demo 弹出位置 ./demos/position.vue
:::

::: demo 自定义内容区的动画 ./demos/custom-animation.vue
:::

## Props

| 属性             | 类型    | 默认值 | 必传 | 说明                                              |
| ---------------- | ------- | ------ | ---- | ------------------------------------------------- |
| v-model/visible  | Boolean | false  | Y    | 显示与隐藏                                        |
| mask-transparent | Boolean | false  | N    | 遮罩层是否透明                                    |
| position         | String  | bottom | N    | 弹出层的位置，可选值 top/right/bottom/left/center |
| transition-name  | String  | -      | N    | 弹出层动画名，等价于 transition 组件的 name 属性  |
| lock-scroll      | Boolean | true   | N    | 是否锁定内容滚动                                  |

## Events

| 事件名称 | 回调参数 | 说明                         |
| -------- | -------- | ---------------------------- |
| open     | -        | 打开弹出层时触发             |
| opened   | -        | 打开弹出层并且动画结束后触发 |
| close    | -        | 关闭弹出层时触发             |
| closed   | -        | 关闭弹出层并且动画结束后触发 |
