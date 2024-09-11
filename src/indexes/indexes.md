:: BASE_DOC ::

## API

### Indexes Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
indexList | Array | - | 索引字符列表。不传默认 `A-Z`。TS 类型：`Array<string \| number>` | N
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

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
index | String / Number | - | 索引字符 | N

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-indexes-sidebar-active-bg-color | @brand-color | - 
--td-indexes-sidebar-active-color | @font-white-1 | - 
--td-indexes-sidebar-color | @font-gray-1 | - 
--td-indexes-sidebar-font-size | 12px | - 
--td-indexes-sidebar-item-size | 20px | - 
--td-indexes-sidebar-line-height | 20px | - 
--td-indexes-sidebar-right | 8px | - 
--td-indexes-sidebar-tips-bg-color | @brand-color-light | - 
--td-indexes-sidebar-tips-color | @brand-color | - 
--td-indexes-sidebar-tips-font-size | 20px | - 
--td-indexes-sidebar-tips-right | 38px | - 
--td-indexes-sidebar-tips-size | 48px | - 
--td-indexes-anchor-active-bg-color | @bg-color-container | - 
--td-indexes-anchor-active-color | @brand-color | - 
--td-indexes-anchor-active-font-weight | 600 | - 
--td-indexes-anchor-bg-color | @bg-color-secondarycontainer | - 
--td-indexes-anchor-color | @font-gray-1 | - 
--td-indexes-anchor-font-size | 14px | - 
--td-indexes-anchor-line-height | 22px | -