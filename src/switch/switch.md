:: BASE_DOC ::

## API
### Switch Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
colors | Array | - | 自定义颜色，[打开时的颜色，关闭时的颜色]。组件默认颜色为 ['#0052d9', 'rgba(0, 0, 0, .26']。示例：[blue, gray]。TS 类型：`string[]` | N
customValue | Array | - | 开关内容，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]。TS 类型：`Array<SwitchValue>` | N
disabled | Boolean | false | 是否禁用组件 | N
label | String | '' | 开关的标签 | N
value | String / Number / Boolean | undefined | 开关值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`SwitchValue` `type SwitchValue = string | number | boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | undefined | 开关值。非受控属性。TS 类型：`SwitchValue` `type SwitchValue = string | number | boolean`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
onChange | Function |  | TS 类型：`(value: SwitchValue) => void`<br/>数据发生变化时触发 | N

### Switch Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: SwitchValue)` | 数据发生变化时触发
