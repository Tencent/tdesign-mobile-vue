:: BASE_DOC ::

## API
### Overlay Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
duration | Number | 300 | 动画时长，单位毫秒 | N
preventScrollThrough | Boolean | true | 防止滚动穿透 | N
transparent | Boolean | false | 遮罩层是否透明 | N
visible | Boolean | true | 必需。是否展示 | Y
zIndex | Number | 1000 | 遮罩的层级 | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>遮罩层的点击事件 | N

### Overlay Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 遮罩层的点击事件
