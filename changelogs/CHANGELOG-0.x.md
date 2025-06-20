---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

## 🌈 0.26.0 `2023-06-20` 
### 🚨 Breaking Changes
- `NavBar`: 调整布局方式 @LeeJim ([#871](https://github.com/Tencent/tdesign-mobile-vue/pull/871))
### 🚀 Features
- `Textarea`: 新增 `layout` 属性 @anlyyao ([#879](https://github.com/Tencent/tdesign-mobile-vue/pull/879))
- `Input`: 新增 `borderless` 属性 @anlyyao ([#877](https://github.com/Tencent/tdesign-mobile-vue/pull/877))
- `Button`: 增加幽灵按钮的点击样式 @LeeJim ([#883](https://github.com/Tencent/tdesign-mobile-vue/pull/883))
- `Rate`: 增加组件禁用态样式 @anlyyao ([#887](https://github.com/Tencent/tdesign-mobile-vue/pull/887))
- `Table`:  新增 `loadingProps` 属性 @anlyyao ([#884](https://github.com/Tencent/tdesign-mobile-vue/pull/884))
### 🐞 Bug Fixes
- `DateTimePicker`:
  - 修复 `value` 无法动态响应的问题 @LeeJim ([#869](https://github.com/Tencent/tdesign-mobile-vue/pull/869))
  - 修复 `mode` 使用时分秒时错误的问题 @LeeJim ([#869](https://github.com/Tencent/tdesign-mobile-vue/pull/869))
- `Grid`: 修复组件上下边距及水平滚动时字号错误 @anlyyao ([#867](https://github.com/Tencent/tdesign-mobile-vue/pull/867))
- `Loading`: 修复示例样式问题 @anlyyao ([#866](https://github.com/Tencent/tdesign-mobile-vue/pull/866))
- `Slider`: 修复 `change` 事件重复触发的问题 @LeeJim ([#864](https://github.com/Tencent/tdesign-mobile-vue/pull/864))
- `ActionSheet`: 修复 `items` 项数小于 `count` 时，`selected `事件返回值错误 @anlyyao ([#870](https://github.com/Tencent/tdesign-mobile-vue/pull/870))
- `Textarea`: 修复 `label` 标签字号错误 @anlyyao ([#879](https://github.com/Tencent/tdesign-mobile-vue/pull/879))
- `Input`:
  - 修复禁用态输入框文本颜色错误 @anlyyao ([#877](https://github.com/Tencent/tdesign-mobile-vue/pull/877))
  - 修复垂直布局时 `label` 下边距错误 @anlyyao ([#877](https://github.com/Tencent/tdesign-mobile-vue/pull/877))
  - 修复示例样式问题 @anlyyao ([#877](https://github.com/Tencent/tdesign-mobile-vue/pull/877))
- `Form`:
  - 修复 `FormRule`  中 `type` 属性无效的问题 @anlyyao ([#876](https://github.com/Tencent/tdesign-mobile-vue/pull/876))
  - 修复 `expose` 中的 `submit` 和 `reset` 事件报错 @anlyyao ([#876](https://github.com/Tencent/tdesign-mobile-vue/pull/876))
  - 修复文档 `labelWidth` 属性默认值错误 @anlyyao ([#876](https://github.com/Tencent/tdesign-mobile-vue/pull/876))
- `Radio`: 修复 `placement` 错误的问题 @LeeJim ([#882](https://github.com/Tencent/tdesign-mobile-vue/pull/882))
- `Table`:
  - 修复边框和字号错误 @anlyyao ([#880](https://github.com/Tencent/tdesign-mobile-vue/pull/880))
  - 修复 `loading` 属性无效的问题 @anlyyao ([#884](https://github.com/Tencent/tdesign-mobile-vue/pull/884))
- `Button`: 移除禁用态的点击样式 @LeeJim ([#883](https://github.com/Tencent/tdesign-mobile-vue/pull/883))
- `SideBar`: 修复示例错误 @ccccpj ([#886](https://github.com/Tencent/tdesign-mobile-vue/pull/886))
- `Image`: 修复 `error` 默认值失效 @anlyyao ([#885](https://github.com/Tencent/tdesign-mobile-vue/pull/885))
### 🚧 Others
- `fix`: 优化多个示例页面切换问题 @LeeJim ([#890](https://github.com/Tencent/tdesign-mobile-vue/pull/890))
- `DateTimePicker`: 提升测试覆盖率 @LeeJim ([#869](https://github.com/Tencent/tdesign-mobile-vue/pull/869))
- `Slider`: 提升测试覆盖率 @LeeJim ([#864](https://github.com/Tencent/tdesign-mobile-vue/pull/864))
- `ActionSheet`: 补充测试用例 @anlyyao ([#870](https://github.com/Tencent/tdesign-mobile-vue/pull/870))
- `Dialog`: 补充测试用例 @anlyyao ([#872](https://github.com/Tencent/tdesign-mobile-vue/pull/872))
- `Cascader`: 补充测试用例 @anlyyao ([#874](https://github.com/Tencent/tdesign-mobile-vue/pull/874))
- `Tabs`:
  - 补充测试用例 @ChaneyZhao ([#822](https://github.com/Tencent/tdesign-mobile-vue/pull/822))
  - 提升测试覆盖率 @ccccpj ([#865](https://github.com/Tencent/tdesign-mobile-vue/pull/865))
- `Form`: 补充测试用例 @anlyyao ([#876](https://github.com/Tencent/tdesign-mobile-vue/pull/876))
- `Table`: 更新示例 @anlyyao ([#880](https://github.com/Tencent/tdesign-mobile-vue/pull/880))
- `ImageViewer`: 补充测试用例 @ccccpj ([#861](https://github.com/Tencent/tdesign-mobile-vue/pull/861))
- `DropdownMenu`: 补充测试用例 @ccccpj ([#868](https://github.com/Tencent/tdesign-mobile-vue/pull/868))
- `Image`: 更新示例代码 @anlyyao ([#885](https://github.com/Tencent/tdesign-mobile-vue/pull/885))
- `Form`: 更新示例代码 @anlyyao ([#887](https://github.com/Tencent/tdesign-mobile-vue/pull/887))
- `Indexes`: 补充测试用例 @ccccpj ([#881](https://github.com/Tencent/tdesign-mobile-vue/pull/881))
- `Table`: 补充单元测试 @anlyyao ([#884](https://github.com/Tencent/tdesign-mobile-vue/pull/884))

## 🌈 0.25.0 `2023-06-13` 
### 🚨 Breaking Changes
- `Swiper`:
  - 调整 `DOM` @LeeJim ([#845](https://github.com/Tencent/tdesign-mobile-vue/pull/845))
  - 属性 `paginationPosition` 移至属性 `navigation` 下 @LeeJim ([#845](https://github.com/Tencent/tdesign-mobile-vue/pull/845))
  - 属性 `navigation` 内部值发生变更 @LeeJim ([#845](https://github.com/Tencent/tdesign-mobile-vue/pull/845))
- `GridItem`: 调整 `DOM` 结构 @anlyyao ([#854](https://github.com/Tencent/tdesign-mobile-vue/pull/854))
- `DateTimePicker`: 调整 `DOM` 结构 @anlyyao ([#852](https://github.com/Tencent/tdesign-mobile-vue/pull/852))
### 🚀 Features
- `SideBar`: 新增侧边导航组件 @anlyyao ([#855](https://github.com/Tencent/tdesign-mobile-vue/pull/855))
- `DropdownMenu`: 新增 `menuOpened`、`menuClosed` 事件 @anlyyao ([#837](https://github.com/Tencent/tdesign-mobile-vue/pull/837))
- `Swiper`:
  - 新增 `click` 事件 @LeeJim ([#845](https://github.com/Tencent/tdesign-mobile-vue/pull/845))
  - `height` 属性支持 `string` 类型 @anlyyao ([#858](https://github.com/Tencent/tdesign-mobile-vue/pull/858))
### 🐞 Bug Fixes
- `Popup`: 修复弹出层内容无法滚动的问题  @anlyyao ([#834](https://github.com/Tencent/tdesign-mobile-vue/pull/834))
- `Tabs`:
  - 修复纵向 `touch` 也会触发tabs切换的问题  @ccccpj ([#836](https://github.com/Tencent/tdesign-mobile-vue/pull/836))
  - 修复字号尺寸错误 @anlyyao ([#1386](https://github.com/Tencent/tdesign-common/pull/1386))
- `Switch`:
  - 修复 `loading` 态背景色错误 @anlyyao ([#841](https://github.com/Tencent/tdesign-mobile-vue/pull/841))
  - 修复 `loading` 态仍能点击的问题 @anlyyao ([#841](https://github.com/Tencent/tdesign-mobile-vue/pull/841))
- `DropdownMenu`:
  - 修复 `closeOnClickOverlay` 属性无效的问题 @ccccpj ([#851](https://github.com/Tencent/tdesign-mobile-vue/pull/851))
  - 修复 `options` 初始值不能为空 @ccccpj ([#851](https://github.com/Tencent/tdesign-mobile-vue/pull/851))
  - 修复 `expose` 产生的告警问题 @ccccpj ([#851](https://github.com/Tencent/tdesign-mobile-vue/pull/851))
  - 修复示例字号及按钮样式错误 @ccccpj ([#848](https://github.com/Tencent/tdesign-mobile-vue/pull/848))
- `GridItem`: 修复 `Image` 属性不支持 `Function` 类型 @anlyyao ([#854](https://github.com/Tencent/tdesign-mobile-vue/pull/854))
- `ActionSheet`:
  - 修复禁用态背景色错误 @anlyyao ([#854](https://github.com/Tencent/tdesign-mobile-vue/pull/854))
  - 修复示例占位图错误 @anlyyao ([#854](https://github.com/Tencent/tdesign-mobile-vue/pull/854))
- `DateTimePicker`:
  - 修复初始值不能为空的问题 @anlyyao ([#852](https://github.com/Tencent/tdesign-mobile-vue/pull/852))
  - 修复选中文本和弹窗面板圆角样式错误 @anlyyao ([#852](https://github.com/Tencent/tdesign-mobile-vue/pull/852))
- `Dialog`: 修复弹窗圆角、标题行高样式错误  @anlyyao ([#1393](https://github.com/Tencent/tdesign-common/pull/1393))
- `Picker`: 修复选中文本样式错误 @anlyyao ([#852](https://github.com/Tencent/tdesign-mobile-vue/pull/852))
- `Textarea`: 解决 `autoSize` 动态修改输入值时未生效问题 @ccccpj ([#859](https://github.com/Tencent/tdesign-mobile-vue/pull/859))
- `ImageViewer`: 修复图片预览显示不全的问题 @anlyyao ([#858](https://github.com/Tencent/tdesign-mobile-vue/pull/858))
- `Empty`: 移除无效的示例 @anlyyao ([#827](https://github.com/Tencent/tdesign-mobile-vue/pull/827))
- `Tag`: 修复示例文案错误 @Resuragam ([#842](https://github.com/Tencent/tdesign-mobile-vue/pull/842))
- `Result`: 修复示例间距样式 @Resuragam ([#844](https://github.com/Tencent/tdesign-mobile-vue/pull/844))
- `Footer`:
  - 修复分割线尺寸错误并移除下划线样式 @anlyyao ([#1384](https://github.com/Tencent/tdesign-common/pull/1384))
  - 更新示例代码 @anlyyao ([#829](https://github.com/Tencent/tdesign-mobile-vue/pull/829))
- `Steps`: 修复标题换行和不换行均存在时，步骤条图标对齐问题 @Resuragam ([#1388](https://github.com/Tencent/tdesign-common/pull/1388))
- `BackTop`: 修复边框颜色错误 @anlyyao ([#1367](https://github.com/Tencent/tdesign-common/pull/1367))
### 🚧 Others
- `Footer`: 补充测试用例 @engvuchen ([#849](https://github.com/Tencent/tdesign-mobile-vue/pull/849))
- `Swiper`: 补充单元测试 @LeeJim ([#845](https://github.com/Tencent/tdesign-mobile-vue/pull/845))
- `Collapse`: 补充测试用例 @ccccpj ([#846](https://github.com/Tencent/tdesign-mobile-vue/pull/846))
- `NoticeBar`: 补充测试用例 @ccccpj ([#840](https://github.com/Tencent/tdesign-mobile-vue/pull/840))
- `Cell`: 补充测试用例 @ccccpj ([#832](https://github.com/Tencent/tdesign-mobile-vue/pull/832))
- `Avatar`: 补充测试用例 @ccccpj ([#830](https://github.com/Tencent/tdesign-mobile-vue/pull/830))
- `SwipeCell`: 补充测试用例 @nined9 ([#828](https://github.com/Tencent/tdesign-mobile-vue/pull/828))
- `Drawer`: 补充测试用例 @anlyyao ([#850](https://github.com/Tencent/tdesign-mobile-vue/pull/850))
- `Grid`: 补充测试用例 @Resuragam ([#838](https://github.com/Tencent/tdesign-mobile-vue/pull/838))
- `Calendar`: 补充测试用例 @ccccpj ([#831](https://github.com/Tencent/tdesign-mobile-vue/pull/831))
- `TabBar`: 补充测试用例 @LeeJim ([#860](https://github.com/Tencent/tdesign-mobile-vue/pull/860))

## 🌈 0.24.0 `2023-06-06` 
### 🚨 Breaking Changes
- `Fab`: 调整 `DOM` @anlyyao ([#773](https://github.com/Tencent/tdesign-mobile-vue/pull/773))
### 🐞 Bug Fixes
- `Popup`:
  - 解决使用 `closeBtn` 插槽时关闭无效的问题 @anlyyao ([#753](https://github.com/Tencent/tdesign-mobile-vue/pull/753))
  - 修复 `preventScrollThrough` 属性无效的问题 @anlyyao ([#824](https://github.com/Tencent/tdesign-mobile-vue/pull/824))
- `Search`: 修复 `leftIcon` 插槽无效的问题 @anlyyao ([#742](https://github.com/Tencent/tdesign-mobile-vue/pull/742))
- `Cascader`:
  - 修复构建后组件样式缺失问题 @anlyyao ([#770](https://github.com/Tencent/tdesign-mobile-vue/pull/770))
  - 修复 `closeBtn` 无法关闭选择器面板 @anlyyao ([#820](https://github.com/Tencent/tdesign-mobile-vue/pull/820))
  - 修复示例无法拉起选择器面板的问题 @anlyyao ([#820](https://github.com/Tencent/tdesign-mobile-vue/pull/820))
- `DropdownMenu`: 修复 `keys` 属性无效的问题 @ccccpj ([#769](https://github.com/Tencent/tdesign-mobile-vue/pull/769))
- `Fab`: 修复按钮阴影样式缺失问题 @anlyyao ([#773](https://github.com/Tencent/tdesign-mobile-vue/pull/773))
- `List`:
  - 修复有父级元素时滚动值始终为 `0` 的问题 @ccccpj ([#823](https://github.com/Tencent/tdesign-mobile-vue/pull/823))
  - 修复 `load-more` 文案不显示的问题 @ccccpj ([#806](https://github.com/Tencent/tdesign-mobile-vue/pull/806))
  - 修复 `loading` 内容不居中的问题 @ccccpj ([#806](https://github.com/Tencent/tdesign-mobile-vue/pull/806))
- `DropdownMenu`: 修复下拉组件唯一 Id 问题 @ccccpj ([#782](https://github.com/Tencent/tdesign-mobile-vue/pull/782))
- `Message`:
  - 修复 `theme` 属性内置图标错误 @Resuragam ([#812](https://github.com/Tencent/tdesign-mobile-vue/pull/812))
  - 修复示例按钮样式错误 @Resuragam ([#812](https://github.com/Tencent/tdesign-mobile-vue/pull/812))
- `Calendar`: 修复组件圆角样式错误 @anlyyao ([#818](https://github.com/Tencent/tdesign-mobile-vue/pull/818))
- `Upload`: 修复国徽上传示例占位图错误 @anlyyao ([#821](https://github.com/Tencent/tdesign-mobile-vue/pull/821))
- `Input`: 移除浏览器默认聚焦样式 @anlyyao ([#1365](https://github.com/Tencent/tdesign-common/pull/1365))
- `Rate`: 修复图标不居中的问题 @anlyyao ([#1381](https://github.com/Tencent/tdesign-common/pull/1381))
- `Steps`: 修复 dot 样式错误 @anlyyao ([#1374](https://github.com/Tencent/tdesign-common/pull/1374))
- `Toast`: 修复组件背景色不正确 @anlyyao ([#1375](https://github.com/Tencent/tdesign-common/pull/1375))
- `Overlay `: 修复组件背景色不正确 @anlyyao ([#1376](https://github.com/Tencent/tdesign-common/pull/1376))
### 🚧 Others
-  fix: 处理部分组件按需引入报错的问题 @anlyyao ([#754](https://github.com/Tencent/tdesign-mobile-vue/pull/754))
- `Popup`: 补充测试用例 @anlyyao ([#753](https://github.com/Tencent/tdesign-mobile-vue/pull/753))
- `Search`: 补充测试用例 @anlyyao ([#742](https://github.com/Tencent/tdesign-mobile-vue/pull/742))
- `Textarea`: 补充测试用例 @anlyyao ([#743](https://github.com/Tencent/tdesign-mobile-vue/pull/743))
- `Stepper`: 补充测试用例 @anlyyao ([#744](https://github.com/Tencent/tdesign-mobile-vue/pull/744))
- `Switch`: 补充测试用例 @anlyyao ([#745](https://github.com/Tencent/tdesign-mobile-vue/pull/745))
- `Input`: 补充测试用例 @anlyyao ([#746](https://github.com/Tencent/tdesign-mobile-vue/pull/746))
- `Toast`: 补充测试用例 @anlyyao ([#749](https://github.com/Tencent/tdesign-mobile-vue/pull/749))
- `PullDownRefresh`: 补充测试用例 @anlyyao ([#750](https://github.com/Tencent/tdesign-mobile-vue/pull/750))
- `Tag`: 补充测试用例 @Resuragam ([#752](https://github.com/Tencent/tdesign-mobile-vue/pull/752))
- `Footer`: 补充测试用例 @Resuragam ([#771](https://github.com/Tencent/tdesign-mobile-vue/pull/771))
- `Result`: 补充测试用例 @Resuragam ([#772](https://github.com/Tencent/tdesign-mobile-vue/pull/772))
- `Message`: 补充测试用例 @palmcivet ([#774](https://github.com/Tencent/tdesign-mobile-vue/pull/774))
- `Link`: 补充测试用例 @Resuragam ([#780](https://github.com/Tencent/tdesign-mobile-vue/pull/780))
- `CountDown`: 补充测试用例 @Resuragam ([#789](https://github.com/Tencent/tdesign-mobile-vue/pull/789))
- `Upload`: 补充测试用例 @palmcivet ([#808](https://github.com/Tencent/tdesign-mobile-vue/pull/808))
- `Loading`: 补充测试用例 @palmcivet ([#811](https://github.com/Tencent/tdesign-mobile-vue/pull/811))
- `Steps`: 补充测试用例 @palmcivet ([#815](https://github.com/Tencent/tdesign-mobile-vue/pull/815))
- `Radio`: 补充测试用例 @palmcivet ([#814](https://github.com/Tencent/tdesign-mobile-vue/pull/814))
- `Rate`: 补充测试用例 @palmcivet ([#807](https://github.com/Tencent/tdesign-mobile-vue/pull/807))
- `BackTop`: 补充测试用例 @palmcivet ([#810](https://github.com/Tencent/tdesign-mobile-vue/pull/810))

## 🌈 0.23.0 `2023-05-30` 
### 🚨 Breaking Changes
- `ActionSheet`:
  - 移除 `type` 属性 @brianzhang ([#637](https://github.com/Tencent/tdesign-mobile-vue/pull/637))
  - `close` 事件参数变更 @brianzhang ([#637](https://github.com/Tencent/tdesign-mobile-vue/pull/637))
- `Indexes`:
  - 调整 `DOM` 结构 @yaogengzhu ([#680](https://github.com/Tencent/tdesign-mobile-vue/pull/680))
  - 移除 `IndexesCell` @yaogengzhu ([#680](https://github.com/Tencent/tdesign-mobile-vue/pull/680))
  - 移除 `height` 属性 @yaogengzhu ([#680](https://github.com/Tencent/tdesign-mobile-vue/pull/680))
  - `list` 属性更名为 `indexList` 属性 @yaogengzhu ([#680](https://github.com/Tencent/tdesign-mobile-vue/pull/680))
- `DropdownMenu`:
  - 调整 `DOM` @ccccpj ([#695](https://github.com/Tencent/tdesign-mobile-vue/pull/695))
  - 移除 `activeColor` 属性 @ccccpj ([#695](https://github.com/Tencent/tdesign-mobile-vue/pull/695))
  - 属性 `overlay` 更名为 `showOverlay` @ccccpj ([#695](https://github.com/Tencent/tdesign-mobile-vue/pull/695))
### 🚀 Features
- `Table`: 新增表格组件 @anlyyao ([#740](https://github.com/Tencent/tdesign-mobile-vue/pull/740))
- `ActionSheet`: 新增 `align`、`description` 属性 @brianzhang ([#637](https://github.com/Tencent/tdesign-mobile-vue/pull/637))
- `Indexes`:
  - 新增 `change` 事件 @yaogengzhu ([#680](https://github.com/Tencent/tdesign-mobile-vue/pull/680))
  - 新增 `IndexesAnchor`  @yaogengzhu ([#680](https://github.com/Tencent/tdesign-mobile-vue/pull/680))
- `DropdownMenu`:
  - 新增 `confirm`、 `reset` 事件 @ccccpj ([#695](https://github.com/Tencent/tdesign-mobile-vue/pull/695))
  - 新增 `footer` 插槽 @ccccpj ([#695](https://github.com/Tencent/tdesign-mobile-vue/pull/695))
- `DropdownItem`: 新增  `keys` 属性 @ccccpj ([#695](https://github.com/Tencent/tdesign-mobile-vue/pull/695))
- `Checkbox`: `icon` 新增  `boolean` 类型 @ccccpj ([#695](https://github.com/Tencent/tdesign-mobile-vue/pull/695))
### 🐞 Bug Fixes
- `SwipeCell`: 修复别名引用问题 @anlyyao ([#690](https://github.com/Tencent/tdesign-mobile-vue/pull/690))
- `Image`: 修复 `Image` 默认宽度样式缺失的问题 @xiaosansiji ([#1354](https://github.com/Tencent/tdesign-common/pull/1354))
- `Picker`: 修复样式错误 @ccccpj ([#1358](https://github.com/Tencent/tdesign-common/pull/1358))
### 🚧 Others
- `Progress`: 补充测试用例 @anlyyao ([#741](https://github.com/Tencent/tdesign-mobile-vue/pull/741))

## 🌈 0.22.0 `2023-05-23` 
### 🚨 Breaking Changes
- `Rate`:
  - 调整 `DOM` 结构 @fengchunqi ([#642](https://github.com/Tencent/tdesign-mobile-vue/pull/642))
  - 移除 `clearable`、`variant` 属性 @fengchunqi ([#642](https://github.com/Tencent/tdesign-mobile-vue/pull/642))
  - `size` 属性默认值变更为 `24px` @fengchunqi ([#642](https://github.com/Tencent/tdesign-mobile-vue/pull/642))
  - `gap` 属性默认值变更为 `8` @fengchunqi ([#642](https://github.com/Tencent/tdesign-mobile-vue/pull/642))
- `Drawer`: 调整 `DOM` @LeeJim ([#673](https://github.com/Tencent/tdesign-mobile-vue/pull/673))
- `ImageViewer`:
  - 调整 `DOM` @LeeJim ([#677](https://github.com/Tencent/tdesign-mobile-vue/pull/677))
  - 属性 `initialIndex` 更名为 `index` @LeeJim ([#677](https://github.com/Tencent/tdesign-mobile-vue/pull/677))
- `SwipeCell`:
  - 调整 `DOM` 结构 @nined9 ([#663](https://github.com/Tencent/tdesign-mobile-vue/pull/663))
  - 移除 `expanded` 属性 @nined9 ([#663](https://github.com/Tencent/tdesign-mobile-vue/pull/663))
- `Tabs`:
  - 调整 `DOM` 结构 @TeacherDingTing ([#678](https://github.com/Tencent/tdesign-mobile-vue/pull/678))
  - 移除 `placement` 属性 @TeacherDingTing ([#678](https://github.com/Tencent/tdesign-mobile-vue/pull/678))
  - 调整 `DOM` 结构 @TeacherDingTing ([#678](https://github.com/Tencent/tdesign-mobile-vue/pull/678))
  - 移除 `placement` 属性 @TeacherDingTing ([#678](https://github.com/Tencent/tdesign-mobile-vue/pull/678))
### 🚀 Features
- `Rate`: 新增 `icon` 属性 @fengchunqi ([#642](https://github.com/Tencent/tdesign-mobile-vue/pull/642))
- `Popup`: 新增 `destroyOnClose` 属性 @LeeJim ([#672](https://github.com/Tencent/tdesign-mobile-vue/pull/672))
- `Drawer`:
  - 新增 `attach`、`destroyOnClose`、`footer`、`title` 属性 @LeeJim ([#673](https://github.com/Tencent/tdesign-mobile-vue/pull/673))
  - 支持通过 plugin 的方式调用 @LeeJim ([#673](https://github.com/Tencent/tdesign-mobile-vue/pull/673))
- `ImageViewer`: 新增 `deleteBtn` 属性以及 `delete` 事件 @LeeJim ([#677](https://github.com/Tencent/tdesign-mobile-vue/pull/677))
- `SwipeCell`:
  - 新增 `opened` 等属性 @nined9 ([#663](https://github.com/Tencent/tdesign-mobile-vue/pull/663))
  - 新增组件实力方法 `showSure`，用于实现二次确认 @nined9 ([#663](https://github.com/Tencent/tdesign-mobile-vue/pull/663))
- `Tabs`:  新增 `spaceEvenly`、 `sticky`、`swipeable`、 `theme` 等属性 @TeacherDingTing ([#678](https://github.com/Tencent/tdesign-mobile-vue/pull/678))
- `TabPanel`: 新增 `badgeProps` 属性 @TeacherDingTing ([#678](https://github.com/Tencent/tdesign-mobile-vue/pull/678))
- `Icon`: 支持直接通过 `t-icon` 来使用 @anlyyao ([#681](https://github.com/Tencent/tdesign-mobile-vue/pull/681))
- `Upload`:
  - 新增 `addContent` 属性 @anlyyao ([#685](https://github.com/Tencent/tdesign-mobile-vue/pull/685))
  - 支持 `--td-upload-width` 、 `--td-upload-height`、`--td-upload-background` 变量 @anlyyao ([#685](https://github.com/Tencent/tdesign-mobile-vue/pull/685))
- `Rate`: 新增 `icon` 属性 @fengchunqi ([#642](https://github.com/Tencent/tdesign-mobile-vue/pull/642))
### 🐞 Bug Fixes
- `Dialog`: 修复示例失效的问题 @anlyyao ([#682](https://github.com/Tencent/tdesign-mobile-vue/pull/682))
- `Button`: 修复 `border` 样式问题 @anlyyao ([#1350](https://github.com/Tencent/tdesign-common/pull/1350))

## 🌈 0.21.0 `2023-05-15` 
### 🚀 Features
- `Progress`:
  - 调整 `DOM` 结构 @anlyyao ([#640](https://github.com/Tencent/tdesign-mobile-vue/pull/640))
  - 新增 `theme` 属性 @anlyyao ([#640](https://github.com/Tencent/tdesign-mobile-vue/pull/640))
- `NoticeBar`:
  - 调整 `DOM` 结构 @yaogengzhu ([#654](https://github.com/Tencent/tdesign-mobile-vue/pull/654))
  - 移除 `extra` 属性 @yaogengzhu ([#654](https://github.com/Tencent/tdesign-mobile-vue/pull/654))
  - 移除 `change` 事件 @yaogengzhu ([#654](https://github.com/Tencent/tdesign-mobile-vue/pull/654))
  - 新增 `direction`、`operation`  属性 @yaogengzhu ([#654](https://github.com/Tencent/tdesign-mobile-vue/pull/654))
  - `prefixIcon` 属性补充支持 Boolean 类型 @yaogengzhu ([#654](https://github.com/Tencent/tdesign-mobile-vue/pull/654))
  - `content` 属性补充支持数组类型 @yaogengzhu ([#654](https://github.com/Tencent/tdesign-mobile-vue/pull/654))
- `Steps`:
  - 调整 `DOM` 结构 @yaogengzhu ([#660](https://github.com/Tencent/tdesign-mobile-vue/pull/660))
  - 移除 `options` 属性 @yaogengzhu ([#660](https://github.com/Tencent/tdesign-mobile-vue/pull/660))
- `StepItem`:
  - 调整 `DOM` 结构 @yaogengzhu ([#660](https://github.com/Tencent/tdesign-mobile-vue/pull/660))
  - 组件名称 从 `Step` 变更为 `StepItem` @yaogengzhu ([#660](https://github.com/Tencent/tdesign-mobile-vue/pull/660))
  - 新增 `currentStatus`、`titleRight`、`sequence`  属性 @yaogengzhu ([#660](https://github.com/Tencent/tdesign-mobile-vue/pull/660))
- `Collapse`:
  - 调整 `DOM` @LeeJim ([#666](https://github.com/Tencent/tdesign-mobile-vue/pull/666))
  - 新增 `theme` 属性 @LeeJim ([#666](https://github.com/Tencent/tdesign-mobile-vue/pull/666))
- `CollapsePanel`: 新增 `placement`属性 @LeeJim ([#666](https://github.com/Tencent/tdesign-mobile-vue/pull/666))
- `NavBar`:
  - 事件 `leftClick` 的参数变更 @Charles-1999 ([#669](https://github.com/Tencent/tdesign-mobile-vue/pull/669))
  - 移除 `background`、`homeIcon`、`leftIcon`、`rightIcon` 属性 @Charles-1999 ([#669](https://github.com/Tencent/tdesign-mobile-vue/pull/669))
  - 新增 `capsule`、`leftArrow` 属性 @Charles-1999 ([#669](https://github.com/Tencent/tdesign-mobile-vue/pull/669))
  - 新增 `left`、`right` 属性，支持 string/TNode @Charles-1999 ([#669](https://github.com/Tencent/tdesign-mobile-vue/pull/669))
- `PullDownRefresh`:
  - 调整 `DOM` 结构，使用新样式 @anlyyao ([#644](https://github.com/Tencent/tdesign-mobile-vue/pull/644))
  - 新增 `scrolltolower` 事件 @anlyyao ([#644](https://github.com/Tencent/tdesign-mobile-vue/pull/644))
### 🐞 Bug Fixes
- `NoticeBar`: 修复水平滚动失效问题 @yaogengzhu ([#654](https://github.com/Tencent/tdesign-mobile-vue/pull/654))
- `PullDownRefresh`: 修复 `value = true` 不触发加载态的问题 @anlyyao ([#644](https://github.com/Tencent/tdesign-mobile-vue/pull/644))
- `Avatar`: 移除冗余 `load` 事件 @anlyyao ([#668](https://github.com/Tencent/tdesign-mobile-vue/pull/668))
### 🚧 Others
- `Badge`: 修复 `API` 文档中 `shape`、`size` 属性可选值错误 @LeeJim ([#661](https://github.com/Tencent/tdesign-mobile-vue/pull/661))

## 🌈 0.20.0 `2023-05-09` 
### 🚨 Breaking Changes
- `Avatar`:
  - 调整 `DOM` @ccccpj ([#631](https://github.com/Tencent/tdesign-mobile-vue/pull/631))
  - `size` 属性默认值变更为 `medium` @ccccpj ([#631](https://github.com/Tencent/tdesign-mobile-vue/pull/631))
- `TabBar`: 调整 `DOM` @jarmywang ([#633](https://github.com/Tencent/tdesign-mobile-vue/pull/633))
- `BackTop`: 调整 `DOM` @nined9 ([#641](https://github.com/Tencent/tdesign-mobile-vue/pull/641))
### 🚀 Features
- `TabBar`: 新增 `safeAreaInsetBottom`、`shape`、`split`、`theme` 属性 @jarmywang ([#633](https://github.com/Tencent/tdesign-mobile-vue/pull/633))
- `BackTop`: 属性 `icon` 增加 `boolean` 类型 @nined9 ([#641](https://github.com/Tencent/tdesign-mobile-vue/pull/641))
### 🐞 Bug Fixes
- `Button`: 增加点击态样式 @LeeJim ([#656](https://github.com/Tencent/tdesign-mobile-vue/pull/656))

## 🌈 0.19.0 `2023-04-24` 
### 🚨 Breaking Changes
- `Divider`:
  - 调整 `DOM` 结构 @jarmywang ([#600](https://github.com/Tencent/tdesign-mobile-vue/pull/600))
  - 调整 `Demo` @jarmywang ([#600](https://github.com/Tencent/tdesign-mobile-vue/pull/600))
- `Overlay`: 移除 transparent 属性，新增 backgroundColor 属性 @LeeJim ([#604](https://github.com/Tencent/tdesign-mobile-vue/pull/604))
- `Popup`:
  - 调整 `DOM` @LeeJim ([#605](https://github.com/Tencent/tdesign-mobile-vue/pull/605))
  - 属性 `to` 更名为 `attach` @LeeJim ([#605](https://github.com/Tencent/tdesign-mobile-vue/pull/605))
  - 移除 `customStyle` 属性，可以直接使用 style @LeeJim ([#605](https://github.com/Tencent/tdesign-mobile-vue/pull/605))
  - 属性 `lockScroll` 更名为 `preventScrollThrough` @LeeJim ([#605](https://github.com/Tencent/tdesign-mobile-vue/pull/605))
- `Toast`:
  - 调整 `DOM` 结构 @mistakers ([#611](https://github.com/Tencent/tdesign-mobile-vue/pull/611))
  - `destory` 事件名称更正为 destroy @mistakers ([#611](https://github.com/Tencent/tdesign-mobile-vue/pull/611))
- `Button`:
  - 移除 `button-group` 组件 @LeeJim ([#612](https://github.com/Tencent/tdesign-mobile-vue/pull/612))
  - 更新 `DOM` @LeeJim ([#612](https://github.com/Tencent/tdesign-mobile-vue/pull/612))
- `CountDown`: 调整 `DOM` 结构 @anlyyao ([#614](https://github.com/Tencent/tdesign-mobile-vue/pull/614))
- `Slider`:
  - 调整 `DOM` 结构 @anlyyao ([#610](https://github.com/Tencent/tdesign-mobile-vue/pull/610))
  - `label` 默认值变更为 `false` @anlyyao ([#610](https://github.com/Tencent/tdesign-mobile-vue/pull/610))
  - 移除 `dragend`、`dragstart` 事件 @anlyyao ([#610](https://github.com/Tencent/tdesign-mobile-vue/pull/610))
- `Fab`: 调整 `DOM` @LeeJim ([#618](https://github.com/Tencent/tdesign-mobile-vue/pull/618))
- `CheckTag`: 移除 `shape` 属性 @yaogengzhu ([#615](https://github.com/Tencent/tdesign-mobile-vue/pull/615))
- `Calendar`: 调整 `DOM` @ccccpj ([#579](https://github.com/Tencent/tdesign-mobile-vue/pull/579))
- `Dialog`: 调整 `DOM` @anlyyao ([#603](https://github.com/Tencent/tdesign-mobile-vue/pull/603))
### 🚀 Features
- `Overlay`: 支持 `CSS Variables` 实现主题定制 @LeeJim ([#604](https://github.com/Tencent/tdesign-mobile-vue/pull/604))
- `Popup`: 新增 `closeBtn` 属性 @LeeJim ([#605](https://github.com/Tencent/tdesign-mobile-vue/pull/605))
- `Button`:
  - 新增 `loadingProps` 透传至 `loading` 组件 @LeeJim ([#612](https://github.com/Tencent/tdesign-mobile-vue/pull/612))
  - 新增 `type` 属性透传至原生 `Button` @LeeJim ([#612](https://github.com/Tencent/tdesign-mobile-vue/pull/612))
  - 新增 `suffix` 属性 @LeeJim ([#612](https://github.com/Tencent/tdesign-mobile-vue/pull/612))
  - 属性 `size` 新增 extra-small 类型 @LeeJim ([#612](https://github.com/Tencent/tdesign-mobile-vue/pull/612))
  - 属性 `theme` 新增 `light` 类型 @LeeJim ([#612](https://github.com/Tencent/tdesign-mobile-vue/pull/612))
- `CountDown`: 新增 `size`、`theme`、`splitWithUnit` 属性 @anlyyao ([#614](https://github.com/Tencent/tdesign-mobile-vue/pull/614))
- `Slider`: 新增 `theme` 属性 @anlyyao ([#610](https://github.com/Tencent/tdesign-mobile-vue/pull/610))
- `CheckTag`: 新增 `variant` 属性 @yaogengzhu ([#615](https://github.com/Tencent/tdesign-mobile-vue/pull/615))
- `Calendar`:
  - 新增 `usePopup` 属性 @ccccpj ([#579](https://github.com/Tencent/tdesign-mobile-vue/pull/579))
  - 新增 `close`、`change` 事件 @ccccpj ([#579](https://github.com/Tencent/tdesign-mobile-vue/pull/579))
- `Dialog`: 新增 `closeBtn`、`overlayProps` 属性 @anlyyao ([#603](https://github.com/Tencent/tdesign-mobile-vue/pull/603))
- `Popup`: 事件 `close` 完善参数 @anlyyao ([#603](https://github.com/Tencent/tdesign-mobile-vue/pull/603))
### 🐞 Bug Fixes
- `build`: 组件内部不在使用别名 @anlyyao ([#606](https://github.com/Tencent/tdesign-mobile-vue/pull/606))
- `Cell`: 修复 `hover` 不生效的问题 @LeeJim ([#620](https://github.com/Tencent/tdesign-mobile-vue/pull/620))
- `Fab`: 修复纯图标时样式错误的问题 @LeeJim ([#618](https://github.com/Tencent/tdesign-mobile-vue/pull/618))
- `Tag`: 解决 `close` 事件冒泡问题 @anlyyao ([#621](https://github.com/Tencent/tdesign-mobile-vue/pull/621))

## 🌈 0.18.0 `2023-04-17` 
### 🚨 Breaking Changes
- `Cascader`: 移除 `cancel`、`click-tab` 事件 @anlyyao ([#533](https://github.com/Tencent/tdesign-mobile-vue/pull/533))
- `Badge`: 调整 `DOM` 结构 @jarmywang ([#576](https://github.com/Tencent/tdesign-mobile-vue/pull/576))
- `Grid`:
  - 调整 `DOM`，优化视觉 @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
  - 属性 `border` 移除 `object` 类型，改用 CSS Variables 调整边框样式 @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
- `GridItem`: 属性 `badgeProps` 更名为 `badge` @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
- `Upload`: 移除 `deleteBtn`、`gridConfig` 属性 @LeeJim ([#587](https://github.com/Tencent/tdesign-mobile-vue/pull/587))
- `Message`:
  - 调整滚动类型通知的动画初始值，优化动画循环方法 @yusuf-yz ([#586](https://github.com/Tencent/tdesign-mobile-vue/pull/586))
  - 移除 `change`、`close`、`closed`、`open`、`opened` 事件 @yusuf-yz ([#586](https://github.com/Tencent/tdesign-mobile-vue/pull/586))
### 🚀 Features
- `Form`: 新增 `Form` 表单 @anlyyao ([#591](https://github.com/Tencent/tdesign-mobile-vue/pull/591))
- `Link`: 新增 `Link` 组件 @brianzhang ([#589](https://github.com/Tencent/tdesign-mobile-vue/pull/589))
- `Grid`:
  - 属性 `column` 支持值为 `0`，则为固定宽度单元格，可以横向滚动 @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
  - 新增 `theme` 属性，支持 `card` 风格 @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
- `GridItem`: 属性 image 支持 object 类型，透传至 image 组件 @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
- `Upload`: 新增 formatRequest 属性、validate 事件 @LeeJim ([#587](https://github.com/Tencent/tdesign-mobile-vue/pull/587))
- `Message`: 新增 close-btn-click 事件 @yusuf-yz ([#586](https://github.com/Tencent/tdesign-mobile-vue/pull/586))
### 🐞 Bug Fixes
- `Grid`:
  - 修复调整 `gutter` 视觉错误的问题 @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
  - 修复出现多行时，边框视觉错误的问题 @LeeJim ([#584](https://github.com/Tencent/tdesign-mobile-vue/pull/584))
- `Upload`:
  - 修复 `size-limit` 无法限制的问题 @LeeJim ([#587](https://github.com/Tencent/tdesign-mobile-vue/pull/587))
  - 修复超出 `max` 仍可以上传的问题 @LeeJim ([#587](https://github.com/Tencent/tdesign-mobile-vue/pull/587))
- `Cell`: 修复 bordered 无效 @anlyyao ([#591](https://github.com/Tencent/tdesign-mobile-vue/pull/591))

## 🌈 0.17.0 `2023-04-07` 
### 🚨 Breaking Changes
- `CheckBox`:
  - 属性 `align` 更名为 `placement` @jarmywang ([#519](https://github.com/Tencent/tdesign-mobile-vue/pull/519))
  - 属性 `icon` 的枚举值变更 @jarmywang ([#519](https://github.com/Tencent/tdesign-mobile-vue/pull/519))
- `Picker`: 属性 `confirmBtn` 和 `cancelBtn` 取消 `object` 类型，不再使用 `button` 渲染 @LeeJim ([#539](https://github.com/Tencent/tdesign-mobile-vue/pull/539))
- `Search`:
  - 调整 `DOM` 结构 @anlyyao ([#540](https://github.com/Tencent/tdesign-mobile-vue/pull/540))
  - `Search`: 移除 `label` 属性相关 @anlyyao ([#540](https://github.com/Tencent/tdesign-mobile-vue/pull/540))
  - `blur`、`focus` 事件参数类型变更 @anlyyao ([#540](https://github.com/Tencent/tdesign-mobile-vue/pull/540))
- `Result`: 移除 `imageProps` 属性 @mamumu123 ([#543](https://github.com/Tencent/tdesign-mobile-vue/pull/543))
- `Skeleton`:
  - 移除 `content` 属性相关 @anlyyao ([#557](https://github.com/Tencent/tdesign-mobile-vue/pull/557))
  - 取消 `rowCol` 默认值 @anlyyao ([#557](https://github.com/Tencent/tdesign-mobile-vue/pull/557))
- `Image`:
  - 调整 `DOM` @LeeJim ([#561](https://github.com/Tencent/tdesign-mobile-vue/pull/561))
  - 属性 `shape` 调整默认值 @LeeJim ([#561](https://github.com/Tencent/tdesign-mobile-vue/pull/561))
- `Input`: 调整 `DOM` 结构 @ccccpj ([#531 ](https://github.com/Tencent/tdesign-mobile-vue/pull/531))
### 🚀 Features
- `CheckBox`: 新增 `block` 属性 @jarmywang ([#519](https://github.com/Tencent/tdesign-mobile-vue/pull/519))
- `Picker`:
  - 视觉升级 @LeeJim ([#539](https://github.com/Tencent/tdesign-mobile-vue/pull/539))
  - 新增 `header` 属性，支持传入插槽 @LeeJim ([#539](https://github.com/Tencent/tdesign-mobile-vue/pull/539))
  - 事件 `confirm` 丰富返回的参数 @LeeJim ([#539](https://github.com/Tencent/tdesign-mobile-vue/pull/539))
- `Empty`: 新增 `Empty` 组件 @mamumu123 ([#538](https://github.com/Tencent/tdesign-mobile-vue/pull/538))
- `Sticky`: 更新示例 @anlyyao ([#555](https://github.com/Tencent/tdesign-mobile-vue/pull/555))
- `Search`:
  - 新增 `submit` 事件 @anlyyao ([#540](https://github.com/Tencent/tdesign-mobile-vue/pull/540))
  - 新增 `disabled`、 `readonly` 属性 @anlyyao ([#540](https://github.com/Tencent/tdesign-mobile-vue/pull/540))
- `Image`: 新增支持 `srcset` 属性 @LeeJim ([#561](https://github.com/Tencent/tdesign-mobile-vue/pull/561))
- `Input`:
  - 新增支持 `allowInputOverMax` 属性 @ccccpj ([#531 ](https://github.com/Tencent/tdesign-mobile-vue/pull/531))
  - 新增支持 `layout` 属性 @ccccpj ([#531 ](https://github.com/Tencent/tdesign-mobile-vue/pull/531))
  - 新增支持 `status` 属性 @ccccpj ([#531 ](https://github.com/Tencent/tdesign-mobile-vue/pull/531))
  - 新增支持 `tips` 属性 @ccccpj  ([#531 ](https://github.com/Tencent/tdesign-mobile-vue/pull/531))
### 🐞 Bug Fixes
- `DateTimePicker`: 修复设置 `start`、`end` 之后展示错误的问题 @LeeJim ([#556](https://github.com/Tencent/tdesign-mobile-vue/pull/556))
- `Image`: 优化加载样式 @LeeJim ([#561](https://github.com/Tencent/tdesign-mobile-vue/pull/561))
### 🚧 Others
- `DateTimePicker`: 当 `mode` 等于 `hour/minute/second` 时，不需要传入完整的日期 @LeeJim ([#556](https://github.com/Tencent/tdesign-mobile-vue/pull/556))
- `Loading`: 调整 `dots` 类型的实现 @LeeJim ([#561](https://github.com/Tencent/tdesign-mobile-vue/pull/561))

## 🌈 0.16.0 `2023-03-27` 
### 🚨 Breaking Changes
- `Loading`:
  - 属性 `size` 默认值改成 `20px` @LeeJim ([#528](https://github.com/Tencent/tdesign-mobile-vue/pull/528))
  - 属性 `theme` 移除 `bar`、`error` 类型 @LeeJim ([#528](https://github.com/Tencent/tdesign-mobile-vue/pull/528))
- `Cell`: 优化样式，调整 `DOM` @LeeJim ([#529](https://github.com/Tencent/tdesign-mobile-vue/pull/529))
- `Textarea`: 优化 `DOM` @anlyyao ([#523](https://github.com/Tencent/tdesign-mobile-vue/pull/523))
### 🚀 Features
- `Loading`: 新增 `CSS Variables`，支持主题定制 @LeeJim ([#528](https://github.com/Tencent/tdesign-mobile-vue/pull/528))
- `Textarea`: 新增 `bordered`、`indicator`、`allowInputOverMax` 属性 @anlyyao ([#523](https://github.com/Tencent/tdesign-mobile-vue/pull/523))
- `Footer`: 新增页脚组件 @mamumu123 ([#525](https://github.com/Tencent/tdesign-mobile-vue/pull/525))
- `CellGroup`: 新增 `theme` 属性，新增支持 `card` 风格 @LeeJim ([#529](https://github.com/Tencent/tdesign-mobile-vue/pull/529))

## 🌈 0.15.0 `2023-03-20` 
### 🚨 Breaking Changes
- `Stepper`: 属性 `theme` 的 `gray` 主题更名为 `filled`，并新增 `outline` 主题 @anlyyao ([#518](https://github.com/Tencent/tdesign-mobile-vue/pull/518))
- `Radio`:
  - 属性 `align` 更名为 `placement` @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
  - 属性 `icon` 的枚举值变更、`DOM `变更 @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
- `Switch`:
  - 废弃 `colors` 属性，改用 `CSS Variables` @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))
  - 属性 `label` 的类型从 `string` 变为 `array` @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))
  - 优化 `DOM` @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))
### 🚀 Features
- `Tag`:  支持 `css variable` @anlyyao ([#507](https://github.com/Tencent/tdesign-mobile-vue/pull/507))
- `Stepper`: 新增 `size` 属性 @anlyyao ([#518](https://github.com/Tencent/tdesign-mobile-vue/pull/518))
- `Radio`: 新增支持 `allowUncheck`、`block`、`maxContentRow`、`maxLabelRow` 属性 @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
- `RadioGroup`: 新增支持 `allowUncheck`、`borderless`、`keys`、`placement` 属性 @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
- `Switch`: 新增 `icon`、`loading`、`size` 属性 @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))
### 🐞 Bug Fixes
- `Loading`: 修复部分浏览器下 `loading` 晃动问题 @anlyyao ([#505](https://github.com/Tencent/tdesign-mobile-vue/pull/505))
- `Stepper`: 修复 `min/max` 存在时，输入受限问题 @anlyyao ([#518](https://github.com/Tencent/tdesign-mobile-vue/pull/518))

## 🌈 0.14.1 `2022-11-14` 
### 🚧 Others
- `Badge`: 提升测试覆盖率 @anlyyao ([#479](https://github.com/Tencent/tdesign-mobile-vue/pull/479))
- `Progress`: 更新示例代码 @xxxlj ([#472](https://github.com/Tencent/tdesign-mobile-vue/pull/472))
- `BackTop`: 更新示例代码 @yuanmeda ([#468](https://github.com/Tencent/tdesign-mobile-vue/pull/468))
- `SwipeCell`: 更新示例代码 @wwlh200 ([#473](https://github.com/Tencent/tdesign-mobile-vue/pull/473))
- `PullDownRefresh`: 更新示例代码 @yuanmeda ([#470](https://github.com/Tencent/tdesign-mobile-vue/pull/470))
- `Button`: 更新示例代码 @TingShine ([#475](https://github.com/Tencent/tdesign-mobile-vue/pull/475))
- `CountDown`: 更新示例代码 @TingShine ([#477](https://github.com/Tencent/tdesign-mobile-vue/pull/477))
- `Image`: 更新示例代码 @TingShine ([#478](https://github.com/Tencent/tdesign-mobile-vue/pull/478))
- `Progress`: 更新示例代码 @xxxlj ([#472](https://github.com/Tencent/tdesign-mobile-vue/pull/472))
- `Loading`: 更新示例代码 @lockiechen ([#481](https://github.com/Tencent/tdesign-mobile-vue/pull/481))

## 🌈 0.14.0 `2022-11-07` 
### 🚨 Breaking Changes
- `NavBar`: 重构组件，支持更完整的 `props` 和 `event` @TingShine ([#391](https://github.com/Tencent/tdesign-mobile-vue/pull/391))
### 🐞 Bug Fixes
- `Calendar`: 修复 `confirmBtn` 属性传递 `string` 类型时渲染错误 @anlyyao ([#454](https://github.com/Tencent/tdesign-mobile-vue/pull/454))
- `Upload`: 修复不支持 `v-model` 的问题 @yuanmeda ([#460](https://github.com/Tencent/tdesign-mobile-vue/pull/460))
### 🚧 Others
- `Indexes`: 新增单元测试 @byq1213 ([#425](https://github.com/Tencent/tdesign-mobile-vue/pull/425))
- `Stepper`: 更新示例代码 @TingShine ([#443](https://github.com/Tencent/tdesign-mobile-vue/pull/443))
- `Cascader`:
  - 更新示例代码 @TingShine ([#444](https://github.com/Tencent/tdesign-mobile-vue/pull/444))
  - 新增单元测试 @anlyyao ([#452](https://github.com/Tencent/tdesign-mobile-vue/pull/452))
- `Search`: 更新示例代码 @palmcivet ([#445](https://github.com/Tencent/tdesign-mobile-vue/pull/445))
- `Slider`: 更新示例文档 @yuanmeda ([#458](https://github.com/Tencent/tdesign-mobile-vue/pull/458))
- `Calendar`: 新增单元测试 @anlyyao ([#454](https://github.com/Tencent/tdesign-mobile-vue/pull/454))
- `Overlay`: 提升组件单元测试覆盖率 @anlyyao ([#455](https://github.com/Tencent/tdesign-mobile-vue/pull/455))
- `Message`: 提升组件单元测试覆盖率 @anlyyao ([#456](https://github.com/Tencent/tdesign-mobile-vue/pull/456))
- `Collapse`:
  - 移除无用代码 @anlyyao ([#457](https://github.com/Tencent/tdesign-mobile-vue/pull/457))
  - 更新示例代码 @yuanmeda ([#461](https://github.com/Tencent/tdesign-mobile-vue/pull/461))
- `Upload`: 更新组件示例代码 @yuanmeda ([#460](https://github.com/Tencent/tdesign-mobile-vue/pull/460))
- `Steps`: 更新示例代码 @yuanmeda ([#459](https://github.com/Tencent/tdesign-mobile-vue/pull/459))
- `NoticeBar`: 更新示例代码 @byq1213 ([#465](https://github.com/Tencent/tdesign-mobile-vue/pull/465))
- `List`: 更新示例代码 @yuanmeda ([#464](https://github.com/Tencent/tdesign-mobile-vue/pull/464))
- `ActionSheet`: 更新示例代码 @yuanmeda ([#462](https://github.com/Tencent/tdesign-mobile-vue/pull/462))
- `ImageViewer`: 更新示例代码 @yuanmeda ([#463](https://github.com/Tencent/tdesign-mobile-vue/pull/463))

## 🌈 0.13.0 `2022-10-31` 
### 🚨 Breaking Changes
- `Message`:  `closeBtn` 属性不再支持 `string` 类型 @anlyyao ([#429](https://github.com/Tencent/tdesign-mobile-vue/pull/429))
### 🚀 Features
- `Message`: 新增 `icon` ，`offset` 属性 @anlyyao ([#429](https://github.com/Tencent/tdesign-mobile-vue/pull/429))
### 🐞 Bug Fixes
- `Message`: 修复 `marquee` 属性无效问题 @anlyyao ([#429](https://github.com/Tencent/tdesign-mobile-vue/pull/429))
### 🚧 Others
- `Swiper`: 新增单元测试 @palmcivet ([#441](https://github.com/Tencent/tdesign-mobile-vue/pull/441))
- `Badge`: 更新示例代码 @teal-front ([#420](https://github.com/Tencent/tdesign-mobile-vue/pull/420))
- `TabBar`: 更新示例代码 @yuanmeda ([#433](https://github.com/Tencent/tdesign-mobile-vue/pull/433))
- `Input`: 更新示例代码 @palmcivet ([#431](https://github.com/Tencent/tdesign-mobile-vue/pull/431))
- `Textarea`: 更新示例代码 @palmcivet ([#432](https://github.com/Tencent/tdesign-mobile-vue/pull/432))
- `Fab`: 更新示例代码 @yuanmeda ([#435](https://github.com/Tencent/tdesign-mobile-vue/pull/435))
- `Indexes`: 更新示例代码 @yuanmeda ([#437](https://github.com/Tencent/tdesign-mobile-vue/pull/437))
- `DropdownMenu`: 更新示例代码 @yuanmeda ([#440](https://github.com/Tencent/tdesign-mobile-vue/pull/440))
- `Sticky`: 更新示例代码 @yuanmeda ([#438](https://github.com/Tencent/tdesign-mobile-vue/pull/438))
- `Rate`: 更新示例代码 @yuanmeda ([#439](https://github.com/Tencent/tdesign-mobile-vue/pull/439))
- `Toast`: 更新示例代码 @yuanmeda ([#430](https://github.com/Tencent/tdesign-mobile-vue/pull/430))
- `CheckBox`: 更新示例代码 @yuanmeda ([#434](https://github.com/Tencent/tdesign-mobile-vue/pull/434))
- `Divider`: 更新示例代码 @yuanmeda ([#436](https://github.com/Tencent/tdesign-mobile-vue/pull/436))

## 🌈 0.12.2 `2022-10-24` 
### 🚀 Features
- `Avatar`: 新增 `imageProps` 属性透传至 `Image` 组件 @anlyyao ([#417](https://github.com/Tencent/tdesign-mobile-vue/pull/417))
- `List`: `scroll` 事件新增 `scrollTop` 参数 @LeeJim ([#427](https://github.com/Tencent/tdesign-mobile-vue/pull/427))
### 🐞 Bug Fixes
- `DateTimePicker`: 修复 `cancelBtn` 和 `confirmBtn` 无效的问题 @anlyyao ([#407](https://github.com/Tencent/tdesign-mobile-vue/pull/407))
- `Cell`: 修复 `RightIcon` 渲染错误 @anlyyao ([#416](https://github.com/Tencent/tdesign-mobile-vue/pull/416))
- `NoticeBar`:
  - 修复 `prefixIcon`  类型错误，取消 `String` 类型，新增 `Boolean` 类型 @anlyyao ([#421](https://github.com/Tencent/tdesign-mobile-vue/pull/421))
  - 修复 `content` 和 `extra` 内容重复渲染问题 @anlyyao ([#421](https://github.com/Tencent/tdesign-mobile-vue/pull/421))
- `Grid`: 修复 `image` 插槽无法正常渲染的问题 @LeeJim ([#423](https://github.com/Tencent/tdesign-mobile-vue/pull/423))
### 🚧 Others
- `Sticky`: 新增单元测试 @4xii ([#348](https://github.com/Tencent/tdesign-mobile-vue/pull/348))
- `DateTimePicker`: 新增单元测试 @anlyyao ([#407](https://github.com/Tencent/tdesign-mobile-vue/pull/407))
- `NoticeBar`: 更新示例代码 @anlyyao ([#421](https://github.com/Tencent/tdesign-mobile-vue/pull/421))
- `Avatar`: 更新示例代码 @anlyyao ([#417](https://github.com/Tencent/tdesign-mobile-vue/pull/417))
- `Dialog`: 更新示例代码 @LeeJim ([#422](https://github.com/Tencent/tdesign-mobile-vue/pull/422))
- `List`: 更新示例代码 @LeeJim ([#427](https://github.com/Tencent/tdesign-mobile-vue/pull/427))
- 移除部分工具函数使用 `loadsh` 代替 @LeeJim ([#419](https://github.com/Tencent/tdesign-mobile-vue/pull/419))

## 🌈 0.12.1 `2022-10-17` 
### 🚀 Features
- `Overlay`: 新增 `customStyle`属性，支持自定义遮罩样式 @anlyyao ([#403](https://github.com/Tencent/tdesign-mobile-vue/pull/403))
### 🐞 Bug Fixes
- `Search`:
  - 修复 `shape` 属性无效的问题 @anlyyao ([#392](https://github.com/Tencent/tdesign-mobile-vue/pull/392))
  - 修复 `clear` 事件无效的问题 @anlyyao ([#392](https://github.com/Tencent/tdesign-mobile-vue/pull/392))
- `List`:
  - 修复 `load-more` 可选参数问题 @byq1213 ([#376](https://github.com/Tencent/tdesign-mobile-vue/pull/376))
  - 修复 `load-more` 可选参数问题 @byq1213 ([#376](https://github.com/Tencent/tdesign-mobile-vue/pull/376))
### 🚧 Others
- `Search`: 新增组件单元测试 @anlyyao ([#392](https://github.com/Tencent/tdesign-mobile-vue/pull/392))
- `Input`: 提升单元测试覆盖率 @anlyyao ([#399](https://github.com/Tencent/tdesign-mobile-vue/pull/399))
- `Textarea`: 提升单元测试覆盖率 @anlyyao ([#400](https://github.com/Tencent/tdesign-mobile-vue/pull/400))
- `Image`: 提升单元测试覆盖率 @anlyyao ([#401](https://github.com/Tencent/tdesign-mobile-vue/pull/401))
- `List`:  提升单元测试覆盖率 @byq1213 ([#376](https://github.com/Tencent/tdesign-mobile-vue/pull/376))
- `DateTimePicker`: 优化示例代码 @LeeJim ([#411](https://github.com/Tencent/tdesign-mobile-vue/pull/411))

## 🌈 0.12.0 `2022-10-10` 
### 🚀 Features
- `Cascader`:
  - 新增级联选择器 @oceanlvr ([#368](https://github.com/Tencent/tdesign-mobile-vue/pull/368))
  - 优化逻辑和视觉 @LeeJim ([#395](https://github.com/Tencent/tdesign-mobile-vue/pull/395))
### 🐞 Bug Fixes
- `Slider`: 修复 `label` 属性无效的问题 @anlyyao ([#364](https://github.com/Tencent/tdesign-mobile-vue/pull/364))
- `Tabs`: 修复 `change` 事件和 `onChange` 属性无效的问题 @anlyyao ([#367](https://github.com/Tencent/tdesign-mobile-vue/pull/367))
- `Grid`:
  - 修复 `gutter` 无效 @anlyyao ([#381](https://github.com/Tencent/tdesign-mobile-vue/pull/381))
  - 修复 `border` 无效 @anlyyao ([#381](https://github.com/Tencent/tdesign-mobile-vue/pull/381))
- `DropdownMenu`: 修复 `onChange` 事件无效的问题 @anlyyao ([#374](https://github.com/Tencent/tdesign-mobile-vue/pull/374))
- `Rate`: 修复 `ts` 类型错误 @anlyyao ([#386](https://github.com/Tencent/tdesign-mobile-vue/pull/386))
- `NoticeBar`:
  - 修复 `content`、`extra` 失效的问题 @TingShine ([#302](https://github.com/Tencent/tdesign-mobile-vue/pull/302))
  - 使用正确的 `prefixIcon` 插槽名 @anlyyao ([#393](https://github.com/Tencent/tdesign-mobile-vue/pull/393))
### 🚧 Others
- `Divider`:
  - 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
  - 提升测试覆盖率 @anlyyao ([#380](https://github.com/Tencent/tdesign-mobile-vue/pull/380))
- `Skeleton`:
  - 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
  - 提升组件单元测试覆盖率 @anlyyao ([#387](https://github.com/Tencent/tdesign-mobile-vue/pull/387))
- `Slider`: 新增单元测试 @anlyyao ([#364](https://github.com/Tencent/tdesign-mobile-vue/pull/364))
- `SwipeCell`: 新增单元测试 @anlyyao ([#360](https://github.com/Tencent/tdesign-mobile-vue/pull/360))
- `Result`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Grid`:
  - 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
  - 提升测试覆盖率 @anlyyao ([#381](https://github.com/Tencent/tdesign-mobile-vue/pull/381))
- `Image`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Input`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Rate`:
  - 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
  - 提升组件单元测试覆盖率 @anlyyao ([#386](https://github.com/Tencent/tdesign-mobile-vue/pull/386))
- `Radio`:
  - 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
  - 提升组件单元测试覆盖率 @anlyyao ([#385](https://github.com/Tencent/tdesign-mobile-vue/pull/385))
- `Cell`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Badge`:
  - 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
  - 提升组件单元测试覆盖率 @anlyyao ([#388](https://github.com/Tencent/tdesign-mobile-vue/pull/388))
- `Avatar`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Tag`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Button`:
  - 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
  - 提升测试覆盖率 @anlyyao ([#379](https://github.com/Tencent/tdesign-mobile-vue/pull/379))
- `Textarea`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Steps`: 新增单元测试 @anlyyao ([#375](https://github.com/Tencent/tdesign-mobile-vue/pull/375))
- `DropdownMenu`: 新增单元测试 @anlyyao ([#374](https://github.com/Tencent/tdesign-mobile-vue/pull/374))

## 🌈 0.11.0 `2022-09-26` 
### 🚀 Features
- `Calendar`:
  - 新增日历组件 @LadyChatterleyLover ([#325](https://github.com/Tencent/tdesign-mobile-vue/pull/325))
  - 视觉升级，功能增强 @LeeJim ([#366](https://github.com/Tencent/tdesign-mobile-vue/pull/366))
### 🐞 Bug Fixes
- `CountDown`: 修复 `millisecond` 配置无效的问题 @TingShine ([#313](https://github.com/Tencent/tdesign-mobile-vue/pull/313))
- `Upload`: 修复上传失败后，再次上传会产生报错的问题 @palmcivet ([#318](https://github.com/Tencent/tdesign-mobile-vue/pull/318))
### 🚧 Others
- `Collapse`: 新增单元测试 @isanxia ([#331](https://github.com/Tencent/tdesign-mobile-vue/pull/331))
- `Loading`: 新增单元测试 @zhangpaopao0609 ([#320](https://github.com/Tencent/tdesign-mobile-vue/pull/320))
- `PullDownRefresh`: 新增单元测试 @palmcivet ([#356](https://github.com/Tencent/tdesign-mobile-vue/pull/356))
- `CountDown`: 新增单元测试 @TingShine ([#313](https://github.com/Tencent/tdesign-mobile-vue/pull/313))
- `Message`: 新增单元测试 @zhangpaopao0609 ([#321](https://github.com/Tencent/tdesign-mobile-vue/pull/321))
- `Upload`: 新增单元测试 @palmcivet ([#318](https://github.com/Tencent/tdesign-mobile-vue/pull/318))

## 🌈 0.10.6 `2022-09-20` 
### 🚀 Features
- `Drawer`: 新增单元测试 @anlyyao ([#311](https://github.com/Tencent/tdesign-mobile-vue/pull/311))
- `Popup`: 新增单元测试 @anlyyao ([#310](https://github.com/Tencent/tdesign-mobile-vue/pull/310))
- `Stepper`: 新增单元测试 @anlyyao ([#304](https://github.com/Tencent/tdesign-mobile-vue/pull/304))
- `Overlay`: 新增单元测试 @HelKyle ([#336](https://github.com/Tencent/tdesign-mobile-vue/pull/336))
- `BackTop`: 新增单元测试 @HelKyle ([#335](https://github.com/Tencent/tdesign-mobile-vue/pull/335))
- `Toast`: 新增单元测试 @HelKyle ([#334](https://github.com/Tencent/tdesign-mobile-vue/pull/334))
- `ActionSheet`: 新增单元测试 @HelKyle ([#319](https://github.com/Tencent/tdesign-mobile-vue/pull/319))
- `Progress`: 新增单元测试 @HelKyle ([#337](https://github.com/Tencent/tdesign-mobile-vue/pull/337))
- `ImageViewer`: 新增单元测试 @palmcivet ([#332](https://github.com/Tencent/tdesign-mobile-vue/pull/332))
- `TabBar`: 新增单元测试 @HelKyle ([#314](https://github.com/Tencent/tdesign-mobile-vue/pull/314))
- `Dialog`: 新增单元测试 @anlyyao ([#361](https://github.com/Tencent/tdesign-mobile-vue/pull/361))
### 🐞 Bug Fixes
- `Stepper`:
  - 修复输入非 `number` 字符时，出现 `NaN` 问题 @anlyyao ([#304](https://github.com/Tencent/tdesign-mobile-vue/pull/304))
  - 修复输入值能超出 `max` 的问题 @anlyyao ([#304](https://github.com/Tencent/tdesign-mobile-vue/pull/304))
  - 修复 `value` 值小于 `min` 或超出 `max` 时，不触发 `overlimit` 的问题 @anlyyao ([#304](https://github.com/Tencent/tdesign-mobile-vue/pull/304))
- `Collapse`: 修复 `headerRightContent` 插槽与文档描述不一致的问题 @isanxia ([#330](https://github.com/Tencent/tdesign-mobile-vue/pull/330))
### 🚧 Others
- `site`: 更新浏览器兼容性说明文档 @anlyyao ([#349](https://github.com/Tencent/tdesign-mobile-vue/pull/349))

## 🌈 0.10.5 `2022-09-06` 
### 🚀 Features
- `Popup`: 新增 `customStyle` 和 `overlayProps` 属性 @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Popup`: 更新示例代码 @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Drawer`: 更新示例代码 @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Switch`:
  - 更新示例代码 @anlyyao ([#307](https://github.com/Tencent/tdesign-mobile-vue/pull/307))
  - 新增单元测试 @anlyyao ([#307](https://github.com/Tencent/tdesign-mobile-vue/pull/307))
### 🐞 Bug Fixes
- `Popup`: `closeOverlayClick`属性更名为 `closeOnOverlayClick` @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Drawer`: `closeOverlayClick`属性更名为 `closeOnOverlayClick` @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Dialog`: 修复 `content` 变更没有响应的问题 @TingShine ([#306](https://github.com/Tencent/tdesign-mobile-vue/pull/306))
- `ActionSheet`: 修复type=grid时没有触发 onSelected的问题 @HelKyle ([#317](https://github.com/Tencent/tdesign-mobile-vue/pull/317))
- `DateTimePicker`: 修复组件修改 `model` 无法双向绑定的问题；修复组件默认value为空时，无法正常滑动的问题；优化List组件demo展示；修复Upload组件无法正常上传文件的问题 @Dengzygx ([#344](https://github.com/Tencent/tdesign-mobile-vue/pull/344))
- `List`: 优化组件 `demo` 展示 @Dengzygx ([#344](https://github.com/Tencent/tdesign-mobile-vue/pull/344))
- `Upload`: 修复组件无法正常上传文件的问题 @Dengzygx ([#344](https://github.com/Tencent/tdesign-mobile-vue/pull/344))
### 🚧 Others
- `fix`: enrich coverage badge type @anlyyao ([#315](https://github.com/Tencent/tdesign-mobile-vue/pull/315))

## 🌈 0.10.4 `2022-08-22` 
### 🚀 Features
- `Search`: 内嵌 `input` 组件 `type` 调整为 `search` @VeryHandSomeBoy ([#293](https://github.com/Tencent/tdesign-mobile-vue/pull/293))
- `Drawer`: 新增 `closeOnOverlayClick` 属性 @deadlyAce ([#287](https://github.com/Tencent/tdesign-mobile-vue/pull/287))
- `Popup`: 新增 `closeOnOverlayClick` 属性 @deadlyAce ([#287](https://github.com/Tencent/tdesign-mobile-vue/pull/287))
### 🐞 Bug Fixes
- `Dialog`: 修复 `demo` 示例弹窗不显示问题 @zyqq ([#289](https://github.com/Tencent/tdesign-mobile-vue/pull/289))
- `Slider`: 修复滑块滑到最左侧时，左侧文本被遮挡 @HelKyle ([#286](https://github.com/Tencent/tdesign-mobile-vue/pull/286))
- `Search`:
  - 修复传入默认值后需要点击才显示的问题 @VeryHandSomeBoy ([#292](https://github.com/Tencent/tdesign-mobile-vue/pull/292))
  - 修复不触发 `focus` 事件的问题 @VeryHandSomeBoy ([#292](https://github.com/Tencent/tdesign-mobile-vue/pull/292))

## 🌈 0.10.3 `2022-08-17` 
### 🐞 Bug Fixes
- `PulldownRefresh`: 修复下拉时偶尔失效的问题 @LeeJim ([#278](https://github.com/Tencent/tdesign-mobile-vue/pull/278))
- `List`: 修复组件滚动无法触发scroll的问题 @Dengzygx ([#283](https://github.com/Tencent/tdesign-mobile-vue/pull/283))
### 🚧 Others
- `test`: update vitest config @anlyyao ([#272](https://github.com/Tencent/tdesign-mobile-vue/pull/272))

## 🌈 0.10.2 `2022-08-15` 
### 🚀 Features
- `ImageViewer`:
  - 新增 `maxZoom`、`closeBtn`、`onClose` 属性 @ruige24601 ([#259](https://github.com/Tencent/tdesign-mobile-vue/pull/259))
  - 新增 `close` 事件 @ruige24601 ([#259](https://github.com/Tencent/tdesign-mobile-vue/pull/259))
- `Swiper`: 新增 `paginationPosition` 属性 @anlyyao ([#262](https://github.com/Tencent/tdesign-mobile-vue/pull/262))
### 🐞 Bug Fixes
- `Textarea`: 修复 `change` 事件会执行两次的问题 @Dengzygx ([#270](https://github.com/Tencent/tdesign-mobile-vue/pull/270))
- `Image`: 修复 `src` 变更没有重新渲染的问题 @VeryHandSomeBoy ([#264](https://github.com/Tencent/tdesign-mobile-vue/pull/264))

## 🌈 0.10.1 `2022-08-01`
### 🐞 Bug Fixes
- `Search`: 修复失去焦点后输入内容被隐藏和清除按钮无法使用的问题 @VeryHandSomeBoy ([#257](https://github.com/Tencent/tdesign-mobile-vue/pull/257))
- `Tabs`: 修复传入相同的值时仍触发 `change` 事件的问题 @VeryHandSomeBoy ([#254](https://github.com/Tencent/tdesign-mobile-vue/pull/254))
- `Popup`: 修复使用 `overlay` 组件没传入 `visible` 导致告警的问题 @LeeJim ([#251](https://github.com/Tencent/tdesign-mobile-vue/pull/251))
- `Dialog`: 修复 `slot` 渲染逻辑 @LeeJim ([#258](https://github.com/Tencent/tdesign-mobile-vue/pull/258))

## 🌈 0.10.0 `2022-07-25` 
### 🚀 Features
- `Skeleton`: 属性 `theme` 移除 `avatar-text`， 同时新增 `avatar`、`image`、`paragraph`   类型 @anlyyao ([#239](https://github.com/Tencent/tdesign-mobile-vue/pull/239))
- `Result`: 新增结果组件 @anlyyao ([#243](https://github.com/Tencent/tdesign-mobile-vue/pull/243))
### 🐞 Bug Fixes
- `Button`: 修复 `loading` 值改变时，控制台报错 @anlyyao ([#247](https://github.com/Tencent/tdesign-mobile-vue/pull/247))
- `Skeleton`: 属性 `rowCol` 移除默认值 `[1, 1, 1, { width: 70% }]` @anlyyao ([#239](https://github.com/Tencent/tdesign-mobile-vue/pull/239))
- `Toast`: 修复指令调用时不现实图标的问题 @douxpang ([#241](https://github.com/Tencent/tdesign-mobile-vue/pull/241))
### 🚧 Others
- `site`: 官网更新组件分类 @LeeJim ([#248](https://github.com/Tencent/tdesign-mobile-vue/pull/248))
- `Skeleton`: 更新示例代码 @anlyyao ([#239](https://github.com/Tencent/tdesign-mobile-vue/pull/239))

## 🌈 0.9.2 `2022-07-18` 
### 🐞 Bug Fixes
- `DropdownMenu`: 修复树形状态下溢出时无法滚动的问题 @LeeJim ([#236](https://github.com/Tencent/tdesign-mobile-vue/pull/236))
- `Sticky`: 修复 `fixed` 状态下丢失宽度的问题 @LeeJim ([#237](https://github.com/Tencent/tdesign-mobile-vue/pull/237))
- `Skeleton`: 修复 `props` 变化不重新渲染的问题 @VeryHandSomeBoy ([#238](https://github.com/Tencent/tdesign-mobile-vue/pull/238))

## 🌈 0.9.1 `2022-07-12` 
### 🚀 Features
- `Toast`: 新增 `overlayProps` 属性透传至 `overlay` 组件，新增 `showOverlay` 属性控制遮罩层显示 @oceanlvr ([#204](https://github.com/Tencent/tdesign-mobile-vue/pull/204))
- `Button`: 支持 `4` 种类型 @anlyyao ([#218](https://github.com/Tencent/tdesign-mobile-vue/pull/218))
- `Overlay`: 新增组件 @LeeJim ([#223](https://github.com/Tencent/tdesign-mobile-vue/pull/223))
- `DropdownMenu`: 新增 toggle 方法用于切换菜单 @LeeJim ([#230](https://github.com/Tencent/tdesign-mobile-vue/pull/230))
- `Tag`: 升级样式以及支持左图标 @anlyyao ([#229](https://github.com/Tencent/tdesign-mobile-vue/pull/229))
### 🐞 Bug Fixes
- `Message`: 优化用法，支持 `v-model` @Dengzygx ([#216](https://github.com/Tencent/tdesign-mobile-vue/pull/216))
- `DateTimePicker`: 修复 `value` 为空时无法正常展示的问题 @Dengzygx ([#215](https://github.com/Tencent/tdesign-mobile-vue/pull/215))
- `Search`: 修复 `blur` 事件参数返回错误的问题 @Dengzygx ([#217](https://github.com/Tencent/tdesign-mobile-vue/pull/217))
- `DropdownMenu`:
  - 修复 `dropdownmenu-item` 的 `label` 不支持动态更新等问题 @krimeshu ([#220](https://github.com/Tencent/tdesign-mobile-vue/pull/220))
  - 修复 `radio`、`checkbox` 样式问题 @LeeJim ([#219](https://github.com/Tencent/tdesign-mobile-vue/pull/219))

## 🌈 0.9.0 `2022-06-30` 
### 🚨 Breaking Changes
- `Progress`: 移除 `size` 和 `theme` 属性 @anlyyao ([#179](https://github.com/Tencent/tdesign-mobile-vue/pull/179))
- `Picker`:
  - 重构`Picker`组件 @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
  - 移除子组件`<picker-item/>`，新增基于Picker开发的级联选择组件`<cascade />`  @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
  - 新增`columns`，代表配置每一列的选项；新增`renderLabel`，用于自定义渲染label；新增`onPick`，选中任何一列时均会触发  @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
  - 修改`onChange`，`onConfirm`的回调参数  @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
- `DateTimePicker`:
  - 重构`DateTimePicker`组件 @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
  - 移除`disableDate`、`showWeek` @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
  - 新增`start`，用于设置最小可选时间；新增`end`，用于设置最大可选时间 @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
  - 将`onColumnChange`改名为`onPick`，修改回调参数 @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
  - 修改`onChange`，`onConfirm`的回调参数 @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
- `Search`:
  - 移除 `iconColor` 属性 @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
  - `autofocus` 更名为 `focus` @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
  - `cancelButtonText` 更名为 `action` @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
  - 新增 `leftIcon` 支持左侧图标定制 @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
  - 新增 `value` 和 `default-value` 控制输入框的值 @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
  - `cancel` 事件更名为 `action-click` @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
  - 新增 `blur` 和 `focus` 事件 @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
- `Collapse`:
  - `accordion` 更名为 `expandMutex`  @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - 移除 `title`、`labelWidth` 属性  @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - 新增 `disabled`、`expandIcon`、`onChange` 属性无效的问题  @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
- `CollapsePanel`:
  - `name` 更为为 `value` @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - `title` 更名为 `header` @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - `extra` 更名为 `headerRightContent` @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - 移除 `labelWidth`、`headerClickable` 属性 @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - 新增 `default`、`expandIcon` 属性 @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - 移除 `click` 事件 @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
- `Drawer`:
  - 移除 `slider` 属性  @ruige24601 ([#190](https://github.com/Tencent/tdesign-mobile-vue/pull/190))
  - 新增 `items`、`placement`、`showOverlay`、`zIndex` 等属性 @ruige24601 ([#190](https://github.com/Tencent/tdesign-mobile-vue/pull/190))
  - 新增 `close`、`item-click`、`overlay-click` 等事件 @ruige24601 ([#190](https://github.com/Tencent/tdesign-mobile-vue/pull/190))
### 🚀 Features
- `Indexes`: 新增 `Indexes` 组件 @ruige24601 ([#117](https://github.com/Tencent/tdesign-mobile-vue/pull/117))
- `Input`: 新增支持 `size` 属性 @anlyyao ([#181](https://github.com/Tencent/tdesign-mobile-vue/pull/181))
- `Fab`: 新增支持 `buttonProps` 和 `style` 属性 @anlyyao ([#182](https://github.com/Tencent/tdesign-mobile-vue/pull/182))
- `Cell`: 新增支持 `image` 插槽 @anlyyao ([#184](https://github.com/Tencent/tdesign-mobile-vue/pull/184))
- `Rate`: 新增支持 `gap` 属性 @anlyyao ([#185](https://github.com/Tencent/tdesign-mobile-vue/pull/185))
- `Loading`: 新增支持 `duration`、inheritColor、pause、reverse 属性 @LeeJim ([#191](https://github.com/Tencent/tdesign-mobile-vue/pull/191))
- `Dialog`: @LeeJim ([#193](https://github.com/Tencent/tdesign-mobile-vue/pull/193))
  - 新增支持 `actions` 和 `preventScrollThrough` 属性
  - 新增支持 支持 `confirmBtn` 和 `cancelBtn` 的插槽
- `Checkbox`: 新增支持 `maxContentRow` 和 `maxLabelRow` 属性 @anlyyao ([#195](https://github.com/Tencent/tdesign-mobile-vue/pull/195))
- `CheckboxGroup`: 新增支持 `max` 属性 @anlyyao ([#195](https://github.com/Tencent/tdesign-mobile-vue/pull/195))
- `Swiper`: 新增支持 `minShowNum` 属性 @anlyyao ([#197](https://github.com/Tencent/tdesign-mobile-vue/pull/197))
- `Upload`:
  - 新增 `select-change` 事件 @wwlh200 ([#205](https://github.com/Tencent/tdesign-mobile-vue/pull/205))
  - 新增支持 `allowUploadDuplicateFile` 属性 @wwlh200 ([#205](https://github.com/Tencent/tdesign-mobile-vue/pull/205))
### 🐞 Bug Fixes
- `Badge`:
  - 修复 `showZero` 属性无效的问题 @renxm ([#141](https://github.com/Tencent/tdesign-mobile-vue/pull/141))
  - 修复 `maxCount` 属性无效的问题 @robinWongM ([#142](https://github.com/Tencent/tdesign-mobile-vue/pull/142))
- `DropdownMenu`: 修复单选 `update:value` 失效的问题 @wwlh200 ([#146](https://github.com/Tencent/tdesign-mobile-vue/pull/146))
- `Radio`: 修复非受控用法错误的问题 @anlyyao ([#192](https://github.com/Tencent/tdesign-mobile-vue/pull/192))

## 🌈 0.8.6 `2022-05-30` 
### 🚨 Breaking Changes
- `Overlay`: 将 `mask` 重命名为 `overlay` @LeeJim ([#113](https://github.com/Tencent/tdesign-mobile-vue/pull/113))
- `Progress`: 重构组件，API 更新 @anlyyao ([#116](https://github.com/Tencent/tdesign-mobile-vue/pull/116))
- `Slider`: 重构组件 @LeeJim ([#115](https://github.com/Tencent/tdesign-mobile-vue/pull/115))
- `NoticeBar`: 重构组件 @xia7187 ([#99](https://github.com/Tencent/tdesign-mobile-vue/pull/99))
### 🚀 Features
- `Indexes`: 新增 `Indexes` 组件 @ruige24601 ([#117](https://github.com/Tencent/tdesign-mobile-vue/pull/117))
- `ActionSheet`: 新增 `ActionSheet` 组件 @Dengzygx ([#121](https://github.com/Tencent/tdesign-mobile-vue/pull/121))
- `Icon`: 更新图标 新增`file-icon`图标 调整`file-excel`、`file-pdf`、`file-powerpoint`、`file-unknown`、`file-word`和`star-filled`图标的绘制路径 @uyarn ([#111](https://github.com/Tencent/tdesign-mobile-vue/pull/111))
### 🐞 Bug Fixes
- `Textarea`: 修复 `label` 不生效问题；样式优化 @anlyyao ([#107](https://github.com/Tencent/tdesign-mobile-vue/pull/107))
- `Badge`: 修复组件设置 `color` 属性无效问题 @Calvest ([#125](https://github.com/Tencent/tdesign-mobile-vue/pull/125))
- `Swiper`: 支持通过修改 `loop` 值关闭循环 @MarvenGong ([#108](https://github.com/Tencent/tdesign-mobile-vue/pull/108))
### 🚧 Others
- `feat`: 站点支持搜索 @HQ-Lin ([#120](https://github.com/Tencent/tdesign-mobile-vue/pull/120))

## 🌈 0.8.5 `2022-04-29`
### 🚀 Features
- `Icon`: 完善组件文档
### 🐞 Bug Fixes
- `Indexes`: 暂时从菜单栏中移除
- `Picker`: 修复组件 `demo` 点击取消,无法收起蒙层问题
- `DateTimePicker`: 修复组件传参错误问题、修复组件无法触发change事件问题
- `Textarea`: 修复组件类名错误问题

## 🌈 0.8.4 `2022-04-15`
### 🚀 Features
- `Tabs`: 新增 `stickyProps`，支持滚动到顶部时自动吸顶
- `PullDownRefresh`: `loadingBarHeight` 属性支持 `string` 类型，代码优化
### 🐞 Bug Fixes
- `Swiper`: 修复动态绑定时出错问题
- `List`: 修复组件 `demo` 代码运行出错的问题
- `Input`: `compositionend` 优化

## 🌈 0.8.2 `2022-04-08`
### 🐞 Bug Fixes
- `Tabs`: `label` 支持动态修改，以及新增支持slot的方式
- `Popup`: 修复 `teleport` 失效问题

## 🌈 0.8.1 `2022-04-02`
### 🚀 Features
* 加入 `ci` 拼写检查报错
* 支持历史版本跳转
- `DropdownMenu`: 更新组件的模板类型处理
### 🐞 Bug Fixes
- `CountDown`: 单位样式问题修复、倒计时加入 `fps` 获取
- `Swiper`: 快速滑动导致卡住问题
- `Picker`: 组件 `demo` 修复
- `SwipeCell`: 修改组件示例，和 `demo` 保持一致

## 🌈 0.8.0 `2022-03-17`
### 🚀 Features
- `PullDownRefresh`: 新增 `PullDownRefresh` 组件 6f1c8a7
### 🐞 Bug Fixes
- `DropdownMenu`: 移除冗余的 `dom` 结构 ecba97f
- `Search`: 修复样式丢失问题, close #29 ac1dd2a
- `Input`: 修复输入框样式丢失问题
- `GridItem`: 修复组件样式丢失问题

## 🌈 0.7.0 `2022-03-14`
### 🚨 Breaking Changes
- `CountDown`: 支持主题和大小 3f0a5e5
### 🚀 Features
- `BackTop`: 新增 `BackTop` 组件 fb61e74
### 🐞 Bug Fixes
- `Dialog`: 弹出框蒙层点击是否关闭修复 & provide 暴露 $dialog, close #12 11092af, closes #12
- `Badge`: 修复组件类型错误 d4f8da6

## 🌈 0.6.2 `2022-03-03`
### 🐞 Bug Fixes
- 修复缺失的组件引用 `bug #149`
- `Dialog`: buttons layout 92944ee
- `Steps`: 设计修改样式对齐 38ca336
- `Sswiper`: 非空 `Props` 的处理
- `TabBar`: 调整 `demo` 默认值使用
- `Input`: 修复 `modelValue` 绑定丢失的问题 `bug #151`

## 🌈 0.6.1 `2022-02-28`
### 🚨 Breaking Changes
- `DatetTimePicker`:  移除 `position` 属性，同时新增 `placement` 属性
### 🚀 Features
- 新增 `stackblitz` 支持
- 引入 `vueuse`, 优化代码逻辑
- 优化图片懒加载方案
- 新增 `Image`、`Sticky`、`Skeleton`、`Grid`、`List`、`Loading` 组件
- 引入 `useDefault` 处理受控和非受控逻辑
- 引入 `useEmitEvent` 处理事件逻辑: `stepper`, `image`
- 移除 `mapprops` 高阶组件
- 处理 `props` 对于可空类型的判断ts提示问题
- `Stepper`: 增加 `overlimit` 支持
- `demo`: 修复 `demo` 展示问题, 并移除 `Indexes`
### 🐞 Bug Fixes
- `Avatar`: 移除完全一样的逻辑实现
- `Picker`: 修复 `Picker` 的错误
- `Steps`: 只读 `demo` 不可点击问题修复
- `Swiper`: 修复类型错误
- `Tabs`: 移除顶部 `transform`
- `Toast`: 修复遮罩禁止滑动不生效的问题

## 🌈 0.5.0 `2022-01-23`
### 🚀 Features
- `Avatar`: 完善组件
- `Picker`: 完善组件默认值以及 `demo` fa1983a
- 添加 `useDefault`（支持受控和非受控逻辑）支持setInnerValue  dc8262d
- `checkbox` 和 `check-group` 结构调整 fe53611
- `picker-item` 的 `value` 变化时，`picker` 及时更新 5b12841
### 🐞 Bug Fixes
- `Tag`: 更新 `tag` 样式 `light-outline` 1e051bd
- `Picker`: 修复默认值非第一个时的滚动错误 1ff7183
- `Avatar`: 修复 `size` 和 `dot` 的支持 class 57fe446
- `Cell`: `icon` 对齐的问题 7c71689
- `Checkbox`: 组件对齐的问题 78f5bb0
- `Dialog`: 修复 `dialog` 插件类型错误 f7983d7
- `DropdownMenu`: 修复单选项目 `update:value` 失效的问题 68e62bd, 修复一些特殊场景出现的问题 ffc2f4e
- `Input`: 修复点击事件丢失问题 31f1a39
- `Radio`: 修复 `radio` 的文本点击事件丢失问题 3664b5f
- `Rate`: 修复视觉走查 b7bd53a
- `Swiper`: 添加圆角支持 69aa8e5

## 🌈 0.4.1 `2022-01-06`
### 🚀 Features
- `Avatar`: 添加 `Avatar` 组件
- 更新 `BEM` 规范 7c59f2b,5637f7e
- 迁移 `md` & 优化细节 e4c28fa,048a9aa,799fc08
- 添加 `codesandbox` 5fea71d, e93e416
### 🐞 Bug Fixes
- `Swiper`: 修复 `Swiper` 宽度计算问题 cc2d012
- typo e25903a

## 🌈 0.4.0 `2021-12-27`
### 🚨 Breaking Changes
- 对齐已发布组件的 `API` 能力
### 🚀 Features
- `Countdown`: 新增 `Countdown` 组件
- `Swiper`: 新增 `Swiper` 组件
- `Switch`: use emitEvent ([1700a72](http:///tdesign-mobile-vue/commits/1700a722c896c43658512de36b7235f6655981ae))
- 补充 `package.json` 信息，使用 `cli` 处理发布日志 ([eb4fa42](http:///tdesign-mobile-vue/commits/eb4fa42df755749bfbd48f9cf9dc591f8bb00b49))
- 调整 `common` & `types` 目录 ([227e7dd](http:///tdesign-mobile-vue/commits/227e7dd2c67448d6c30cf325c72ae6967d63779c))
- 调整贡献者名单位置 ([c92c5c9](http:///tdesign-mobile-vue/commits/c92c5c9b63a6a4e60bf093c28e66dc550d1bfcd7))
