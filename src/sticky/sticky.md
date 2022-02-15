:: BASE_DOC ::

## API
### Sticky Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
container | Object | - | 指定容器对应的NodesRef节点为组件的外部容器，滚动时组件会始终保持在容器范围内，当组件即将超出容器底部时，会返回原位置。。TS 类型：`Element` | N
disabled | Boolean | false | 是否禁用组件 | N
offsetTop | Number | 0 | 吸顶时与顶部的距离，单位`px` | N
zIndex | Number | 99 | 吸顶时的 z-index | N
onScroll | Function |  | TS 类型：`(context: { scrollTop: number, isFixed: boolean }) => void`<br/>滚动时触发，scrollTop: 距离顶部位置，isFixed: 是否吸顶。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N

### Sticky Events

名称 | 参数 | 描述
-- | -- | --
scroll | `(context: { scrollTop: number, isFixed: boolean })` | 滚动时触发，scrollTop: 距离顶部位置，isFixed: 是否吸顶。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts)
