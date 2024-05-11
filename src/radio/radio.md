:: BASE_DOC ::

## API

### Radio Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
allowUncheck | Boolean | false | 是否允许取消选中 | N
block | Boolean | true | 是否为块级元素 | N
borderless | Boolean | undefined | 是否开启无边框模式 | N
checked | Boolean | false | 是否选中。支持语法糖 `v-model` 或 `v-model:checked` | N
defaultChecked | Boolean | false | 是否选中。非受控属性 | N
content | String / Slot / Function | - | 单选内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
contentDisabled | Boolean | - | 是否禁用组件内容（content）触发选中 | N
default | String / Slot / Function | - | 单选按钮内容，同 label。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | 是否为禁用态。如果存在父组件 RadioGroup，默认值由 RadioGroup.disabled 控制。Radio.disabled 优先级高于 RadioGroup.disabled | N
icon | String / Array | 'circle' | 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。使用 String 时，值为 circle 表示填充型图标、值为 line 表示描边型图标、值为 dot 表示圆点图标、值为 'none' 则表示没有图标。TS 类型：`'circle' \| 'line' \| 'dot' \| 'none' \|Array<TNode>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | 主文案。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxContentRow | Number | 5 | 内容最大行数限制 | N
maxLabelRow | Number | 3 | 主文案最大行数限制 | N
name | String | - | HTML 元素原生属性 | N
placement | String | left | 复选框和内容相对位置。可选项：left/right | N
value | String / Number / Boolean | undefined | 单选按钮的值。TS 类型：`string \| number \| boolean` | N
onChange | Function |  | TS 类型：`(checked: boolean, context: { e: Event }) => void`<br/>选中状态变化时触发 | N

### Radio Events

名称 | 参数 | 描述
-- | -- | --
change | `(checked: boolean, context: { e: Event })` | 选中状态变化时触发


### RadioGroup Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
allowUncheck | Boolean | false | 是否允许取消选中 | N
borderless | Boolean | false | 是否开启无边框模式；优先级低于 Radio | N
disabled | Boolean | - | 是否禁用全部子单选框。默认为 false。RadioGroup.disabled 优先级低于 Radio.disabled | N
icon | String / Array | 'circle' | 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。使用 String 时，值为 circle 表示填充型图标、值为 line 表示描边型图标、值为 dot 表示圆点图标。TS 类型：`'circle' \| 'line' \| 'dot' \| Array<TNode>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
keys | Object | - | 用来定义 value / label 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
name | String | - | HTML 元素原生属性 | N
options | Array | - | 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同。TS 类型：`Array<RadioOption>` `type RadioOption = string \| number \| RadioOptionObj` `interface RadioOptionObj { label?: string \| TNode; value?: string \| number \| boolean; disabled?: boolean }`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
placement | String | left | 复选框和内容相对位置。可选项：left/right | N
value | String / Number / Boolean | - | 选中的值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`T` `type RadioValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
defaultValue | String / Number / Boolean | - | 选中的值。非受控属性。TS 类型：`T` `type RadioValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
onChange | Function |  | TS 类型：`(value: T, context: { e: Event }) => void`<br/>选中值发生变化时触发 | N

### RadioGroup Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: T, context: { e: Event })` | 选中值发生变化时触发

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-radio-bg-color | @bg-color-container | - 
--td-radio-border-color | @component-stroke | - 
--td-radio-content-color | @font-gray-2 | - 
--td-radio-content-disabled-color | @text-color-disabled | - 
--td-radio-content-line-height | 22px | - 
--td-radio-font-size | 16px | - 
--td-radio-icon-checked-color | @brand-color | - 
--td-radio-icon-color | @component-border | - 
--td-radio-icon-disabled-bg-color | @bg-color-component-disabled | - 
--td-radio-icon-disabled-color | @brand-color-disabled | - 
--td-radio-icon-size | 24px | - 
--td-radio-label-color | @font-gray-1 | - 
--td-radio-label-disabled-color | @text-color-disabled | - 
--td-radio-label-line-height | 24px | - 
--td-radio-vertical-padding | 16px | -