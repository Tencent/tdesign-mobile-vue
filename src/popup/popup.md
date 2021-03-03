# Popup 弹出层-Popup
定义：由其他控件触发，屏幕滑出或弹出一块自定义内容区域


## 1. 组件类型
TDesign中，拥有两种不同类型的弹出层：中部弹出、底部弹出、顶部弹出、左侧弹出、右侧弹出

###  1.1 中部弹出
使用场景：常用于轻提示场景

::: demo ./demos/positionCenter.vue
:::

###  1.2底部弹出
使用场景：常用于较重要的操作反馈提示场景或不打断主任务的临时操作

::: demo ./demos/positionBottom.vue
:::


###  1.3顶部弹出
使用场景：常用于及时反馈

::: demo ./demos/positionTop.vue
:::

### 1.4左侧弹出
使用场景：常用于页面导航场景

::: demo ./demos/positionLeft.vue
:::

###  1.5右侧弹出
使用场景：常用于页面导航场景

::: demo ./demos/positionRight.vue
:::


## 2.样式

### 2.1 自定义动画

::: demo ./demos/custom-animation.vue
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
