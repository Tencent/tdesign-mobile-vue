:: BASE_DOC ::

## API
### Slider Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 是否禁用组件 | N
marks | Object / Array | {} | 刻度标记，示例：`[0, 10, 40, 200]` 或者 `{ 5:  '5¥', 10: '10%' }`。TS 类型：`Record<number, string> | Array<number>` | N
max | Number | 100 | 滑块范围最大值 | N
min | Number | 0 | 滑块范围最小值 | N
range | Boolean | false | 双游标滑块 | N
showValue | Boolean | false | 是否显示当前滑动的值 | N
step | Number | 1 | 步长 | N
value | Number / Array | - | 滑块值。支持语法糖。TS 类型：`SliderValue`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
defaultValue | Number / Array | - | 滑块值。非受控属性。TS 类型：`SliderValue`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
onChange | Function |  | 滑块值变化时触发。`(value: SliderValue) => {}` | N
onDragEnd | Function |  | 结束拖动时触发。`() => {}` | N
onDragStart | Function |  | 开始拖动时触发。`() => {}` | N

### Slider Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: SliderValue)` | 滑块值变化时触发
drag-end | - | 结束拖动时触发
drag-start | - | 开始拖动时触发
