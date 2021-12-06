# Switch 开关

定义：控制某个功能的开启和关闭

## 组件类型

在TDesign中，拥有两种不同类型的开关：基础开关、带描述开关

### 基础开关

使用场景：不需要通过文案强调开关状态时，可用基础开关

::: demo demos/index
:::

### 带描述开关

使用场景：需要通过描述解释、提示结果时，可用带描述开关

::: demo demos/desc
:::

## 组件样式

### 禁用状态

::: demo demos/disabled
:::

## API

### Switch Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
customValue | Array | - | 开关内容，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]。TS 类型：`Array<SwitchValue>` | N
disabled | Boolean | false | 是否禁用组件 | N
label | Array / Slot / Function | [] | 开关内容，[开启时内容，关闭时内容]。示例：['开', '关'] 或 (value) => value ? '开' : '关'。TS 类型：`Array<string | TNode> | TNode<{ value: SwitchValue }>`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
loading | Boolean | false | 是否处于加载中状态 | N
size | String | medium | 开关尺寸。可选项：small/medium/large | N
value | String / Number / Boolean | false | 开关值。支持语法糖。TS 类型：`SwitchValue`。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
defaultValue | String / Number / Boolean | false | 开关值。非受控属性。TS 类型：`SwitchValue`。[详细类型定义](/tdesign-mobile-vue/tree/develop/src/switch/type.ts) | N
onChange | Function |  | 数据发生变化时触发。`(value: SwitchValue) => {}` | N

### Switch Events
名称 | 参数 | 描述
-- | -- | --
change | `(value: SwitchValue)` | 数据发生变化时触发
