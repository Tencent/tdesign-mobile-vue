:: BASE_DOC ::

## API
### NoticeBar Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
bgColor | String | - | 背景色 | N
color | String | - | 文本颜色 | N
content | String | - | 文本内容 | N
delay | Number | 0 | 延迟显示，单位：毫秒 | N
detailText | String | - | 详情 | N
detailTextColor | String | - | 详情颜色 | N
iconColor | String | - | 图标颜色 | N
leftIcon | Slot / Function | - | 左边图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
mode | String | - | 模式。可选项：link/closeable | N
rightIcon | Slot / Function | - | 左边图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
scrollable | Boolean | - | 是否需要滚动 | N
speed | Number | 50 | 滚动速度 | N
onClick | Function |  | TS 类型：`() => void`<br/>点击事件 | N
onClose | Function |  | TS 类型：`() => void`<br/>关闭 | N
onDetail | Function |  | TS 类型：`() => void`<br/>详情点击 | N

### NoticeBar Events

名称 | 参数 | 描述
-- | -- | --
click | - | 点击事件
close | - | 关闭
detail | - | 详情点击
