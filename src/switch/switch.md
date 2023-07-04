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
