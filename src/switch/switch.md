:: BASE_DOC ::

## API
### Switch Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
customValue | Array | - | 用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、['open', 'close']。TS 类型：`Array<SwitchValue>` | N
disabled | Boolean | - | 是否禁用组件，默认为 false | N
icon | Array | [] | 开关的图标；[打开时的图标，关闭时的图标]。TS 类型：`TNode[]`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
label | Array | [] | 开关的标签；[打开时的标签，关闭时的标签]。TS 类型：`string[]` | N
loading | Boolean | false | 是否处于加载中状态 | N
size | String | medium | 开关尺寸。可选项：small/medium/large | N
value | String / Number / Boolean | - | 开关值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`T` `type SwitchValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | - | 开关值。非受控属性。TS 类型：`T` `type SwitchValue = string \| number \| boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
onChange | Function |  | TS 类型：`(value: T, context: { e: MouseEvent }) => void`<br/>数据发生变化时触发 | N

### Switch Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: T, context: { e: MouseEvent })` | 数据发生变化时触发


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-switch-checked-color | @brand-color | - 
--td-switch-checked-disabled-color | @brand-color-disabled | - 
--td-switch-dot-border-color | @bg-color-secondarycontainer | - 
--td-switch-dot-horizontal-margin | 3px | - 
--td-switch-dot-large-size | 26px | - 
--td-switch-dot-plain-horizontal-margin | 5px | - 
--td-switch-dot-plain-large-size | 22px | - 
--td-switch-dot-plain-size | 18px | - 
--td-switch-dot-plain-small-size | 14px | - 
--td-switch-dot-shadow | @shadow-1 | - 
--td-switch-dot-size | 22px | - 
--td-switch-dot-small-size | 18px | - 
--td-switch-height | 28px | - 
--td-switch-icon-large-size | 24px | - 
--td-switch-icon-size | 20px | - 
--td-switch-icon-small-size | 16px | - 
--td-switch-label-checked-color | @switch-checked-color | - 
--td-switch-label-color | @font-gray-4 | - 
--td-switch-large-height | 32px | - 
--td-switch-large-radius | calc(@switch-large-height / 2) | - 
--td-switch-large-width | 52px | - 
--td-switch-radius | calc(@switch-height / 2) | - 
--td-switch-small-height | 24px | - 
--td-switch-small-radius | calc(@switch-small-height / 2) | - 
--td-switch-small-width | 39px | - 
--td-switch-unchecked-color | @font-gray-4 | - 
--td-switch-unchecked-disabled-color | @bg-color-component-disabled | - 
--td-switch-width | 45px | - 
--td-swtich-label-font-size | 12px | - 
--td-swtich-label-font-size | 14px | - 
--td-swtich-label-font-size | 16px | - 
