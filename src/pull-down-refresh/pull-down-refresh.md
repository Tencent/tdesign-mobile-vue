:: BASE_DOC ::

## API

### PullDownRefresh Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
loadingBarHeight | Number | 200 | 加载中下拉高度 | N
loadingProps | Object | - | 加载loading样式。TS 类型：`TdLoadingProps`，[Loading API Documents](./loading?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/pull-down-refresh/type.ts) | N
loadingTexts | Array | [] | 提示语，组件内部默认值为 ['下拉刷新', '松手刷新', '正在刷新', '刷新完成']。TS 类型：`string[]` | N
maxBarHeight | Number | 272 | 最大下拉高度 | N
refreshTimeout | Number | 3000 | 刷新超时时间 | N
onRefresh | Function |  | TS 类型：`() => void`<br/>结束下拉时触发 | N
onTimeout | Function |  | TS 类型：`() => void`<br/>刷新超时触发 | N

### PullDownRefresh Events

名称 | 参数 | 描述
-- | -- | --
refresh | - | 结束下拉时触发
timeout | - | 刷新超时触发
