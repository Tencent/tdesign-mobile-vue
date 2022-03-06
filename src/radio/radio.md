:: BASE_DOC ::

## API
### Radio Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | left | 复选框和内容相对位置。可选项：left/right | N
checked | Boolean | false | 是否选中。支持语法糖 `v-model` 或 `v-model:checked` | N
defaultChecked | Boolean | false | 是否选中。非受控属性 | N
content | String / Slot / Function | - | 单选内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
contentDisabled | Boolean | - | 是否禁用组件内容（content）触发选中 | N
default | String / Slot / Function | - | 单选按钮内容，同 label。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | 是否为禁用态 | N
icon | String / Array | 'fill-circle' | 自定义选中图标和非选中图标。示例：[选中态图标地址，非选中态图标地址]。值为 fill-circle 表示图标为填充型图标，值为 stroke-line 表示图标为描边型图标。TS 类型：`'fill-circle' | 'stroke-line' | Array<TNode>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | String / Slot / Function | - | 主文案。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
name | String | - | HTML 元素原生属性 | N
value | String / Number / Boolean | false | 单选按钮的值。TS 类型：`RadioValue` `type RadioValue = string | number | boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
onChange | Function |  | TS 类型：`(checked: boolean, context: { e: Event }) => void`<br/>选中状态变化时触发 | N

### Radio Events

名称 | 参数 | 描述
-- | -- | --
change | `(checked: boolean, context: { e: Event })` | 选中状态变化时触发

### RadioGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | undefined | 是否禁用全部子单选框 | N
name | String | - | HTML 元素原生属性 | N
options | Array | - | 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同。TS 类型：`Array<RadioOption>` `type RadioOption = string | number | RadioOptionObj` `interface RadioOptionObj { label?: string | TNode; value?: string | number; disabled?: boolean }`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/radio/type.ts) | N
value | String / Number / Boolean | false | 选中的值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`RadioValue` | N
defaultValue | String / Number / Boolean | false | 选中的值。非受控属性。TS 类型：`RadioValue` | N
onChange | Function |  | TS 类型：`(value: RadioValue, context: { e: Event }) => void`<br/>选中值发生变化时触发 | N

### RadioGroup Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: RadioValue, context: { e: Event })` | 选中值发生变化时触发
