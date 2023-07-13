:: BASE_DOC ::

## API
### Overlay Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
backgroundColor | String | - | 遮罩层的背景色	 | N
customStyle | String | - | 遮罩层自定义样式。优先级低于其他属性 | N
duration | Number | 300 | 背景色过渡时间，单位毫秒 | N
preventScrollThrough | Boolean | true | 是否阻止背景滚动，阻止时蒙层里的内容也将无法滚动 | N
visible | Boolean | false | 是否展示 | N
zIndex | Number | 1000 | 遮罩的层级 | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>遮罩层的点击事件 | N

### Overlay Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 遮罩层的点击事件


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-overlay-bg-color | @font-gray-1 | - 
--td-overlay-transition-duration | 300ms | - 
--td-overlay-zindex | 1000 | - 
