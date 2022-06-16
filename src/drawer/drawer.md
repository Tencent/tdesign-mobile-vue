:: BASE_DOC ::

## API
### Drawer Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | '' | 抽屉挂载的节点，默认挂在组件本身的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
cancelBtn | String / Object / Slot / Function | '' | 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件。TS 类型：`FooterButton` | N
closeBtn | String / Boolean / Slot / Function | true | 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例。TS 类型：`string | boolean | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
closeOnOverlayClick | Boolean | true | 点击蒙层时是否触发抽屉关闭事件 | N
confirmBtn | String / Object / Slot / Function | '' | 确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件。TS 类型：`FooterButton` `type FooterButton = string | ButtonProps | TNode`，[Button API Documents](./button?tab=api)。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/drawer/type.ts) | N
destroyOnClose | Boolean | false | 抽屉关闭时是否销毁节点 | N
items | Array | - | 抽屉里的列表项。TS 类型：`DrawerItem[] ` `interface DrawerItem { title: string; icon: TNode; }`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/drawer/type.ts) | N
mode | String | overlay | 展开方式，有两种：直接展示在内容上方 和 推开内容区域。可选项：overlay/push | N
placement | String | right | 抽屉方向。可选项：left/right/top/bottom | N
showInAttachedElement | Boolean | false | 仅在挂载元素中显示抽屉，默认在浏览器可视区域显示。父元素需要有定位属性，如：position: relative | N
showOverlay | Boolean | true | 是否显示遮罩层 | N
size | String | small | 尺寸，支持 'small', 'medium', 'large'，'35px', '30%',  '3em' 等。纵向抽屉调整的是抽屉宽度，横向抽屉调整的是抽屉高度 | N
visible | Boolean | false | 组件是否可见 | N
zIndex | Number | - | 抽屉层级，样式默认为 1500 | N
onClose | Function |  | TS 类型：`(context: DrawerCloseContext) => void`<br/>关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent | KeyboardEvent }`<br/> | N
onItemClick | Function |  | TS 类型：`( index: number, item: DrawerItem, context: { e: MouseEvent }) => void`<br/>点击抽屉里的列表项 | N
onOverlayClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>如果蒙层存在，点击蒙层时触发 | N

### Drawer Events

名称 | 参数 | 描述
-- | -- | --
close | `(context: DrawerCloseContext)` | 关闭事件，取消按钮点击时、关闭按钮点击时、ESC 按下时、点击蒙层时均会触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/drawer/type.ts)。<br/>`type DrawerEventSource = 'esc' | 'close-btn' | 'cancel' | 'overlay'`<br/><br/>`interface DrawerCloseContext { trigger: DrawerEventSource; e: MouseEvent | KeyboardEvent }`<br/>
item-click | `( index: number, item: DrawerItem, context: { e: MouseEvent })` | 点击抽屉里的列表项
overlay-click | `(context: { e: MouseEvent })` | 如果蒙层存在，点击蒙层时触发
