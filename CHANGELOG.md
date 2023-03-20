---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

## 🌈 0.15.0 `2023-03-20` 
### ❗ BREAKING CHANGES
- `Stepper`: 属性 theme 的 gray 主题更名为 filled，并新增 outline 主题 @anlyyao ([#518](https://github.com/Tencent/tdesign-mobile-vue/pull/518))
- `Radio`: 属性 align 更名为 placement @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
- `Radio`: 属性 icon 的枚举值变更、DOM 变更 @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
- `Switch`: 废弃 colors 属性，改用 CSS Variables @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))
- `Switch`: 属性 label 的类型从 string 变为 array @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))
- `Switch`: 优化 DOM @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))

### 🚀 Features
- `Tag`:  支持 css variable @anlyyao ([#507](https://github.com/Tencent/tdesign-mobile-vue/pull/507))
- `Stepper`: 新增 size 属性 @anlyyao ([#518](https://github.com/Tencent/tdesign-mobile-vue/pull/518))
- `Radio`: 新增支持 allowUncheck、block、maxContentRow、maxLabelRow 属性 @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
- `RadioGroup`: 新增支持 allowUncheck、borderless、keys、placement 属性 @LeeJim ([#517](https://github.com/Tencent/tdesign-mobile-vue/pull/517))
- `Swtich`: 新增 icon、loading、size 属性 @LeeJim ([#520](https://github.com/Tencent/tdesign-mobile-vue/pull/520))
### 🐞 Bug Fixes
- `Loading`: 修复部分浏览器下 loading 晃动问题 @anlyyao ([#505](https://github.com/Tencent/tdesign-mobile-vue/pull/505))
- `Stepper`: 修复 min/max 存在时，输入受限问题 @anlyyao ([#518](https://github.com/Tencent/tdesign-mobile-vue/pull/518))


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
### ❗ Breaking Changes
- `NavBar`: 重构组件，支持更完整的 props 和 event @TingShine ([#391](https://github.com/Tencent/tdesign-mobile-vue/pull/391))
### 🐞 Bug Fixes
- `Calendar`: 修复 confirmBtn 属性传递 `string` 类型时渲染错误 @anlyyao ([#454](https://github.com/Tencent/tdesign-mobile-vue/pull/454))
- `Upload`: 修复不支持 v-model 的问题 @yuanmeda ([#460](https://github.com/Tencent/tdesign-mobile-vue/pull/460))
### 🚧 Others
- `Indexes`: 新增单元测试 @byq1213 ([#425](https://github.com/Tencent/tdesign-mobile-vue/pull/425))
- `Stepper`: 更新示例代码 @TingShine ([#443](https://github.com/Tencent/tdesign-mobile-vue/pull/443))
- `Cascader`: 更新示例代码 @TingShine ([#444](https://github.com/Tencent/tdesign-mobile-vue/pull/444))
- `Search`: 更新示例代码 @palmcivet ([#445](https://github.com/Tencent/tdesign-mobile-vue/pull/445))
- `Slider`: 更新示例文档 @yuanmeda ([#458](https://github.com/Tencent/tdesign-mobile-vue/pull/458))
- `Cascader`: 新增单元测试 @anlyyao ([#452](https://github.com/Tencent/tdesign-mobile-vue/pull/452))
- `Calendar`: 新增单元测试 @anlyyao ([#454](https://github.com/Tencent/tdesign-mobile-vue/pull/454))
- `Overlay`: 提升组件单元测试覆盖率 @anlyyao ([#455](https://github.com/Tencent/tdesign-mobile-vue/pull/455))
- `Message`: 提升组件单元测试覆盖率 @anlyyao ([#456](https://github.com/Tencent/tdesign-mobile-vue/pull/456))
- `Collapse`: 移除无用代码 @anlyyao ([#457](https://github.com/Tencent/tdesign-mobile-vue/pull/457))
- `Upload`: 更新组件示例代码 @yuanmeda ([#460](https://github.com/Tencent/tdesign-mobile-vue/pull/460))
- `Steps`: 更新示例代码 @yuanmeda ([#459](https://github.com/Tencent/tdesign-mobile-vue/pull/459))
- `NoticeBar`: 更新示例代码 @byq1213 ([#465](https://github.com/Tencent/tdesign-mobile-vue/pull/465))
- `Collapse`: 更新示例代码 @yuanmeda ([#461](https://github.com/Tencent/tdesign-mobile-vue/pull/461))
- `List`: 更新示例代码 @yuanmeda ([#464](https://github.com/Tencent/tdesign-mobile-vue/pull/464))
- `ActionSheet`: 更新示例代码 @yuanmeda ([#462](https://github.com/Tencent/tdesign-mobile-vue/pull/462))
- `List`: 更新示例代码 @yuanmeda ([#466](https://github.com/Tencent/tdesign-mobile-vue/pull/466))
- `ImageViewer`: 更新示例代码 @yuanmeda ([#463](https://github.com/Tencent/tdesign-mobile-vue/pull/463))

## 🌈 0.13.0 `2022-10-31` 
### ❗️BREAKING CHANGES
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
- `NoticeBar`:  修复 `prefixIcon`  类型错误，取消 `String` 类型，新增 `Boolean` 类型 @anlyyao ([#421](https://github.com/Tencent/tdesign-mobile-vue/pull/421))
- `NoticeBar`: 修复 `content` 和 `extra` 内容重复渲染问题 @anlyyao ([#421](https://github.com/Tencent/tdesign-mobile-vue/pull/421))
- `Grid`: 修复 `image` 插槽无法正常渲染的问题 @LeeJim ([#423](https://github.com/Tencent/tdesign-mobile-vue/pull/423))
### 🚧 Others
- `Sticky`: 新增单元测试 @4xii ([#348](https://github.com/Tencent/tdesign-mobile-vue/pull/348))
- `DateTimePicker`: 新增单元测试 @anlyyao ([#407](https://github.com/Tencent/tdesign-mobile-vue/pull/407))
- `NoticeBar`: 更新示例代码 @anlyyao ([#421](https://github.com/Tencent/tdesign-mobile-vue/pull/421))
- `Avatar`: 更新示例代码 @anlyyao ([#417](https://github.com/Tencent/tdesign-mobile-vue/pull/417))
- `Dialog`: 更新示例代码 @LeeJim ([#422](https://github.com/Tencent/tdesign-mobile-vue/pull/422))
- `List`: 更新示例代码 @LeeJim ([#427](https://github.com/Tencent/tdesign-mobile-vue/pull/427))
- 移除部分工具函数使用 loadsh 代替 @LeeJim ([#419](https://github.com/Tencent/tdesign-mobile-vue/pull/419))

## 🌈 0.12.1 `2022-10-17` 
### 🚀 Features
- `Overlay`: 新增 `customStyle`属性，支持自定义遮罩样式 @anlyyao ([#403](https://github.com/Tencent/tdesign-mobile-vue/pull/403))

### 🐞 Bug Fixes
- `Search`: 修复 `shape` 属性无效的问题 @anlyyao ([#392](https://github.com/Tencent/tdesign-mobile-vue/pull/392))
- `Search`: 修复 `clear` 事件无效的问题 @anlyyao ([#392](https://github.com/Tencent/tdesign-mobile-vue/pull/392))
- `List`: 修复 `load-more` 可选参数问题 @byq1213 ([#376](https://github.com/Tencent/tdesign-mobile-vue/pull/376))
- `List`: 修复 `load-more` 可选参数问题 @byq1213 ([#376](https://github.com/Tencent/tdesign-mobile-vue/pull/376))
### 🚧 Others
- `Search`: 新增组件单元测试 @anlyyao ([#392](https://github.com/Tencent/tdesign-mobile-vue/pull/392))
- `Input`: 提升单元测试覆盖率 @anlyyao ([#399](https://github.com/Tencent/tdesign-mobile-vue/pull/399))
- `Textarea`: 提升单元测试覆盖率 @anlyyao ([#400](https://github.com/Tencent/tdesign-mobile-vue/pull/400))
- `Image`: 提升单元测试覆盖率 @anlyyao ([#401](https://github.com/Tencent/tdesign-mobile-vue/pull/401))
- `List`:  提升单元测试覆盖率 @byq1213 ([#376](https://github.com/Tencent/tdesign-mobile-vue/pull/376))
- `DateTimePicker`: 优化示例代码 @LeeJim ([#411](https://github.com/Tencent/tdesign-mobile-vue/pull/411))

## 🌈 0.12.0 `2022-10-10` 
### 🚀 Features

- `Cascader`: 新增级联选择器 @oceanlvr ([#368](https://github.com/Tencent/tdesign-mobile-vue/pull/368))
- `Cascader`: 优化逻辑和视觉 @LeeJim ([#395](https://github.com/Tencent/tdesign-mobile-vue/pull/395))

### 🐞 Bug Fixes
- `Slider`: 修复 `label` 属性无效的问题 @anlyyao ([#364](https://github.com/Tencent/tdesign-mobile-vue/pull/364))
- `Tabs`: 修复 `change` 事件和 `onChange` 属性无效的问题 @anlyyao ([#367](https://github.com/Tencent/tdesign-mobile-vue/pull/367))
- `Grid`: 修复 `gutter` 无效 @anlyyao ([#381](https://github.com/Tencent/tdesign-mobile-vue/pull/381))
- `Grid`: 修复 `border` 无效 @anlyyao ([#381](https://github.com/Tencent/tdesign-mobile-vue/pull/381))
- `DropdownMenu`: 修复 `onChange` 事件无效的问题 @anlyyao ([#374](https://github.com/Tencent/tdesign-mobile-vue/pull/374))
- `Rate`: 修复 ts 类型错误 @anlyyao ([#386](https://github.com/Tencent/tdesign-mobile-vue/pull/386))
- `NoticeBar`: 修复 content、extra 失效的问题 @TingShine ([#302](https://github.com/Tencent/tdesign-mobile-vue/pull/302))
- `NoticeBar`: 使用正确的 prefixIcon 插槽名 @anlyyao ([#393](https://github.com/Tencent/tdesign-mobile-vue/pull/393))

### 🚧 Others
- `Grid`: 提升测试覆盖率 @anlyyao ([#381](https://github.com/Tencent/tdesign-mobile-vue/pull/381))
- `Divider`: 提升测试覆盖率 @anlyyao ([#380](https://github.com/Tencent/tdesign-mobile-vue/pull/380))
- `Button`: 提升测试覆盖率 @anlyyao ([#379](https://github.com/Tencent/tdesign-mobile-vue/pull/379))
- `Badge`: 提升组件单元测试覆盖率 @anlyyao ([#388](https://github.com/Tencent/tdesign-mobile-vue/pull/388))
- `Skeleton`: 提升组件单元测试覆盖率 @anlyyao ([#387](https://github.com/Tencent/tdesign-mobile-vue/pull/387))
- `Rate`: 提升组件单元测试覆盖率 @anlyyao ([#386](https://github.com/Tencent/tdesign-mobile-vue/pull/386))
- `Radio`: 提升组件单元测试覆盖率 @anlyyao ([#385](https://github.com/Tencent/tdesign-mobile-vue/pull/385))
- `Slider`: 新增单元测试 @anlyyao ([#364](https://github.com/Tencent/tdesign-mobile-vue/pull/364))
- `SwipeCell`: 新增单元测试 @anlyyao ([#360](https://github.com/Tencent/tdesign-mobile-vue/pull/360))
- `Result`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Divider`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Grid`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Image`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Input`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Rate`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Radio`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Skeleton`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Cell`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Badge`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Avatar`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Tag`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Button`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Textarea`: 新增单元测试 @LadyChatterleyLover ([#280](https://github.com/Tencent/tdesign-mobile-vue/pull/280))
- `Steps`: 新增单元测试 @anlyyao ([#375](https://github.com/Tencent/tdesign-mobile-vue/pull/375))
- `DropdownMenu`: 新增单元测试 @anlyyao ([#374](https://github.com/Tencent/tdesign-mobile-vue/pull/374))

## 🌈 0.11.0 `2022-09-26` 
### 🚀 Features

- `Calendar`: 新增日历组件 @LadyChatterleyLover ([#325](https://github.com/Tencent/tdesign-mobile-vue/pull/325))
- `Calendar`: 视觉升级，功能增强 @LeeJim ([#366](https://github.com/Tencent/tdesign-mobile-vue/pull/366))

### 🐞 Bug Fixes
- `CountDown`: 修复 millisecond 配置无效的问题 @TingShine ([#313](https://github.com/Tencent/tdesign-mobile-vue/pull/313))
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
- `Stepper`: 修复输入非 `number` 字符时，出现 `NaN` 问题 @anlyyao ([#304](https://github.com/Tencent/tdesign-mobile-vue/pull/304))
- `Stepper`: 修复输入值能超出 `max` 的问题 @anlyyao ([#304](https://github.com/Tencent/tdesign-mobile-vue/pull/304))
- `Stepper`: 修复 `value` 值小于 `min` 或超出 `max` 时，不触发 `overlimit` 的问题 @anlyyao ([#304](https://github.com/Tencent/tdesign-mobile-vue/pull/304))
- `Collapse`: 修复 `headerRightContent` 插槽与文档描述不一致的问题 @isanxia ([#330](https://github.com/Tencent/tdesign-mobile-vue/pull/330))
### 🚧 Others
- `官网`: 更新浏览器兼容性说明文档 @anlyyao ([#349](https://github.com/Tencent/tdesign-mobile-vue/pull/349))

## 🌈 0.10.5 `2022-09-06` 
### 🚀 Features
- `Popup`: 新增 `customStyle` 和 `overlayProps` 属性 @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Popup`: 更新示例代码 @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Drawer`: 更新示例代码 @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Switch`: 更新示例代码 @anlyyao ([#307](https://github.com/Tencent/tdesign-mobile-vue/pull/307))
- `Switch`: 新增单元测试 @anlyyao ([#307](https://github.com/Tencent/tdesign-mobile-vue/pull/307))
### 🐞 Bug Fixes
- `Popup`: `closeOverlayClick`属性更名为 `closeOnOverlayClick` @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Drawer`: `closeOverlayClick`属性更名为 `closeOnOverlayClick` @anlyyao ([#296](https://github.com/Tencent/tdesign-mobile-vue/pull/296))
- `Dialog`: 修复 content 变更没有响应的问题 @TingShine ([#306](https://github.com/Tencent/tdesign-mobile-vue/pull/306))
- `ActionSheet`: 修复type=grid时没有触发 onSelected的问题 @HelKyle ([#317](https://github.com/Tencent/tdesign-mobile-vue/pull/317))
- `DateTimePicker`: 修复组件修改model无法双向绑定的问题；修复组件默认value为空时，无法正常滑动的问题；优化List组件demo展示；修复Upload组件无法正常上传文件的问题 @Dengzygx ([#344](https://github.com/Tencent/tdesign-mobile-vue/pull/344))
-  `List`: 优化List组件demo展示；修复Upload组件无法正常上传文件的问题 @Dengzygx ([#344](https://github.com/Tencent/tdesign-mobile-vue/pull/344))
- `Upload`: 修复Upload组件无法正常上传文件的问题 @Dengzygx ([#344](https://github.com/Tencent/tdesign-mobile-vue/pull/344))
### 🚧 Others
- style: update _common @anlyyao ([#308](https://github.com/Tencent/tdesign-mobile-vue/pull/308))
- fix: enrich coverage badge type @anlyyao ([#315](https://github.com/Tencent/tdesign-mobile-vue/pull/315))

## 🌈 0.10.4 `2022-08-22` 
### 🚀 Features
- `Search`: 内嵌 input 组件 type 调整为 search @VeryHandSomeBoy ([#293](https://github.com/Tencent/tdesign-mobile-vue/pull/293))
- `Drawer`: 新增 closeOnOverlayClick 属性 @deadlyAce ([#287](https://github.com/Tencent/tdesign-mobile-vue/pull/287))
- `Popup`: 新增 closeOnOverlayClick 属性 @deadlyAce ([#287](https://github.com/Tencent/tdesign-mobile-vue/pull/287))
### 🐞 Bug Fixes
- `Dialog`: 修复 `demo` 示例弹窗不显示问题 @zyqq ([#289](https://github.com/Tencent/tdesign-mobile-vue/pull/289))
- `Slider`: 修复滑块滑到最左侧时，左侧文本被遮挡 @HelKyle ([#286](https://github.com/Tencent/tdesign-mobile-vue/pull/286))
- `Search`: 修复传入默认值后需要点击才显示的问题 @VeryHandSomeBoy ([#292](https://github.com/Tencent/tdesign-mobile-vue/pull/292))
- `Search`: 修复不触发 focus 事件的问题 @VeryHandSomeBoy ([#292](https://github.com/Tencent/tdesign-mobile-vue/pull/292))

## 🌈 0.10.3 `2022-08-17` 
### 🐞 Bug Fixes
- `PulldownRefresh`: 修复下拉时偶尔失效的问题 @LeeJim ([#278](https://github.com/Tencent/tdesign-mobile-vue/pull/278))
- `List`: 修复list组件滚动无法触发scroll的问题 @Dengzygx ([#283](https://github.com/Tencent/tdesign-mobile-vue/pull/283))
### 🚧 Others
- test: update vitest config @anlyyao ([#272](https://github.com/Tencent/tdesign-mobile-vue/pull/272))

## 🌈 0.10.2 `2022-08-15` 
### 🚀 Features
- `ImageViewer`: 新增 maxZoom、closeBtn、onClose 属性 @ruige24601 ([#259](https://github.com/Tencent/tdesign-mobile-vue/pull/259))
- `ImageViewer`: 新增 close 事件 @ruige24601 ([#259](https://github.com/Tencent/tdesign-mobile-vue/pull/259))
- `Swiper`: 新增 `paginationPosition` 属性 @anlyyao ([#262](https://github.com/Tencent/tdesign-mobile-vue/pull/262))
### 🐞 Bug Fixes
- `Textarea`: 修复onchange事件会执行两次的问题 @Dengzygx ([#270](https://github.com/Tencent/tdesign-mobile-vue/pull/270))
- `Image`: 修复 src 变更没有重新渲染的问题 @VeryHandSomeBoy ([#264](https://github.com/Tencent/tdesign-mobile-vue/pull/264))

## 🌈 0.10.1 `2022-08-01` 
### 🐞 Bug Fixes
- `search`: 修复失去焦点后输入内容被隐藏和清除按钮无法使用的问题 @VeryHandSomeBoy ([#257](https://github.com/Tencent/tdesign-mobile-vue/pull/257))
- `Tabs`: 修复传入相同的值时仍触发 onChange 的问题 @VeryHandSomeBoy ([#254](https://github.com/Tencent/tdesign-mobile-vue/pull/254))
- `Popup`: 修复使用 overlay 组件没传入 visible 导致告警的问题 @LeeJim ([#251](https://github.com/Tencent/tdesign-mobile-vue/pull/251))
- `Dialog`: 修复 slot 渲染逻辑 @LeeJim ([#258](https://github.com/Tencent/tdesign-mobile-vue/pull/258))

## 🌈 0.10.0 `2022-07-25` 
### 🚀 Features
- `Skeleton`: 属性 theme 移除 avatar-text；新增 avatar、image、paragraph @anlyyao ([#239](https://github.com/Tencent/tdesign-mobile-vue/pull/239))
- `Result`: 新增结果组件 @anlyyao ([#243](https://github.com/Tencent/tdesign-mobile-vue/pull/243))
### 🐞 Bug Fixes
- `Button`: 修复 loading 值改变时，控制台报错 @anlyyao ([#247](https://github.com/Tencent/tdesign-mobile-vue/pull/247))
- `Skeleton`: 属性 rowCol 移除默认值 `[1, 1, 1, { width: 70% }]` @anlyyao ([#239](https://github.com/Tencent/tdesign-mobile-vue/pull/239))
- `Toast`: 修复指令调用时不现实图标的问题 @douxpang ([#241](https://github.com/Tencent/tdesign-mobile-vue/pull/241))
### 🚧 Others
- 官网更新组件分类 @LeeJim ([#248](https://github.com/Tencent/tdesign-mobile-vue/pull/248))
- `Skeleton`: 更新示例代码 @anlyyao ([#239](https://github.com/Tencent/tdesign-mobile-vue/pull/239))

## 🌈 0.9.2 `2022-07-18` 
### 🐞 Bug Fixes
- `DropdownMenu`: 修复树形状态下溢出时无法滚动的问题 @LeeJim ([#236](https://github.com/Tencent/tdesign-mobile-vue/pull/236))
- `Sticky`: 修复 fixed 状态下丢失宽度的问题 @LeeJim ([#237](https://github.com/Tencent/tdesign-mobile-vue/pull/237))
- `Skeleton`: 修复 props 变化不重新渲染的问题 @VeryHandSomeBoy ([#238](https://github.com/Tencent/tdesign-mobile-vue/pull/238))

## 🌈 0.9.1 `2022-07-12` 
### 🚀 Features
- `Toast`: 新增 overlayProps 属性透传至 overlay 组件，新增 showOverlay 属性控制遮罩层显示 @oceanlvr ([#204](https://github.com/Tencent/tdesign-mobile-vue/pull/204))
- `Button`: 支持 4 种类型 @anlyyao ([#218](https://github.com/Tencent/tdesign-mobile-vue/pull/218))
- `Overlay`: 新增组件 @LeeJim ([#223](https://github.com/Tencent/tdesign-mobile-vue/pull/223))
- `DropdownMenu`: 新增 toggle 方法用于切换菜单 @LeeJim ([#230](https://github.com/Tencent/tdesign-mobile-vue/pull/230))
- `Tag`: 升级样式以及支持左图标 @anlyyao ([#229](https://github.com/Tencent/tdesign-mobile-vue/pull/229))
### 🐞 Bug Fixes
- `Message`: 优化用法，支持 `v-model` @Dengzygx ([#216](https://github.com/Tencent/tdesign-mobile-vue/pull/216))
- `DateTimePicker`: 修复DateTimePicker组件value为空时无法正常展示的问题 @Dengzygx ([#215](https://github.com/Tencent/tdesign-mobile-vue/pull/215))
- `Search`: 修复 blur 事件参数返回错误的问题 @Dengzygx ([#217](https://github.com/Tencent/tdesign-mobile-vue/pull/217))
- `DropdownMenu`: 修复 dropdownmenu-item 的 label 不支持动态更新等问题 @krimeshu ([#220](https://github.com/Tencent/tdesign-mobile-vue/pull/220))
- `DropdownMenu`: 修复 radio、checkbox 样式问题 @LeeJim ([#219](https://github.com/Tencent/tdesign-mobile-vue/pull/219))

## 🌈 0.9.0 `2022-06-30` 

### ❗️ BREAKING CHANGES

- `Progress`: 移除 size 和 theme 属性 @anlyyao ([#179](https://github.com/Tencent/tdesign-mobile-vue/pull/179))
- `Picker`:重构`Picker`组件 @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
    - 移除子组件`<picker-item/>`，新增基于Picker开发的级联选择组件`<cascade />`
    - 新增`columns`，代表配置每一列的选项；新增`renderLabel`，用于自定义渲染label；新增`onPick`，选中任何一列时均会触发
    - 修改`onChange`，`onConfirm`的回调参数
- `DateTimePicker`:重构`DateTimePicker`组件 @Dengzygx ([#199](https://github.com/Tencent/tdesign-mobile-vue/pull/199))
    - 移除`disableDate`、`showWeek`
    - 新增`start`，用于设置最小可选时间；新增`end`，用于设置最大可选时间
    - 将`onColumnChange`改名为`onPick`，修改回调参数
    - 修改`onChange`，`onConfirm`的回调参数
- `Search`: @LeeJim ([#201](https://github.com/Tencent/tdesign-mobile-vue/pull/201))
  - 移除 `iconColor` 属性
  - `autofocus` 更名为 `focus`
  - `cancelButtonText` 更名为 `action`
  - 新增 `leftIcon` 支持左侧图标定制
  - 新增 `value` 和 `default-value` 控制输入框的值
  - `cancel` 事件更名为 `action-click`
  - 新增 `blur` 和 `focus` 事件
- `Collapse`: @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - `accordion` 更名为 `expandMutex`
  - 移除 `title`、`labelWidth` 属性
  - 新增 `disabled`、`expandIcon`、`onChange` 属性无效的问题
- `CollapsePanel`: @LeeJim ([#145](https://github.com/Tencent/tdesign-mobile-vue/pull/145))
  - `name` 更为为 `value`
  - `title` 更名为 `header`
  - `extra` 更名为 `headerRightContent`
  - 移除 `labelWidth`、`headerClickable` 属性
  - 新增 `default`、`expandIcon` 属性
  - 移除 `click` 事件
- `Drawer`:  @ruige24601 ([#190](https://github.com/Tencent/tdesign-mobile-vue/pull/190))
  - 移除 `slider` 属性
  - 新增 `items`、`placement`、`showOverlay`、`zIndex` 等属性
  - 新增 `close`、`item-click`、`overlay-click` 等事件
### 🚀 Features
- `Indexes`: 新增 Indexes 组件 @ruige24601 ([#117](https://github.com/Tencent/tdesign-mobile-vue/pull/117))
- `Input`: 新增支持 size 属性 @anlyyao ([#181](https://github.com/Tencent/tdesign-mobile-vue/pull/181))
- `Fab`: 新增支持 buttonProps 和 style 属性 @anlyyao ([#182](https://github.com/Tencent/tdesign-mobile-vue/pull/182))
- `Cell`: 新增支持 image 插槽 @anlyyao ([#184](https://github.com/Tencent/tdesign-mobile-vue/pull/184))
- `Rate`: 新增支持 gap 属性 @anlyyao ([#185](https://github.com/Tencent/tdesign-mobile-vue/pull/185))
- `Loading`: 新增支持 duration、inheritColor、pause、reverse 属性 @LeeJim ([#191](https://github.com/Tencent/tdesign-mobile-vue/pull/191))
- `Dialog`: @LeeJim ([#193](https://github.com/Tencent/tdesign-mobile-vue/pull/193))
  - 新增支持 actions 和 preventScrollThrough 属性 
  - 新增支持 支持 confirmBtn 和 cancelBtn 的插槽
- `Checkbox`: 新增支持 maxContentRow 和 maxLabelRow 属性 @anlyyao ([#195](https://github.com/Tencent/tdesign-mobile-vue/pull/195))
- `CheckboxGroup`: 新增支持 max 属性 @anlyyao ([#195](https://github.com/Tencent/tdesign-mobile-vue/pull/195))
- `Swiper`: 新增支持 minShowNum 属性 @anlyyao ([#197](https://github.com/Tencent/tdesign-mobile-vue/pull/197))
- `Upload`: @wwlh200 ([#205](https://github.com/Tencent/tdesign-mobile-vue/pull/205))
  - 新增 select-change 事件
  - 新增支持 allowUploadDuplicateFile 属性
### 🐞 Bug Fixes
- `Badge`: 修复 showZero 属性无效的问题 @renxm ([#141](https://github.com/Tencent/tdesign-mobile-vue/pull/141))
- `Badge`: 修复 maxCount 属性无效的问题 @robinWongM ([#142](https://github.com/Tencent/tdesign-mobile-vue/pull/142))
- `DropdownMenu`: 修复单选 update:value 失效的问题 @wwlh200 ([#146](https://github.com/Tencent/tdesign-mobile-vue/pull/146))
- `Radio`: 修复非受控用法错误的问题 @anlyyao ([#192](https://github.com/Tencent/tdesign-mobile-vue/pull/192))


## 🌈 0.8.6 `2022-05-30` 
### 🚀 Features
- `Indexes`: 新增 Indexes 组件 @ruige24601 ([#117](https://github.com/Tencent/tdesign-mobile-vue/pull/117))
- `ActionSheet`: 新增 ActionSheet 组件 @Dengzygx ([#121](https://github.com/Tencent/tdesign-mobile-vue/pull/121))
- `Icon`: 更新图标 新增`file-icon`图标 调整`file-excel`、`file-pdf`、`file-powerpoint`、`file-unknown`、`file-word`和`star-filled`图标的绘制路径 @uyarn ([#111](https://github.com/Tencent/tdesign-mobile-vue/pull/111))
### 🐞 Bug Fixes
- `Textarea`: 修复label不生效问题；样式优化 @anlyyao ([#107](https://github.com/Tencent/tdesign-mobile-vue/pull/107))
- `Badge`: 修复组件设置 color 属性无效问题 @Calvest ([#125](https://github.com/Tencent/tdesign-mobile-vue/pull/125))
- `Swiper`: 支持通过修改loop值关闭循环 @MarvenGong ([#108](https://github.com/Tencent/tdesign-mobile-vue/pull/108))
### 🚧 Others
- Refactor: 将 mask 重命名为 overlay @LeeJim ([#113](https://github.com/Tencent/tdesign-mobile-vue/pull/113))
- Refactor: 重构Progress组件，Api更新 @anlyyao ([#116](https://github.com/Tencent/tdesign-mobile-vue/pull/116))
- Refactor: 重构 Slider 组件 @LeeJim ([#115](https://github.com/Tencent/tdesign-mobile-vue/pull/115))
- Refactor: 重构 NoticeBar 组件 @xia7187 ([#99](https://github.com/Tencent/tdesign-mobile-vue/pull/99))
- feat: 站点支持搜索 @HQ-Lin ([#120](https://github.com/Tencent/tdesign-mobile-vue/pull/120))

## 0.8.5 `2022-04-29`


### Bug Fixes

* **Indexes:** 暂时从菜单栏中移除
* **Picker:** 修复组件demo点击取消,无法收起蒙层问题
* **DateTimePicker:** 修复组件传参错误问题、修复组件无法触发change事件问题
* **Textarea:** 修复组件类名错误问题

### Features
* **Icon:** 完善组件文档

## 0.8.4 `2022-04-15`


### Bug Fixes

* **Swiper:** 修复动态绑定时出错问题
* **List:** 修复组件demo代码运行出错的问题
* **Input:** compositionend优化


### Features

* **Tabs:** 新增stickyProps，支持滚动到顶部时自动吸顶
* **PullDownRefresh:** loadingBarHeight属性支持string类型，代码优化

## 0.8.2 `2022-04-08`


### Bug Fixes
* **tabs:** label支持动态修改，以及新增支持slot的方式 
* **popup:** 修复teleport失效问题


## 0.8.1 `2022-04-02`

### Bug Fixes

* **count-down:** 单位样式bug修复、倒计时加入fps获取
* **swiper:** 快速滑动导致卡住问题
* **picker:** 组件demo修复
* **swipe-cell:** 修改组件示例，和demo保持一致


### Features

* 加入ci拼写检查报错
* 支持历史版本跳转
* **dropdown-menu:** 更新组件的模板类型处理

## 0.8.0 `(2022-03-17)`


### Bug Fixes
* **dropdown-menu:** 移除冗余的dom结构 ecba97f
* **search:** 修复样式丢失问题, close #29 ac1dd2a, closes #29
* **input** 修复输入框样式丢失问题
* **grid** 修复grid-item样式丢失问题


### Features
* 新增pull-down-refresh组件 6f1c8a7


## 0.7.0 `(2022-03-14)`

### BREAKING CHANGES

* **count-down**支持主题和大小 3f0a5e5

### Bug Fixes

* **dialog**弹出框蒙层点击是否关闭修复 & provide暴露$dialog, close #12 11092af, closes #12
* 修复Badge导入类型 d4f8da6

### Features

* 新增BackTop组件 fb61e74

## 0.6.2 `(2022-03-03)`

### Bug Fixes

* 修复缺失的组件引用 `bug #149`
* **dialog:** buttons layout 92944ee
* **steps** 设计修改样式对齐 38ca336
* **swiper:** 非空Props的处理
* **tabbar:** 调整demo默认值使用
* **input** modelValue绑定丢失的问题 `bug #151`

## 0.6.1 `(2022-02-28)`


### Bug Fixes

* **avatar:** 移除完全一样的逻辑实现
* **demo:** 修复demo展示问题&移除indexes
* **picker:** 修复picker的错误
* **steps** steps只读demo不可点击问题修复
* **swiper:** 修复类型错误
* **tabs:** 移除顶部transform
* **toast:** 修复遮罩禁止滑动不生效的问题

### Features

* 新增 stackblitz 支持
* 引入vueuse, 优化代码逻辑
* 优化图片懒加载方案
* 新增Image、Sticky、Skeleton、Grid、List、Loading组件
* 引入useDefault处理受控和非受控逻辑
* 引入useEmitEvent处理事件逻辑:stepper, image
* 移除mapprops高阶组件
* 处理props对于可空类型的判断ts提示问题
* Stepper增加overlimit支持

### BREAKING CHANGES

* **datetimepicker:** 改变API由position为placement

## 0.5.0 `(2022-01-23)`

### Bug Fixes

* **tag:** 更新tag样式light-outline 1e051bd
* **picker:** 修复默认值非第一个时的滚动错误 1ff7183
* **avatar:** 修复size和dot的支持 class 57fe446
* **cell:** icon对齐的问题 7c71689
* **checkbox:** 组件对齐的问题 78f5bb0
* **dialog:** 修复dialog插件类型错误 f7983d7
* **dropdown-menu:** 修复单选项目 update:value 失效的问题 68e62bd, 修复一些特殊场景出现的问题 ffc2f4e
* **input:** 修复点击事件丢失问题 31f1a39
* **radio:** 修复radio的文本点击事件丢失问题 3664b5f
* **rate:** 修复视觉走查 b7bd53a
* **swiper:** 添加圆角支持 69aa8e5

### Features

* 完善avatar组件
* 完善picker默认值以及demo fa1983a
* 添加useDefault（支持受控和非受控逻辑）支持setInnerValue  dc8262d
* checkbox and check-group结构调整 fe53611
* picker-item的value变化时，picker及时更新 5b12841

## 0.4.1 `(2022-01-06)`

### Bug Fixes

* Swiper: 修复Swiper宽度计算问题 cc2d012
* typo e25903a

### Features

* Avatar: 添加Avatar组件
* 更新BEM规范 7c59f2b,5637f7e
* 迁移 md & 优化细节 e4c28fa,048a9aa,799fc08
* 添加 codesandbox 5fea71d, e93e416

## 0.4.0 `(2021-12-27)`

### Features

* **switch:** use emitEvent ([1700a72](http:///tdesign-mobile-vue/commits/1700a722c896c43658512de36b7235f6655981ae))
* 补充 package.json 信息，使用 cli 处理发布日志 ([eb4fa42](http:///tdesign-mobile-vue/commits/eb4fa42df755749bfbd48f9cf9dc591f8bb00b49))
* 调整 common & types目录 ([227e7dd](http:///tdesign-mobile-vue/commits/227e7dd2c67448d6c30cf325c72ae6967d63779c))
* 调整贡献者名单位置 ([c92c5c9](http:///tdesign-mobile-vue/commits/c92c5c9b63a6a4e60bf093c28e66dc550d1bfcd7))
* 新增 Countdown、 Swiper组件

### BREAKING CHANGES

* 对齐已发布组件的API能力
