:: BASE_DOC ::

## API
### Indexes Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
indexList | Array | - | 索引字符列表。不传默认 `A-Z`。TS 类型：`string [] \| number[]` | N
sticky | Boolean | true | 索引是否吸顶，默认为true。TS 类型：`Boolean` | N
stickyOffset | Number | 0 | 锚点吸顶时与顶部的距离	 | N
onChange | Function |  | TS 类型：`(index: string \| number) => void`<br/>索引发生变更时触发事件 | N
onSelect | Function |  | TS 类型：`(index: string \| number) => void`<br/>点击侧边栏时触发事件 | N

### Indexes Events

名称 | 参数 | 描述
-- | -- | --
change | `(index: string \| number)` | 索引发生变更时触发事件
select | `(index: string \| number)` | 点击侧边栏时触发事件

### IndexesAnchor Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
index | String / Number | - | 索引字符 | N
