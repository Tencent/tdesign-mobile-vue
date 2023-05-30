:: BASE_DOC ::

## API
### Checkbox Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
block | Boolean | true | 是否为块级元素 | N
checkAll | Boolean | false | 用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用 | N
checked | Boolean | false | 是否选中。支持语法糖 `v-model` 或 `v-model:checked` | N
defaultChecked | Boolean | false | 是否选中。非受控属性 | N
content | String / Slot / Function | - | 多选框内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
contentDisabled | Boolean | - | 是否禁用组件内容（content）触发选中 | N
default | String / Slot / Function | - | 多选框内容，同 label。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | undefined | 是否禁用组件。如果父组件存在 CheckboxGroup，默认值由 CheckboxGroup.disabled 控制。Checkbox.disabled 优先级高于 CheckboxGroup.disabled | N
icon | String / Boolean / Array | 'circle' | 自定义选中图标和非选中图标。使用 Array 时表示：[选中态图标，非选中态图标]。使用 String 时，值为 circle 表示填充圆形图标、值为 line 表示描边型图标、值为 rectangle 表示填充矩形图标。。TS 类型：`'circle' \| 'line' \| 'rectangle' \| boolean \| Array<TNode \| String>`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
indeterminate | Boolean | false | 是否为半选 | N
label | String / Slot / Function | - | 主文案。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
maxContentRow | Number | 5 | 内容最大行数限制 | N
maxLabelRow | Number | 3 | 主文案最大行数限制 | N
name | String | - | HTML 元素原生属性 | N
placement | String | left | 多选框和内容相对位置。可选项：left/right | N
readonly | Boolean | false | 只读状态 | N
value | String / Number / Boolean | - | 多选框的值。TS 类型：`string \| number \| boolean` | N
onChange | Function |  | TS 类型：`(checked: boolean, context: { e: Event }) => void`<br/>值变化时触发 | N

### Checkbox Events

名称 | 参数 | 描述
-- | -- | --
change | `(checked: boolean, context: { e: Event })` | 值变化时触发

### CheckboxGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | - | 是否禁用组件，默认为 false。CheckboxGroup.disabled 优先级低于 Checkbox.disabled | N
max | Number | undefined | 支持最多选中的数量 | N
name | String | - | 统一设置内部复选框 HTML 属性 | N
options | Array | - | 以配置形式设置子元素。示例1：`['北京', '上海']` ，示例2: `[{ label: '全选', checkAll: true }, { label: '上海', value: 'shanghai' }]`。checkAll 值为 true 表示当前选项为「全选选项」。TS 类型：`Array<CheckboxOption>` `type CheckboxOption = string \| number \| CheckboxOptionObj` `interface CheckboxOptionObj extends TdCheckboxProps { text?: string; }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts) | N
value | Array | [] | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts) | N
defaultValue | Array | [] | 选中值。非受控属性。TS 类型：`T` `type CheckboxGroupValue = Array<string \| number \| boolean>`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts) | N
onChange | Function |  | TS 类型：`(value: T, context: CheckboxGroupChangeContext) => void`<br/>值变化时触发。`context.current` 表示当前变化的数据项，如果是全选则为空；`context.type` 表示引起选中数据变化的是选中或是取消选中，`context.option` 表示当前变化的数据项。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts)。<br/>`interface CheckboxGroupChangeContext { e: Event; current: string \| number; option: CheckboxOption \| TdCheckboxProps; type: 'check' \| 'uncheck' }`<br/> | N

### CheckboxGroup Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: T, context: CheckboxGroupChangeContext)` | 值变化时触发。`context.current` 表示当前变化的数据项，如果是全选则为空；`context.type` 表示引起选中数据变化的是选中或是取消选中，`context.option` 表示当前变化的数据项。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/checkbox/type.ts)。<br/>`interface CheckboxGroupChangeContext { e: Event; current: string \| number; option: CheckboxOption \| TdCheckboxProps; type: 'check' \| 'uncheck' }`<br/>
