:: BASE_DOC ::

## API
### Image Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
alt | String | - | 图片描述 | N
error | String / Slot / Function | - | 自定义图片加载失败状态下的显示内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
fit | String | fill | 图片填充模式。可选项：contain/cover/fill/none/scale-down | N
lazy | Boolean | false | 是否开启图片懒加载 | N
loading | String / Slot / Function | - | 自定义加载中状态的图片内容，如：“加载中”。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
position | String | center | 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何单位，px 或者 百分比 | N
shape | String | square | 图片圆角类型。可选项：circle/round/square | N
src | String | - | 图片链接 | N
srcset | Object | - | 图片地址，支持特殊格式的图片，如 `.avif` 和 `.webp`。TS 类型：`ImageSrcset` `interface ImageSrcset { 'image/avif': string; 'image/webp': string; }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/image/type.ts) | N
onError | Function |  | TS 类型：`(context: { e: ImageEvent }) => void`<br/>图片加载失败时触发 | N
onLoad | Function |  | TS 类型：`(context: { e: ImageEvent }) => void`<br/>图片加载完成时触发 | N

### Image Events

名称 | 参数 | 描述
-- | -- | --
error | `(context: { e: ImageEvent })` | 图片加载失败时触发
load | `(context: { e: ImageEvent })` | 图片加载完成时触发


### CSS Variables
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-image-color | @font-gray-3 | - 
--td-image-loading-bg-color | @bg-color-secondarycontainer | - 
--td-image-loading-color | @font-gray-3 | - 
--td-image-round-radius | @radius-default | - 
