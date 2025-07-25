:: BASE_DOC ::

## API

### Slider Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
disabled | Boolean | undefined | 是否禁用组件 | N
label | String / Boolean / Slot / Function | false | 滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值。TS 类型：`string \| boolean \| TNode<{ value: SliderValue; position?: 'start' \| 'end' }>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
marks | Object / Array | - | 刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + '%', 50: (h) => <button>50</button> }`。TS 类型：`Array<number> \| SliderMarks` `interface SliderMarks { [mark: number]: string \| TNode<{ value: number }> }`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
max | Number | 100 | 滑块范围最大值 | N
min | Number | 0 | 滑块范围最小值 | N
range | Boolean | false | 双游标滑块 | N
showExtremeValue | Boolean | false | 是否边界值 | N
step | Number | 1 | 步长 | N
theme | String | default | 滑块风格。可选项：default/capsule | N
value | Number / Array | 0 | 滑块值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`SliderValue` `type SliderValue = number \| Array<number>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
defaultValue | Number / Array | 0 | 滑块值。非受控属性。TS 类型：`SliderValue` `type SliderValue = number \| Array<number>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/slider/type.ts) | N
vertical | Boolean | false | 是否是垂直的滑块（渲染垂直滑块时，默认高度为200px，可通过修改`--td-slider-bar-height`来自定义高度） | N
onChange | Function |  | TS 类型：`(value: SliderValue) => void`<br/>滑块值变化时触发 | N
onDragend | Function |  | TS 类型：`(value: SliderValue, context: {e: TouchEvent}) => void`<br/>结束拖动时触发 | N
onDragstart | Function |  | TS 类型：`(context: {e: TouchEvent}) => void`<br/>开始拖动时触发 | N

### Slider Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: SliderValue)` | 滑块值变化时触发
dragend | `(value: SliderValue, context: {e: TouchEvent})` | 结束拖动时触发
dragstart | `(context: {e: TouchEvent})` | 开始拖动时触发

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-slider-active-color | @brand-color | - 
--td-slider-bar-height | 4px | - 
--td-slider-bar-width | 4px | - 
--td-slider-capsule-bar-color | @bg-color-component | - 
--td-slider-capsule-bar-height | 24px | - 
--td-slider-capsule-bar-width | 24px | - 
--td-slider-capsule-line-height | 18px | - 
--td-slider-default-color | @bg-color-component-disabled | - 
--td-slider-default-color | @bg-color-secondarycomponent | - 
--td-slider-disabled-color | @brand-color-disabled | - 
--td-slider-disabled-text-color | @text-color-disabled | - 
--td-slider-dot-bg-color | #fff | - 
--td-slider-dot-color | @bg-color-secondarycontainer | - 
--td-slider-dot-size | 20px | - 
--td-slider-scale-desc-color | @text-color-primary | - 
