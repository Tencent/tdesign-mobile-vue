:: BASE_DOC ::

## API
### Navbar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
animation | Boolean | true | 是否添加动画效果 | N
background | String | - | 已废弃。背景 | N
capsule | Slot / Function | - | 左侧胶囊区域。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
fixed | Boolean | true | 是否固定在顶部 | N
left | String / Slot / Function | - | 左侧区域。值为 `string` 表示文本，为其他表示自定义内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
leftArrow | Boolean | false | 是否展示左侧箭头 | N
right | String / Slot / Function | - | 右侧区域。值为 `string` 表示文本，为其他表示自定义内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | 页面标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
titleMaxLength | Number | - | 标题文字最大长度，超出的范围使用 `...` 表示 | N
visible | Boolean | true | 是否显示 | N
onLeftClick | Function |  | TS 类型：`() => void`<br/>点击左侧区域时触发 | N
onRightClick | Function |  | TS 类型：`() => void`<br/>点击右侧区域时触发 | N

### Navbar Events

名称 | 参数 | 描述
-- | -- | --
left-click | \- | 点击左侧区域时触发
right-click | \- | 点击右侧区域时触发
