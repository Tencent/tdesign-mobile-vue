:: BASE_DOC ::

## API
### ImageViewer Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closeBtn | Boolean / Slot / Function | true | 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
deleteBtn | Boolean / Slot / Function | false | 是否显示删除操作，前提需要开启页码。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
images | Array | [] | 图片数组。TS 类型：`Array<string>` | N
index | Number | - | 当前预览图片所在的下标。支持语法糖 `v-model:index` | N
defaultIndex | Number | - | 当前预览图片所在的下标。非受控属性 | N
maxZoom | Number | 3 | 【开发中】最大放大比例。TS 类型：`Number` | N
showIndex | Boolean | false | 是否显示页码 | N
visible | Boolean | false | 隐藏/显示预览。支持语法糖 `v-model` 或 `v-model:visible` | N
onClose | Function |  | TS 类型：`(context: { trigger: 'overlay' \| 'close-btn', visible: Boolean, index: Number }) => void`<br/>关闭时触发 | N
onDelete | Function |  | TS 类型：`(index: Number) => void`<br/>点击删除操作按钮时触发 | N
onIndexChange | Function |  | TS 类型：`(index: number, context: { trigger: 'prev' \| 'next' }) => void`<br/>预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片 | N

### ImageViewer Events

名称 | 参数 | 描述
-- | -- | --
close | `(context: { trigger: 'overlay' \| 'close-btn', visible: Boolean, index: Number })` | 关闭时触发
delete | `(index: Number)` | 点击删除操作按钮时触发
index-change | `(index: number, context: { trigger: 'prev' \| 'next' })` | 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片
