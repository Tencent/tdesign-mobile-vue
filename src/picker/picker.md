# 选择器 Picker

::: demo 单列选择 ./demos/base.vue
:::

::: demo 对象数组 ./demos/object-array.vue
:::

::: demo 默认选中 ./demos/default-selected.vue
:::

::: demo 自定义展示内容 ./demos/custom.vue
:::

::: demo 多列选择 ./demos/multiple.vue
:::

::: demo 联动选择 ./demos/cascade.vue
:::

::: demo 弹窗层的Picker ./demos/popup-picker.vue
:::

## Props

### Picker Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|theme|String|defaykt|N|picker主题|
|title|String|-|N|标题|
|confirmButtonText|String|确定|N|确定按钮文字|
|cancelButtonText|String|取消|N|取消按钮文字|

### PickerItem Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|options|Array|[]|Y|列的候选项|
|optionKey|String|-|N|options为ObjectArray的时候，指定显示对象的key|
|formatter|Function|(val: string) => val|N|格式化显示的候选项|
|defaultIndex|Number|0|N|默认选中的候选项|

## Events

### Picker Events
| 事件名 | 说明 | 回调参数 |
|-------|-----|---------|
|change|选中变化时候触发|[{value, index}]|
|confirm|点击确定按钮时候触发|{value: [], index: []}|
|cancel|点击取消时候触发|-|

### PickerItem Events
| 事件名 | 说明 | 回调参数 |
|-------|-----|---------|
|change|候选项滚动变化时候触发|{value, index}|
