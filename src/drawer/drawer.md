# Drawer 抽屉

## 基础用法

::: demo ./demos/index.vue
:::

## 带图标抽屉

::: demo ./demos/iconDrawer.vue
:::

## Props

| 属性            | 类型    | 默认值 | 必传 | 说明                                                                                    |
| --------------- | ------- | ------ | ---- | --------------------------------------------------------------------------------------- |
| v-model/visible | Boolean | false  | Y    | 显示与隐藏                                                                              |
| showIcon        | Boolean | false  | N    | 是否展示图标                                                                            |
| sidebar         | Object  | -      | N    | 列表参数，包含 name(菜单名称),path(跳转历路径),iconImg(图标绝对地址)/iconName(图标名称) |
