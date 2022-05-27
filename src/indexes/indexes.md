:: BASE_DOC ::

## API
### Indexes Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
height | Number | - | 列表高度，未设置默认占满设备高度 | N
list | Array | [] | 必需。索引列表的列表数据。每个元素包含三个子元素，index(string)：索引值，例如1，2，3，...或A，B，C等；title(string): 索引标题，可不填将默认设为索引值；children(Array<{title: string}>): 子元素列表，title为子元素的展示文案。。TS 类型：`ListItem[] ` `interface ListItem { title: string;  index: string;  children: { title: string; [key: string]: any} [] }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/indexes/type.ts) | Y
sticky | Boolean | true | 索引是否吸顶，默认为true。TS 类型：`Boolean` | N
onSelect | Function |  | TS 类型：`(indexes: { groupIndex: string; childrenIndex: number }) => void`<br/>点击行元素时触发事件 | N

### Indexes Events

名称 | 参数 | 描述
-- | -- | --
select | `(indexes: { groupIndex: string; childrenIndex: number })` | 点击行元素时触发事件
