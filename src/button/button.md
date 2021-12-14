# Button 按钮

定义：按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。

## 组件类型

在TDesign中，拥有 3 种不同形式的按钮：基础按钮、图标按钮、吸底按钮。

### 基础按钮

基础类型分为主按钮、次按钮、文字按钮。

#### 次按钮

使用场景：在用户进行的操作为流程中的辅助操作，或者进行不那么重要的交互行为时，选择用次按钮；次要按钮通常和主要按钮一起出现

#### 主按钮

使用场景：大部分场景都可以使用，例如反馈页、表单页、对话框，一个页面建议最多只出现一个主按钮；

#### 文字按钮

使用场景：它的操作通常和其旁边内容相关，通常出现在标题旁、字段旁、列表最下方


::: demo demos/index
:::

### 图标按钮

图标按钮分为图标加文字形式、纯图标形式

使用场景：希望增加按钮识别性，图标表意需贴合文字内容；纯icon图标建议只使用已有一定认知共识的操作上

::: demo demos/icon
:::

### 置底按钮

图标按钮可以分为单按钮形式，主次组合按钮形式，多个文字按钮组合形式

使用场景：用于用户在浏览过程中可随时触发的操作，常见于长信息、表单页


## 组件样式

### 尺寸

提供大、中、小 3 种不同大小按钮

::: demo demos/size
:::

### 形状

提供小、无、大 3 种不同的圆角

::: demo demos/shape
:::

## 组件使用

### 使用规范

（1）主按钮通常单独使用，是页面里的最主要的视觉焦点，在一个页面中，建议最多只出现一个主按钮

（2）纯icon图标建议只使用已有一定认知共识的操作上

### 正确/错误范例

（1）用户在使用主要按钮次要按钮，需要表达主次关系，不建议同时使用多个主按钮

::: demo demos/test
:::

## API

### Button Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
block | Boolean | false | 是否为块级元素 | N
content | String / Slot / Function | - | 按钮内容。TS 类型：`string | TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
disabled | Boolean | false | 是否禁用按钮 | N
ghost | Boolean | false | 是否为幽灵按钮（镂空按钮） | N
icon | Slot / Function | - | 按钮内部图标，可完全自定义。TS 类型：`TNode`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
loading | Boolean | false | 是否显示为加载状态 | N
shape | String | square | 按钮形状，有二种：方形、圆角方形。可选项：square/round | N
size | String | medium | 组件尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](/tdesign-mobile-vue/blob/develop/src/common.ts) | N
theme | String | undefined | 组件风格，依次为品牌色、危险色。可选项：default/primary/danger | N
variant | String | base | 按钮形式，基础、线框、文字。可选项：base/outline/text | N
