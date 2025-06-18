---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

## 🌈 1.9.1 `2025-06-13` 
### 🚀 Features
- `BackTop`: 支持自动向上寻找滚动元素 @novlan1 ([#1870](https://github.com/Tencent/tdesign-mobile-vue/pull/1870))
- `Fab`: 
  - 扩展 `style` 属性类型，避免警告 @novlan1 ([#1865](https://github.com/Tencent/tdesign-mobile-vue/pull/1865))
  - 支持使用默认插槽自定义悬浮按钮内容，此时 `buttonProps`、`icon` 和 `text` 属性将失效 @novlan1 ([#1851](https://github.com/Tencent/tdesign-mobile-vue/pull/1851))
- `Input`:
  - 新增 `extra` 插槽，用于自定义右侧额外的信息 @anlyyao ([#1877](https://github.com/Tencent/tdesign-mobile-vue/pull/1877))
  - 新增 `validate` 事件，字数超出限制时触发 @Tomaolala ([#1747](https://github.com/Tencent/tdesign-mobile-vue/pull/1747))
### 🐞 Bug Fixes
- `Cascader`: 
  - 选项源支持 `number`类型 @novlan1 ([#1871](https://github.com/Tencent/tdesign-mobile-vue/pull/1871))
  - 修复三级懒加载问题 @novlan1 ([#1872](https://github.com/Tencent/tdesign-mobile-vue/pull/1872))
  - 修复开启 `checkStrictly`，懒加载时选中值丢失的问题 @novlan1 ([#1873](https://github.com/Tencent/tdesign-mobile-vue/pull/1873))
- `PullDownRefresh`: 修复 `Swiper` 内嵌 `PullDownRefresh` 无法左右滑动 @mikasayw ([#1821](https://github.com/Tencent/tdesign-mobile-vue/pull/1821))


## 🌈 1.9.0 `2025-06-04` 
### 🚀 Features
- `ColorPicker`: 新增 `ColorPicker` 组件 @novlan1 ([#1761](https://github.com/Tencent/tdesign-mobile-vue/pull/1761))
- `DateTimePicker`: 新增 `steps` 属性、`header` 和 `footer` 插槽 @betavs ([#1848](https://github.com/Tencent/tdesign-mobile-vue/pull/1848)) @novlan1 ([#1861](https://github.com/Tencent/tdesign-mobile-vue/pull/1861))
- `Popup`: 支持 `duration` 动画时长 @liweijie0812 ([#1736](https://github.com/Tencent/tdesign-mobile-vue/pull/1736))
- `Cascader`: 新增 `middleContent`，用于自定义中间区域内容 @novlan1 ([#1860](https://github.com/Tencent/tdesign-mobile-vue/pull/1860))
### 🐞 Bug Fixes
- `ConfigProvider`: 修复全局配置类型提示错误 @anlyyao ([#1852](https://github.com/Tencent/tdesign-mobile-vue/pull/1852))
- `DropdownMenu`:  修复自定义 `duration` 无效 @liweijie0812 ([#1736](https://github.com/Tencent/tdesign-mobile-vue/pull/1736))
- `Picker`: 修复二次滚动位置偏移的问题 @novlan1 ([#1859](https://github.com/Tencent/tdesign-mobile-vue/pull/1859))

## 🌈 1.8.5 `2025-05-13` 
### 🚀 Features
- `Navbar`: 新增 `safeAreaInsetTop`，是否开启顶部安全区适配 @anlyyao ([#1834](https://github.com/Tencent/tdesign-mobile-vue/pull/1834))
- `PullDownRefresh`: 新增 `disabled` 属性 @anlyyao ([#1844](https://github.com/Tencent/tdesign-mobile-vue/pull/1844))
### 🐞 Bug Fixes
- `Message`: 修复项目引入 `amfe-flexible` 包后，组件样式不兼容 @anlyyao ([#1845](https://github.com/Tencent/tdesign-mobile-vue/pull/1845))

## 🌈 1.8.4 `2025-04-25` 
### 🚀 Features
- `Icon`: 新增 `logo-miniprogram`、`logo-cnb`、`seal`、`quote` 图标 @taowensheng1997 @uyarn ([#1827](https://github.com/Tencent/tdesign-mobile-vue/pull/1827))
- `Progress`: 新增 `size` 属性，仅在环形进度条有效 @liweijie0812 ([#1824](https://github.com/Tencent/tdesign-mobile-vue/pull/1824))
### 🐞 Bug Fixes
- `Icon`: 优化多个文件相关图标的绘制效果，修复 `gesture-right-slip` 的绘制问题@uyarn([#1827](https://github.com/Tencent/tdesign-mobile-vue/pull/1827))
- `Slider`: `marks` 属性不支持 `()=>TNode` 渲染的问题  @betavs ([#1811](https://github.com/Tencent/tdesign-mobile-vue/pull/1811))
### 🚧 Others
- `site`: 站点接入主题生成器 @RylanBot ([#1815](https://github.com/Tencent/tdesign-mobile-vue/pull/1815))

## 🌈 1.8.3 `2025-03-23` 
### 🚀 Features
- `Icon`: 更新图标版本至 `0.3.5`([#1808](https://github.com/Tencent/tdesign-mobile-vue/pull/1808))
- `Toast`: 新增 `warning` 主题 @betavs ([#1806](https://github.com/Tencent/tdesign-mobile-vue/pull/1806))
### 🐞 Bug Fixes
- `Input`:  修复 `v-model` 初始值为 `undefined` 时无法响应式更新 @anlyyao ([#1782](https://github.com/Tencent/tdesign-mobile-vue/pull/1782))
- `Swiper`: 修复 `loop` 属性为 `false` 时，首个及最后一个滑动项闪烁的问题 @mikasayw ([#1781](https://github.com/Tencent/tdesign-mobile-vue/pull/1781))
- `Message`: 修复函数式调用时 `onCloseBtnClick` 属性无效 @anlyyao ([#1790](https://github.com/Tencent/tdesign-mobile-vue/pull/1790))
- `PullDownRefresh`: 修复非顶部下拉出现刷新事件触发的问题 @RSS1102 ([#1805](https://github.com/Tencent/tdesign-mobile-vue/pull/1805))

### 🚧 Others
- fix: 修复 cjs bundle 的依赖报错问题 @anlyyao ([#1777](https://github.com/Tencent/tdesign-mobile-vue/pull/1777))

## 🌈 1.8.2 `2025-02-19` 
### 🐞 Bug Fixes
- `TabBar`: 修复控制台告警，优化子节点数量更新逻辑 @anlyyao ([#1767](https://github.com/Tencent/tdesign-mobile-vue/pull/1767))
- `Picker`: 修复 `columns` 为异步数据时，子项无法选中的问题 @anlyyao ([#1769](https://github.com/Tencent/tdesign-mobile-vue/pull/1769))

## 🌈 1.8.1 `2025-02-18` 
### 🚀 Features
- `Calendar`: 新增 `switchMode` 属性 @novlan1 ([#1744](https://github.com/Tencent/tdesign-mobile-vue/pull/1744))
- `Checkbox`: `CheckboxGroup` 增加 `keys` 和 `readonly` 属性 @anlyyao ([#1749](https://github.com/Tencent/tdesign-mobile-vue/pull/1749))
- `Cascader`: 增强 `keys` 属性能力，类型更新为 `TreeKeysType`；`pick` 事件返回值增加 `label` @anlyyao ([#1749](https://github.com/Tencent/tdesign-mobile-vue/pull/1749))
- `Radio`: 增强 `keys` 属性能力 @anlyyao ([#1749](https://github.com/Tencent/tdesign-mobile-vue/pull/1749))
- `Dropdown`: 增强 `Dropdown` 的 `keys` 属性能力 @anlyyao ([#1749](https://github.com/Tencent/tdesign-mobile-vue/pull/1749))
- `Picker`:  新增 `keys` 属性 @anlyyao ([#1757](https://github.com/Tencent/tdesign-mobile-vue/pull/1757))
- `Checkbox`: `CheckboxGroup` 新增 `borderless` 属性 @novlan1 ([#1752](https://github.com/Tencent/tdesign-mobile-vue/pull/1752))
- `Fab`: 增强 `draggable` 属性能力，并新增 `yBounds` 属性 @novlan1 ([#1751](https://github.com/Tencent/tdesign-mobile-vue/pull/1751))
- `Picker`: 补充禁用项逻辑 @anlyyao ([#1763](https://github.com/Tencent/tdesign-mobile-vue/pull/1763))
### 🐞 Bug Fixes
- `Tabs`: 修复 `vModel` 无效 @anlyyao ([#1748](https://github.com/Tencent/tdesign-mobile-vue/pull/1748))
- `Slider`: 修复 `marks` 响应式无效 @liweijie0812 ([#1739](https://github.com/Tencent/tdesign-mobile-vue/pull/1739))
- `DropdownMenu`: 解决收起状态下 `onMenuClosed` 仍被触发的问题 @anlyyao ([#1755](https://github.com/Tencent/tdesign-mobile-vue/pull/1755))
- `Search`: 修复 `action-click` 事件无效 @anlyyao ([#1764](https://github.com/Tencent/tdesign-mobile-vue/pull/1764))


## 🌈 1.8.0 `2025-01-22` 
### 🚀 Features
- `Input`: 新增 `cursorColor` 属性 @SkylerXie ([#1703](https://github.com/Tencent/tdesign-mobile-vue/pull/1703))
- `Icon`:  更新图标库版本至 `0.3.4`，新增 `logo-alipay`、`logo-behance-filled` 等图标，修改 `logo-wecom` 图标，移除不合理的 `logo-wecom-filled` 图标 @anlyyao ([#1715](https://github.com/Tencent/tdesign-mobile-vue/pull/1715))
- `ActionSheet`: 新增 `showOverlay` 和 `popupProps` 属性 @hensonjunyuan ([#1704](https://github.com/Tencent/tdesign-mobile-vue/pull/1704))
- `Tabs`: 新增 `split` 和 `middle` 属性，并支持自动定位到激活项位置 @Faxxicy ([#1663](https://github.com/Tencent/tdesign-mobile-vue/pull/1663))  @novlan1 ([#1727](https://github.com/Tencent/tdesign-mobile-vue/pull/1727))
- `Tab`: `TabPanel` 新增 `icon` 属性 @novlan1 ([#1727](https://github.com/Tencent/tdesign-mobile-vue/pull/1727))
- `Grid`: 新增 `hover` 属性 @novlan1 ([#1725](https://github.com/Tencent/tdesign-mobile-vue/pull/1725))
- `Grid`: `GridItem` 新增 `icon` 属性 @novlan1 ([#1725](https://github.com/Tencent/tdesign-mobile-vue/pull/1725))
- `Search`: 新增  `clearTrigger` 属性 @novlan1 ([#1726](https://github.com/Tencent/tdesign-mobile-vue/pull/1726))
### 🐞 Bug Fixes
- `Tabs`: 当子项类型为 `fragment` 时，标签无法正确渲染 @betavs ([#1690](https://github.com/Tencent/tdesign-mobile-vue/pull/1690))
- `Radio`: 当`value=0` 时无法被选中的问题 @RSS1102 ([#1709](https://github.com/Tencent/tdesign-mobile-vue/pull/1709))
- `Checkbox`: 修复 `CheckGroup` 使用 `options` 属性时 `disabled` 无效的问题 @anlyyao ([#1713](https://github.com/Tencent/tdesign-mobile-vue/pull/1713))
- `TabBar`: 修复子项数量大于 3 时子项宽度未保持一致 @anlyyao ([#1714](https://github.com/Tencent/tdesign-mobile-vue/pull/1714))
- `Dialog`: 修复圆角样式错误，并新增 `--td-dialog-border-radius` @anlyyao ([#1733](https://github.com/Tencent/tdesign-mobile-vue/pull/1733))
- `Popup`: 修复圆角错误，并新增 `--td-popup-close-btn-color` @anlyyao ([#1734](https://github.com/Tencent/tdesign-mobile-vue/pull/1734))
- `Cell`: 修复部分样式错误，并更新 `align` 属性描述 @liweijie0812 ([#1731](https://github.com/Tencent/tdesign-mobile-vue/pull/1731))

## 🌈 1.7.0 `2024-12-19` 
### 🚀 Features
- `IDE`: 增加 `Volar`、`WebStorm` 提示文件 @liweijie0812 ([#1682](https://github.com/Tencent/tdesign-mobile-vue/pull/1682))
- `Image`: 新增 `fallback` 属性，图片加载失败时，显示当前链接设置的图片地址；新增 `img` 原生标签属性 `referrerpolicy` @liweijie0812 ([#1647](https://github.com/Tencent/tdesign-mobile-vue/pull/1647))
- `Input`: 新增 `enterkeyhint` API， 用于控制回车键样式，此 API 仅在部分浏览器支持 @liweijie0812 ([#1651](https://github.com/Tencent/tdesign-mobile-vue/pull/1651))
- `Search`: 新增 `maxcharacter` 、`maxlength` 和 `resultList` 属性，`action` 触发方式调整为聚焦后触发 @RSS1102 ([#1681](https://github.com/Tencent/tdesign-mobile-vue/pull/1681))
- `Radio`: `RadioGroup` 新增 `readonly` 属性 @liweijie0812 ([#1674](https://github.com/Tencent/tdesign-mobile-vue/pull/1674))
- `Dropdown`: `DropdownItem` 新增 `placement` 属性 @liweijie0812 ([#1675](https://github.com/Tencent/tdesign-mobile-vue/pull/1675))
### 🐞 Bug Fixes
- `Dialog`: 修复 `cancelBtn` 和 `confirmBtn` 插槽不生效 @liweijie0812 ([#1668](https://github.com/Tencent/tdesign-mobile-vue/pull/1668))
- `ConfigProvider`: 修复全局配置丢失响应式问题 @Rococoscarlet ([#1670](https://github.com/Tencent/tdesign-mobile-vue/pull/1670))
- `Swiper`: 修复 `current` 受控时表现 @novlan1 ([#1661](https://github.com/Tencent/tdesign-mobile-vue/pull/1661))
- `Input`: 修复 `maxlength` 对 `Unicode` 字符计算不准确问题 @anlyyao ([#1683](https://github.com/Tencent/tdesign-mobile-vue/pull/1683))
- `Textarea`: 修复 `maxlength` 对 `Unicode` 字符计算不准确问题 @anlyyao ([#1684](https://github.com/Tencent/tdesign-mobile-vue/pull/1684))
- `Search`: 设置 `enterkeyhint` 值为 `search` ，点击搜索时，收起键盘 @novlan1 ([#1655](https://github.com/Tencent/tdesign-mobile-vue/pull/1655))
- `Form`: 补齐 `FormInstanceFunctions`  缺失的 `validateOnly` 事件 @anlyyao ([#1688](https://github.com/Tencent/tdesign-mobile-vue/pull/1688))
- `Table`: 修复 `onScroll` 事件无效 @anlyyao ([#1687](https://github.com/Tencent/tdesign-mobile-vue/pull/1687))
### 🚧 Others
- `Drawer`: TS 类型 `TriggerSource` 更名为 `DrawerTriggerSource` @liweijie0812 ([#1660](https://github.com/Tencent/tdesign-mobile-vue/pull/1660))

## 🌈 1.6.0 `2024-11-19` 
### 🚀 Features
- `Popup`: `sfc` to `tsx` @betavs ([#1401](https://github.com/Tencent/tdesign-mobile-vue/pull/1401))
- `Upload`: 新增 `capture` 与 `preview` 属性 @anlyyao ([#1644](https://github.com/Tencent/tdesign-mobile-vue/pull/1644))  ([#1645](https://github.com/Tencent/tdesign-mobile-vue/pull/1645))
- `Icon`: 更新图标版本到 `0.3.0`。新增 907 个新图标；命名优化`blockchain` 重命名改为`transform-1`,`gesture-pray-1`重命名为`gesture-open`,`gesture-ranslation-1`重命名为`wave-bye`, `gesture-up-1`重命名为`gesture-typing`,`gesture-up-2`重命名为`gesture-right-slip`,`logo-wechat`重命名为`logo-wechat-stroke-filled`，移除`tree-list`、`logo-adobe-photoshop-1` 等错误图标 @liweijie0812 ([#1639](https://github.com/Tencent/tdesign-mobile-vue/pull/1639))
### 🐞 Bug Fixes
- `Tabs`: 修复无法自动滚动到激活选项的问题 @Lyan-u ([#1627](https://github.com/Tencent/tdesign-mobile-vue/pull/1627))
- `ImageViewer`: 修复`onIndexChange` 返回值错误 @liweijie0812 ([#1637](https://github.com/Tencent/tdesign-mobile-vue/pull/1637))
- `CountDown`: 修复标签页置于后台，倒计时停止问题 @hkaikai ([#1631](https://github.com/Tencent/tdesign-mobile-vue/pull/1631))
- `Form`: 修复失焦时不触发表单校验的问题 @liweijie0812 ([#1640](https://github.com/Tencent/tdesign-mobile-vue/pull/1640))

### 📈 Performance
- `Collapse`: 优化 `CollapsePanel` 折叠动画 @huxinhai ([#1591](https://github.com/Tencent/tdesign-mobile-vue/pull/1591))
- `useLockScroll`: 修复多组件同时使用 `preventScrollThrough` 导致页面无法滚动的问题 @hkaikai ([#1628](https://github.com/Tencent/tdesign-mobile-vue/pull/1628))

## 🌈 1.5.0 `2024-10-18` 
### 🚀 Features
- `Cascader`: `sfc` 改 `tsx` @anlyyao ([#1620](https://github.com/Tencent/tdesign-mobile-vue/pull/1620))
- `Picker`: 新增 `option` 属性，支持自定义选项内容 @anlyyao ([#1623](https://github.com/Tencent/tdesign-mobile-vue/pull/1623))
### 🐞 Bug Fixes
- `ImageViewer`: 补充图片默认样式 @anlyyao ([#1617](https://github.com/Tencent/tdesign-mobile-vue/pull/1617))
- `Textarea`: 修复指示器不更新问题 @anlyyao ([#1615](https://github.com/Tencent/tdesign-mobile-vue/pull/1615))
- `Cascader`: 修复 `value` 及 `options` 动态变更时页面未响应，`close` 事件返回值类型错误等问题 @anlyyao ([#1620](https://github.com/Tencent/tdesign-mobile-vue/pull/1620))
- `Calendar`: 修复 `confirmBtn` 值为 `null` 时仍显示确认按钮的问题 @GaoJiuJiu ([#1621](https://github.com/Tencent/tdesign-mobile-vue/pull/1621))
- `Indexes`: 修复索引及列表内容为异步数据时，索引链接失效的问题 @anlyyao ([#1622](https://github.com/Tencent/tdesign-mobile-vue/pull/1622))
- `fix`:  修复使用 `import "tdesign-mobile-vue/esm/style/index.js"; ` 引入组件库全局样式资源时，资源路径不存在的问题 @anlyyao ([#1624](https://github.com/Tencent/tdesign-mobile-vue/pull/1624))
### 🚧 Others
- `other`: 单独导出涉及 Plugin 相关组件的样式，支持修改类名前缀的部分场景使用 @anlyyao ([#1616](https://github.com/Tencent/tdesign-mobile-vue/pull/1616))

## 🌈 1.4.3 `2024-09-26` 
### 🚀 Features
- `Radio`: 新增 `readonly`属性 ，配置只读  @liweijie0812 ([#1593](https://github.com/Tencent/tdesign-mobile-vue/pull/1593))
- `Radio`: `RadioGroup` 的 `change` 事件回调添加 `name` 属性 @liweijie0812 ([#1593](https://github.com/Tencent/tdesign-mobile-vue/pull/1593))
- `ConfigProvider`: 支持全局配置修改全部组件的 `classPrefix`  @anlyyao ([#1596](https://github.com/Tencent/tdesign-mobile-vue/pull/1596))
- `Input`: 支持 `format` 属性 @anlyyao ([#1602](https://github.com/Tencent/tdesign-mobile-vue/pull/1602))
### 🐞 Bug Fixes
- `Cell`: 修复部分 css vars 无效的问题 @anlyyao ([#1599](https://github.com/Tencent/tdesign-mobile-vue/pull/1599))
- `Popup`: 修复 `destroyOnClose` 为 `true` 时动画无效的问题 @anlyyao ([#1600](https://github.com/Tencent/tdesign-mobile-vue/pull/1600))
- `DropdownMenu`: 修复部分机型中向上展开样式错误 @anlyyao ([#1603](https://github.com/Tencent/tdesign-mobile-vue/pull/1603))
- `Slider`: 修复在 `hidden` 元素中组件显示异常 @anlyyao ([#1604](https://github.com/Tencent/tdesign-mobile-vue/pull/1604))

## 🌈 1.4.2 `2024-09-13` 
### 🚀 Features
- `Avatar`: `AvatarGroup` 新增 `shape` 属性，新增 `onCollapsedItemClick` 事件 @anlyyao ([#1571](https://github.com/Tencent/tdesign-mobile-vue/pull/1571))
- `Checkbox`: 支持 `readonly` 只读 @liweijie0812 ([#1578](https://github.com/Tencent/tdesign-mobile-vue/pull/1578))
### 🐞 Bug Fixes
- `Collapse`: 修复 `CollapsePanel` 展开态时内容动态变更，高度无法自适应的问题 @huxinhai ([#1570](https://github.com/Tencent/tdesign-mobile-vue/pull/1570))
- `Avatar`: 修复 `AvatarGroup` 的 `size` 属性无效的问题，优化 `zIndex` 处理 @anlyyao ([#1571](https://github.com/Tencent/tdesign-mobile-vue/pull/1571))
- `indexes`: 修复索引为数字字符串时侧边栏不能正常激活，并优化索引吸顶时锚点切换效果  @Lyan-u ([#1577](https://github.com/Tencent/tdesign-mobile-vue/pull/1577))
- `Radio`: 修复 `allowUncheck` 属性无效 @anlyyao ([#1582](https://github.com/Tencent/tdesign-mobile-vue/pull/1582))
- `Button`: 修复禁用时仍有 `hover` 态以及 `dashed` 按钮 `hover` 样式错误等问题 @anlyyao ([#1583](https://github.com/Tencent/tdesign-mobile-vue/pull/1583))
- `Picker`: 修复自定义高度时滚动参数异常 @jby0107 ([#1576](https://github.com/Tencent/tdesign-mobile-vue/pull/1576))

## 🌈 1.4.1 `2024-09-02` 
### 🚧 Others
- chore: 修复 `1.4.0` es module 入口文件错误 @liweijie0812 ([#1566](https://github.com/Tencent/tdesign-mobile-vue/pull/1566))

## 🌈 1.4.0 `2024-08-30` 
### 🚀 Features
- `Collapse`: `Collapse` 支持`destroyOnCollapse` 配置折叠状态时，是否销毁面板内容 @liweijie0812 ([#1550](https://github.com/Tencent/tdesign-mobile-vue/pull/1550))
- `Icon`:  图标库版本升级为 `0.2.6` ，`lock-on` 图标存在更新 @liweijie0812 ([#1552](https://github.com/Tencent/tdesign-mobile-vue/pull/1552))
- `Toast`:  `ToastPlugin` 支持 `attach`、`className` 和 `style` 属性 @anlyyao ([#1555](https://github.com/Tencent/tdesign-mobile-vue/pull/1555))
- `Picker`: `columns` 属性扩展 `PickerColumn` 类型，支持一维数组 @anlyyao ([#1556](https://github.com/Tencent/tdesign-mobile-vue/pull/1556))
### 🐞 Bug Fixes
- `Badge`: 修复 `count` 插槽位置错误，移除 `t-badge__ribbon--before` 元素与 `t-badge__ribbon--after` 节点，角标改用伪元素实现 @anlyyao ([#1539](https://github.com/Tencent/tdesign-mobile-vue/pull/1539))
- `DropdownMenu`: 修复 `DropdownMenuItem` 的 `label` 优先级错误，属性值优先级高于选中子项 @anlyyao ([#1547](https://github.com/Tencent/tdesign-mobile-vue/pull/1547))
- `DropdownMenu`: 修复 `menuOpened` 和 `menuClosed` 事件无效 @anlyyao ([#1555](https://github.com/Tencent/tdesign-mobile-vue/pull/1555))
- `Button`: 修复 `dashed` 类型按钮样式错误 @tobytovi ([#1534](https://github.com/Tencent/tdesign-mobile-vue/pull/1534))
- `Loading`: 修复按需加载时组件动画缺失 @anlyyao ([#1907](https://github.com/Tencent/tdesign-common/pull/1907))
### 🚧 Others
- `SideBar`: 完善 `SideBarItem` 的 `badgeProps` TS 类型 @liweijie0812 ([#1546](https://github.com/Tencent/tdesign-mobile-vue/pull/1546))

## 🌈 1.3.4 `2024-08-08` 
### 🚀 Features
- `ImageViewer`: 优化预加载逻辑 @QuentinHsu ([#1516](https://github.com/Tencent/tdesign-mobile-vue/pull/1516))
- `Fab`: 新增 `draggable` 属性，支持拖拽 @novlan1 ([#1527](https://github.com/Tencent/tdesign-mobile-vue/pull/1527))
### 🐞 Bug Fixes
- `Cell`: 修复禁用 `Hover` 不生效 @liweijie0812 ([#1519](https://github.com/Tencent/tdesign-mobile-vue/pull/1519))
- `Dialog`: 修复函数式调用 `Dialog` 时关闭按钮不生效 @QuentinHsu ([#1513](https://github.com/Tencent/tdesign-mobile-vue/pull/1513))
- `NoticeBar`: 修复滚动内容宽度获取错误 @anlyyao ([#1860](https://github.com/Tencent/tdesign-common/pull/1860))

## 🌈 1.3.3 `2024-07-23` 
### 🚀 Features
- `Rate`: 新增 `placement` 属性， 支持配置评分弹框的位置 @liweijie0812 ([#1501](https://github.com/Tencent/tdesign-mobile-vue/pull/1501))
- `Guide`: `sfc` 改 `tsx` @zuiaiwanqian ([#1471](https://github.com/Tencent/tdesign-mobile-vue/pull/1471))
- `SwipeCell`: `sfc` 改 `tsx` @liweijie0812 ([#1499](https://github.com/Tencent/tdesign-mobile-vue/pull/1499))
### 🐞 Bug Fixes
- `Link`:  修复禁用优先级问题 @liweijie0812 ([#1502](https://github.com/Tencent/tdesign-mobile-vue/pull/1502))
- `Popup`: 处理窗体类组件隐藏时 `t-popup-overflow-hidden` 等类名未移除的问题 @QuentinHsu ([#1504](https://github.com/Tencent/tdesign-mobile-vue/pull/1504))

## 🌈 1.3.2 `2024-07-11` 
### 🚀 Features
- `Icon`: 新增 `list-numbered`、`lock-off-filled`、`lock-on-filled` 等 3 个图标 @liweijie0812 ([#1488](https://github.com/Tencent/tdesign-mobile-vue/pull/1488))
- `Input`: 新增 `clearTrigger` 支持调整清空图标触发方式 @liweijie0812 ([#1481](https://github.com/Tencent/tdesign-mobile-vue/pull/1481))
### 🐞 Bug Fixes
- `Icon`: 修复图标 `chart-column` 的命名错误问题 @liweijie0812 ([#1488](https://github.com/Tencent/tdesign-mobile-vue/pull/1488))
- `Slider`: 修复 `label` 属性的 `Function` 类型无效 @anlyyao ([#1490](https://github.com/Tencent/tdesign-mobile-vue/pull/1490))
- `Input`: 修复禁用状态还可以查看密码 @liweijie0812 ([#1481](https://github.com/Tencent/tdesign-mobile-vue/pull/1481))
- `ImageViewer`: 修复页码对齐问题 @anlyyao ([#1494](https://github.com/Tencent/tdesign-mobile-vue/pull/1494))

## 🌈 1.3.1 `2024-06-28` 
### 🐞 Bug Fixes
- `Form`: 修复表单组件禁用优先级 (`组件 > 组件组 >表单`) @liweijie0812 ([#1472](https://github.com/Tencent/tdesign-mobile-vue/pull/1472))
- `Checkbox`: 修复导出组件名称错误 @anlyyao ([#1478](https://github.com/Tencent/tdesign-mobile-vue/pull/1478))

## 🌈 1.3.0 `2024-06-21` 
### 🚀 Features
- `TreeSelect`: 新增 `TreeSelect` 组件 @Lyan-u ([#1347](https://github.com/Tencent/tdesign-mobile-vue/pull/1347))
- `Layout`: 新增 `Layout` 组件 @aaronmhl ([#1393](https://github.com/Tencent/tdesign-mobile-vue/pull/1393))
- `Loading`:  新增 `attach` 和 `fullscreen` 属性，并支持函数式调用 @dexterBo ([#1444](https://github.com/Tencent/tdesign-mobile-vue/pull/1444))
- `ImageViewer`: 优化 `align` 配置长图滚动范围设置 @aaronmhl ([#1442](https://github.com/Tencent/tdesign-mobile-vue/pull/1442))
- `SideBar`: `label` 标签对齐方式从 "居中对齐" 变更为 “左对齐” @anlyyao ([#1347](https://github.com/Tencent/tdesign-mobile-vue/pull/1347))
- `SideBar`:  修复禁用态仍能点选的问题 @anlyyao ([#1347](https://github.com/Tencent/tdesign-mobile-vue/pull/1347))
- `Form`: 支持 `scrollToFirstError`，自动滚动到第一个校验不通过的字段位置 @liweijie0812 ([#1460](https://github.com/Tencent/tdesign-mobile-vue/pull/1460))
- `Form`: 新增 `preventSubmitDefault` 属性，表示是否阻止表单提交默认事件 @liweijie0812 ([#1465](https://github.com/Tencent/tdesign-mobile-vue/pull/1465))
- `Form`: `FormItem` 新增 `arrow` 属性，表示是否显示右侧箭头 @liweijie0812 ([#1465](https://github.com/Tencent/tdesign-mobile-vue/pull/1465))
- `ActionSheet`: `sfc` 改 `tsx` @jiasy1616 ([#1445](https://github.com/Tencent/tdesign-mobile-vue/pull/1445))
- `Message`: `sfc` 改 `tsx` @anlyyao ([#1448](https://github.com/Tencent/tdesign-mobile-vue/pull/1448))
- `ConfigProvider`: `sfc` 改 `tsx` @anlyyao ([#1459](https://github.com/Tencent/tdesign-mobile-vue/pull/1459))
- `List`: `sfc` 改 `tsx` @Florian-lan ([#1437](https://github.com/Tencent/tdesign-mobile-vue/pull/1437))
### 🐞 Bug Fixes
- `Input`: 修复`type='password'`场景下查看密码无效 @liweijie0812 ([#1464](https://github.com/Tencent/tdesign-mobile-vue/pull/1464))
### 🚧 Others
-  other: 支持通过 `import` 方式引入组件类型，e.g., `import { ActionSheetProps } from 'tdesign-mobile-vue';` @anlyyao ([#1461](https://github.com/Tencent/tdesign-mobile-vue/pull/1461))


## 🌈 1.2.4 `2024-06-07` 
### 🚀 Features
- `Rate`: `sfc` 改 `tsx` @1379255913 ([#1417](https://github.com/Tencent/tdesign-mobile-vue/pull/1417))
- `BackTop`: `sfc` 改 `tsx`  @liweijie0812 ([#1333](https://github.com/Tencent/tdesign-mobile-vue/pull/1333))
- `Image`: `sfc` 改 `tsx` @jiasy1616 ([#1414](https://github.com/Tencent/tdesign-mobile-vue/pull/1414))
- `NoticeBar`: `sfc` 改 `tsx` @zuiaiwanqian ([#1378](https://github.com/Tencent/tdesign-mobile-vue/pull/1378))
- `Toast`: 新增 `className` 属性 @anlyyao ([#1432](https://github.com/Tencent/tdesign-mobile-vue/pull/1432))
- `Toast`: `sfc` to `tsx` @betavs ([#1397](https://github.com/Tencent/tdesign-mobile-vue/pull/1397))
- `Input`: 新增`spellCheck` 是否开启拼写检查 @liweijie0812 ([#1435](https://github.com/Tencent/tdesign-mobile-vue/pull/1435))
- `Input`: TS类型 `InputValue` 支持 `number` @liweijie0812 ([#1435](https://github.com/Tencent/tdesign-mobile-vue/pull/1435))
- `Input`:  `maxlength` 属性扩展支持 `string` 类型 @liweijie0812 ([#1436](https://github.com/Tencent/tdesign-mobile-vue/pull/1436))
- `ImageViewer`: `sfc` 改 `tsx` @aaronmhl ([#1422](https://github.com/Tencent/tdesign-mobile-vue/pull/1422))
 
### 🐞 Bug Fixes
- `Swiper`: 修复 `current` 动态更新问题 @zuiaiwanqian ([#1404](https://github.com/Tencent/tdesign-mobile-vue/pull/1404))
- `Image`: 修复 `lazy` 为 `true` 时，图片无法正常显示 @jiasy1616 ([#1414](https://github.com/Tencent/tdesign-mobile-vue/pull/1414))
 


## 🌈 1.2.3 `2024-05-27` 
### 🚀 Features
- `Slider`: `sfc` 改 `tsx` @liweijie0812 ([#1384](https://github.com/Tencent/tdesign-mobile-vue/pull/1384))
- `Loading`: `sfc` 改 `tsx` @liweijie0812 ([#1382](https://github.com/Tencent/tdesign-mobile-vue/pull/1382))
- `TabBar`:  `sfc` 改 `tsx` @zuiaiwanqian ([#1365](https://github.com/Tencent/tdesign-mobile-vue/pull/1365))
- `Progress`: `sfc` 改 `tsx` @anlyyao ([#1413](https://github.com/Tencent/tdesign-mobile-vue/pull/1413))
- `Grid`: `sfc` 改 `tsx` @novlan1 ([#1415](https://github.com/Tencent/tdesign-mobile-vue/pull/1415))
- `Dialog`: `sfc` 改 `tsx` @zuiaiwanqian ([#1371](https://github.com/Tencent/tdesign-mobile-vue/pull/1371))
- `Checkbox`: `sfc` 改 `tsx` @zuiaiwanqian ([#1375](https://github.com/Tencent/tdesign-mobile-vue/pull/1375))
### 🐞 Bug Fixes
- `Message`: 修复 `ssr` 下报错 @anlyyao ([#1416](https://github.com/Tencent/tdesign-mobile-vue/pull/1416))


## 🌈 1.2.2 `2024-05-13` 
### 🚧 Others
- chore: aliases are not used inside components @anlyyao ([#1394](https://github.com/Tencent/tdesign-mobile-vue/pull/1394))

## 🌈 1.2.1 `2024-05-11` 
### 🚀 Features
- `Indexes`: `sfc` to `tsx` @liweijie0812 ([#1327](https://github.com/Tencent/tdesign-mobile-vue/pull/1327))
- `Cell`: `sfc` to `tsx` @liweijie0812 ([#1326](https://github.com/Tencent/tdesign-mobile-vue/pull/1326))
- `Switch`: `sfc` 改 `tsx` @liweijie0812 ([#1322](https://github.com/Tencent/tdesign-mobile-vue/pull/1322))
- `DropdownMenu`: `sfc` 改 `tsx` @dexterBo ([#1332](https://github.com/Tencent/tdesign-mobile-vue/pull/1332))
- `DropdownMenu`: 支持点击外部区域收起下拉框 @aaronmhl ([#1369](https://github.com/Tencent/tdesign-mobile-vue/pull/1369))
- `Avatar`: `sfc` 改 `tsx`  @liweijie0812 ([#1331](https://github.com/Tencent/tdesign-mobile-vue/pull/1331))
- `Overlay`: `sfc` 改 `tsx` @liweijie0812 ([#1339](https://github.com/Tencent/tdesign-mobile-vue/pull/1339))
- `Sticky`: `sfc` 改 `tsx` @liweijie0812 ([#1337](https://github.com/Tencent/tdesign-mobile-vue/pull/1337))
- `Empty`: `sfc` 改 `tsx` @liweijie0812 ([#1334](https://github.com/Tencent/tdesign-mobile-vue/pull/1334))
- `Search`: `sfc` 改 `tsx` @liweijie0812 ([#1336](https://github.com/Tencent/tdesign-mobile-vue/pull/1336))
- `Textarea`: `sfc` 改 `tsx` @liweijie0812 ([#1318](https://github.com/Tencent/tdesign-mobile-vue/pull/1318))
- `Popover`: `sfc` 改 `tsx` @anlyyao ([#1323](https://github.com/Tencent/tdesign-mobile-vue/pull/1323))
- `PullDownRefresh`: `sfc` 改 `tsx` @dexterBo ([#1343](https://github.com/Tencent/tdesign-mobile-vue/pull/1343))
- `Input`: `sfc` to `tsx` @liweijie0812 ([#1342](https://github.com/Tencent/tdesign-mobile-vue/pull/1342))
- `Upload`: `sfc` 改 `tsx` @dexterBo ([#1388](https://github.com/Tencent/tdesign-mobile-vue/pull/1388))
- `Stepper`: `sfc` 改 `tsx` @liweijie0812 ([#1383](https://github.com/Tencent/tdesign-mobile-vue/pull/1383))
- `Table`: `sfc` 改 `tsx` @dexterBo ([#1374](https://github.com/Tencent/tdesign-mobile-vue/pull/1374))
- `Form`: `sfc` 改 `tsx` @zuiaiwanqian ([#1372](https://github.com/Tencent/tdesign-mobile-vue/pull/1372))
- `Tabs`: `sfc` 改 `tsx` @liweijie0812 ([#1368](https://github.com/Tencent/tdesign-mobile-vue/pull/1368))
- `Tabs`:  标签页支持懒加载 @liweijie0812 ([#1368](https://github.com/Tencent/tdesign-mobile-vue/pull/1368))
- `SideBar`: `sfc` 改 `tsx` @zuiaiwanqian ([#1370](https://github.com/Tencent/tdesign-mobile-vue/pull/1370))
- `Calendar`: `sfc` 改 `tsx` @dexterBo ([#1385](https://github.com/Tencent/tdesign-mobile-vue/pull/1385))
- `Navbar`: `sfc` 改 `tsx` @Lyan-u ([#1377](https://github.com/Tencent/tdesign-mobile-vue/pull/1377))
- `Swiper`: `sfc` 改 `tsx` @zuiaiwanqian ([#1349](https://github.com/Tencent/tdesign-mobile-vue/pull/1349))
- `Radio`: `sfc` 改 `tsx` @liweijie0812 ([#1381](https://github.com/Tencent/tdesign-mobile-vue/pull/1381))
- `CountDown`: `sfc` to `tsx` @liweijie0812 ([#1317](https://github.com/Tencent/tdesign-mobile-vue/pull/1317))
- `Steps`: `sfc` to `tsx` @Lyan-u ([#1379](https://github.com/Tencent/tdesign-mobile-vue/pull/1379))
- `Drawer`: `sfc` to `tsx` @Lyan-u ([#1376](https://github.com/Tencent/tdesign-mobile-vue/pull/1376))

### 🐞 Bug Fixes
- `Form`: `submit` 事件补齐 `firstError` 参数 @KYSpring ([#1320](https://github.com/Tencent/tdesign-mobile-vue/pull/1320))
- `Swiper`: 修复 `placement` 值为 `outside` 无效的问题 @zuiaiwanqian ([#1349](https://github.com/Tencent/tdesign-mobile-vue/pull/1349))
- `DateTimePicker`: 修复使用了动态的start值无法在第一次渲染时正确的限制时间  @dexterBo ([#1324](https://github.com/Tencent/tdesign-mobile-vue/pull/1324))
- `SideBar`: 修复 `SideBarItem`项 `value` 值错误的问题 @Lyan-u ([#1330](https://github.com/Tencent/tdesign-mobile-vue/pull/1330))


## 🌈 1.2.0 `2024-04-18` 
### 🚀 Features
- `Result`: `sfc` 改 `tsx` @liweijie0812 ([#1303](https://github.com/Tencent/tdesign-mobile-vue/pull/1303))
- `Footer`: `sfc` 改 `tsx` @liweijie0812 ([#1304](https://github.com/Tencent/tdesign-mobile-vue/pull/1304))
- `Link`: `sfc` 改 `tsx` @liweijie0812 ([#1307](https://github.com/Tencent/tdesign-mobile-vue/pull/1307))
- `Fab`: `sfc` 改 `tsx` @liweijie0812 ([#1315](https://github.com/Tencent/tdesign-mobile-vue/pull/1315))
- `Button`: `sfc` 改 `tsx` @liweijie0812 ([#1313](https://github.com/Tencent/tdesign-mobile-vue/pull/1313))
- `Divider`: `sfc` 改 `tsx` @liweijie0812 ([#1314](https://github.com/Tencent/tdesign-mobile-vue/pull/1314))
- `Tag`: `sfc` 改 `tsx` @dexterBo ([#1270](https://github.com/Tencent/tdesign-mobile-vue/pull/1270))
- `Tag`: `CheckTag` `sfc` 改 `tsx` @liweijie0812 ([#1311](https://github.com/Tencent/tdesign-mobile-vue/pull/1311))
- `Skeleton`: `sfc` 改 `tsx` @anlyyao ([#1301](https://github.com/Tencent/tdesign-mobile-vue/pull/1301))
- `Badge`: `sfc` 改 `tsx` @liweijie0812 ([#1319](https://github.com/Tencent/tdesign-mobile-vue/pull/1319))
- `Collapse`:  `sfc`改 `tsx` @anlyyao ([#1308](https://github.com/Tencent/tdesign-mobile-vue/pull/1308))
- `Locale`: 新增阿拉伯语言包 @catiwang ([#1277](https://github.com/Tencent/tdesign-mobile-vue/pull/1277))
### 🐞 Bug Fixes
- `Locale`: 语言包迁移至 `common` 子仓库 @anlyyao ([#1281](https://github.com/Tencent/tdesign-mobile-vue/pull/1281))
- `Swiper`: `current` 动态修改异常 @betavs ([#1288](https://github.com/Tencent/tdesign-mobile-vue/pull/1288))
- `Tag`: 修复 `CheckTag` 禁用态样式错误 @anlyyao ([#1769](https://github.com/Tencent/tdesign-common/pull/1769)) 
- `Skeleton`: 修复 `delay` 属性无效的问题 @anlyyao ([#1301](https://github.com/Tencent/tdesign-mobile-vue/pull/1301))
### 🚧 Others
- feat(other): 修复组件库在 `ssr` 环境中报错 `window is not defined` @anlyyao ([#1280](https://github.com/Tencent/tdesign-mobile-vue/pull/1280))


## 🌈 1.1.1 `2024-03-21` 
### 🚀 Features
- `Guide`: 新增 `Guide` 组件 @Lyan-u ([#1243](https://github.com/Tencent/tdesign-mobile-vue/pull/1243))
- `Locale`: 新增繁體中文语言包 @ssmyaojiayouya ([#1258](https://github.com/Tencent/tdesign-mobile-vue/pull/1258))
- `Locale`: 新增韩语语言包 @ssmyaojiayouya ([#1262](https://github.com/Tencent/tdesign-mobile-vue/pull/1262))
- `Locale`: 新增日语语言包 @ssmyaojiayouya ([#1261](https://github.com/Tencent/tdesign-mobile-vue/pull/1261))
- `Locale`: 新增俄语语言包 @dexterBo ([#1257](https://github.com/Tencent/tdesign-mobile-vue/pull/1257))
- `Locale`: 新增意大利语言包 @catiwang ([#1263](https://github.com/Tencent/tdesign-mobile-vue/pull/1263))
### 🐞 Bug Fixes
- `Dialog`: 修复 `zIndex` 属性无效的问题 @anlyyao ([#1267](https://github.com/Tencent/tdesign-mobile-vue/pull/1267))
- `SwipeCell`: 修复左滑场景 `click` 事件无效 @XBIsland ([#1266](https://github.com/Tencent/tdesign-mobile-vue/pull/1266))

## 🌈 1.1.0 `2024-02-29` 
### 🚀 Features
- `ConfigProvider`: 全局配置组件，支持组件国际化 @anlyyao ([#1240](https://github.com/Tencent/tdesign-mobile-vue/pull/1240))
- `Message`: `MessagePlugin`的 `context` 默认指向 `document.body` @backrunner ([#1220](https://github.com/Tencent/tdesign-mobile-vue/pull/1220))
### 🐞 Bug Fixes
- `Calendar`: 修复日历组件 `title` 插槽缺失的问题 @Delevin888 ([#1223](https://github.com/Tencent/tdesign-mobile-vue/pull/1223))
- `Tabs`: 修复按需引入时控制台告警 @zhouxhere ([#1239](https://github.com/Tencent/tdesign-mobile-vue/pull/1239))


## 🌈 1.0.10 `2024-01-17` 
### 🚀 Features
- `Upload`: 新增 `clickUpload` 事件 @Lyan-u ([#1195](https://github.com/Tencent/tdesign-mobile-vue/pull/1195))
### 🐞 Bug Fixes
- `Sticky`:  修复 `getCurrentInstance` 在 `computed` 中无法获取元素的问题 @LoopZhou ([#1206](https://github.com/Tencent/tdesign-mobile-vue/pull/1206))
- `Popup`: 处理 `t-popup-overflow-hidden` 类名未移除的问题 @betavs ([#1199](https://github.com/Tencent/tdesign-mobile-vue/pull/1199))
- `Switch`: 修复 `v-model` 值变更后需点击两次切换开关状态的问题 @LoopZhou ([#1204](https://github.com/Tencent/tdesign-mobile-vue/pull/1204))
- `Table`: 修复 `colKey` 值取 `serial-number` 时无效的问题 @anlyyao ([#1210](https://github.com/Tencent/tdesign-mobile-vue/pull/1210))
- `SwipeCell`: 修复收起单元格时卡顿的问题 @Lyan-u ([#1209](https://github.com/Tencent/tdesign-mobile-vue/pull/1209))


## 🌈 1.0.9 `2023-12-22` 
### 🚀 Features
- `Cascader`:  新增 `checkStrictly` @LoopZhou ([#1192](https://github.com/Tencent/tdesign-mobile-vue/pull/1192))
- `Slider`: `step` 属性支持小数 @LoopZhou ([#1180](https://github.com/Tencent/tdesign-mobile-vue/pull/1180))
### 🐞 Bug Fixes
- `Swiper`: 修复滑动场景下触发 `click` 事件的问题 @hkaikai ([#1182](https://github.com/Tencent/tdesign-mobile-vue/pull/1182))
### 🚧 Others
- `Table`: 修复示例错误 @anlyyao ([#1184](https://github.com/Tencent/tdesign-mobile-vue/pull/1184))
- `ActionSheet`: 处理控制台告警 @QuentinHsu ([#1185](https://github.com/Tencent/tdesign-mobile-vue/pull/1185))


## 🌈 1.0.8 `2023-12-08` 
### 🚀 Features
- `Textarea`: 支持 `autosize` 属性值变更后输入框高度重新计算 @QuentinHsu ([#1175](https://github.com/Tencent/tdesign-mobile-vue/pull/1175))
### 🐞 Bug Fixes
- `DropdownMenu`:  `value` 属性新增 `Array` 类型 @LoopZhou ([#1166](https://github.com/Tencent/tdesign-mobile-vue/pull/1166))
- `Tabs`: 修复组件在 `keep-alive` 下底部激活态蓝线样式位置错误 @LoopZhou ([#1165](https://github.com/Tencent/tdesign-mobile-vue/pull/1165))
- `Picker`: 修复`columns` 为异步加载数据时点选报错 @hkaikai ([#1171](https://github.com/Tencent/tdesign-mobile-vue/pull/1171))
- `SideBar`: 修复页面高度较小时组件背景色错误[#1646](https://github.com/Tencent/tdesign-common/pull/1646)
### 🚧 Others
- `Slider`: 修复示例错误 @LoopZhou ([#1168](https://github.com/Tencent/tdesign-mobile-vue/pull/1168))
- `Textarea`: 修复示例错误 @QuentinHsu ([#1172](https://github.com/Tencent/tdesign-mobile-vue/pull/1172))

## 🌈 1.0.7 `2023-11-22` 
### 🐞 Bug Fixes
- `DropdownMenu`:  修复`--td-dropdown-menu-icon-sizem` 变量无效 @LoopZhou ([#1144](https://github.com/Tencent/tdesign-mobile-vue/pull/1144))
- `DropdownMenu`: 解决 `DropdownItem` 组件的 `label` 属性不受控 @yiqia ([#1145](https://github.com/Tencent/tdesign-mobile-vue/pull/1145))
- `Input`: 新增 `pattern ` 和 `inputmode` 属性 @LoopZhou ([#1162](https://github.com/Tencent/tdesign-mobile-vue/pull/1162))
- `Dialog`: 修复`destroyOnClose` 属性无效并支持组件实例生成和返回 @fennghuang ([#1149](https://github.com/Tencent/tdesign-mobile-vue/pull/1149))


## 🌈 1.0.6 `2023-10-26` 
### 🚀 Features
- `Cascader`: 新增 `placeholder` 属性，支持自定义未选中时的提示文案 @yiqia ([#1133](https://github.com/Tencent/tdesign-mobile-vue/pull/1133))
### 🐞 Bug Fixes
- `Toast`: 修复纯文字不能居中的问题 @fennghuang ([#1120](https://github.com/Tencent/tdesign-mobile-vue/pull/1120))
- `SwipeCell`: 修复操作项显示不全的问题 @fennghuang ([#1122](https://github.com/Tencent/tdesign-mobile-vue/pull/1122))
- `SwipeCell`: 修复组件在 `Popup` 中无法左右滑动 @yiqia ([#1141](https://github.com/Tencent/tdesign-mobile-vue/pull/1141))
- `DropdownMenu`: 修复 `label` 不能响应式更新的问题 @LoopZhou ([#1123](https://github.com/Tencent/tdesign-mobile-vue/pull/1123))
- `Table`: 修正 `empty`属性优先级过高的问题 @fennghuang ([#1136](https://github.com/Tencent/tdesign-mobile-vue/pull/1136))
- `Popover`: 修复气泡首次弹出被遮挡的问题以及优化箭头 @LoopZhou ([#1132](https://github.com/Tencent/tdesign-mobile-vue/pull/1132))
- `Popup`: 修复在组件上使用 `class`和`style` 时控制台警告 @aomnisz ([#1135](https://github.com/Tencent/tdesign-mobile-vue/pull/1135))
- `Collapse`: 修复在 `Popup` 等窗体组件中使用时渲染错误 @fennghuang ([#1140](https://github.com/Tencent/tdesign-mobile-vue/pull/1140))
- `ImageViewer`: 修复图片预览拖拽问题 @fennghuang ([#1104](https://github.com/Tencent/tdesign-mobile-vue/pull/1104))



## 🌈 1.0.5 `2023-10-03` 
### 🚀 Features
- `Calendar`: 日历选择器支持自动定位到选中日期 @ShinyHwong ([#1102](https://github.com/Tencent/tdesign-mobile-vue/pull/1102))
- `Textarea`:  新增 `readonly` 属性 @anlyyao ([#1100](https://github.com/Tencent/tdesign-mobile-vue/pull/1100))
### 🐞 Bug Fixes
- `Sticky`: 修复组件只能针对浏览器窗口进行定位的问题 @demoadminjie ([#1103](https://github.com/Tencent/tdesign-mobile-vue/pull/1103))
- `Cascader`: 修复 `change` 事件被触发两次和 `v-model` 没有响应式的问题 @bitjian ([#1096](https://github.com/Tencent/tdesign-mobile-vue/pull/1096))
- `Cascader`: 修复 `title` 不存在时关闭按钮样式错位的问题 @bitjian ([#1597](https://github.com/Tencent/tdesign-common/pull/1597))
- `Radio`: 修复 `allowUncheck` 属性无效的问题 @betavs ([#1108](https://github.com/Tencent/tdesign-mobile-vue/pull/1108))
- `Radio`: 修复 `RadioGroup` 的 `disabled` 属性无效的问题 @anlyyao ([#1112](https://github.com/Tencent/tdesign-mobile-vue/pull/1112))
- `Stepper`: 新增 `integer` 属性，并修复组件不支持输入小数的问题 @fennghuang ([#1113](https://github.com/Tencent/tdesign-mobile-vue/pull/1113))

## 🌈 1.0.4 `2023-09-15` 
### 🐞 Bug Fixes
- `Cascader`: 修复选项卡模式中选中值不更新的问题 @fennghuang ([#1091](https://github.com/Tencent/tdesign-mobile-vue/pull/1091))
- `SideBar`: 修复按需引入时控制台告警 @anlyyao ([#1092](https://github.com/Tencent/tdesign-mobile-vue/pull/1092))
- `Grid`: 修复 `boder` 边框缺失 @anlyyao ([#1090](https://github.com/Tencent/tdesign-mobile-vue/pull/1090))
- `PullDownRefresh`: 修复与 `SwipeCell` 同用时左滑操作易触发下拉的问题 @fennghuang ([#1080](https://github.com/Tencent/tdesign-mobile-vue/pull/1080))
- `Message`: 改用`min-height`自适应文本高度 @anlyyao ([#1596](https://github.com/Tencent/tdesign-common/pull/1596))
- `Input`: 新增`CSS Variables: --td-input-label-width` @anlyyao ([#1588](https://github.com/Tencent/tdesign-common/pull/1588))
### 🚧 Others
- other: 修复 `CHANGELOG` 自动生成时缩进格式异常 @liweijie0812 ([#1077](https://github.com/Tencent/tdesign-mobile-vue/pull/1077))
- other: 修复 `v-hover` 产生的控制台告警 @anlyyao ([#1078](https://github.com/Tencent/tdesign-mobile-vue/pull/1078))
- other: 支持暗色模式，以适配官网暗色模式下的展示体验 @novlan1 ([#1082](https://github.com/Tencent/tdesign-mobile-vue/pull/1082))

## 🌈 1.0.3 `2023-08-31` 
### 🚀 Features
- `Message`: 支持 `closeAll` 方法 @fennghuang ([#1065](https://github.com/Tencent/tdesign-mobile-vue/pull/1065))
### 🐞 Bug Fixes
- `ImageViewer`: 修复单图时预览错误 @LoopZhou ([#1063](https://github.com/Tencent/tdesign-mobile-vue/pull/1063))
- `Cell`: 修复 `CellGroup` 的 `class` 属性无效和控制台告警 @anlyyao ([#1069](https://github.com/Tencent/tdesign-mobile-vue/pull/1069))
- `Swiper`: 修复 `click` 事件无效的问题 @anlyyao ([#1064](https://github.com/Tencent/tdesign-mobile-vue/pull/1064))
- `Picker`: 修复 `v-model/modelValue` 为空时组件报错 @anlyyao ([#1071](https://github.com/Tencent/tdesign-mobile-vue/pull/1071))
- `DateTimePicker`:  修复 `onConfirm` 为空时控制台报错 @LoopZhou ([#1061](https://github.com/Tencent/tdesign-mobile-vue/pull/1061))
### 🚧 Others
- `Swiper`: 修复条状（dots-bar） 示例中高度错误问题 @LoopZhou ([#1067](https://github.com/Tencent/tdesign-mobile-vue/pull/1067))

## 🌈 1.0.2 `2023-08-22` 
### 🚀 Features
- `Table`: 支持 `cell` 属性，用于自定义单元格 @anlyyao ([#1046](https://github.com/Tencent/tdesign-mobile-vue/pull/1046))
### 🐞 Bug Fixes
- `Radio`: 修复 `RadioGroup` 的 `placement` 属性无效 @anlyyao ([#1049](https://github.com/Tencent/tdesign-mobile-vue/pull/1049))
- `Noticebar`: 修复垂直滚动过程中出现的文字遮挡问题 @Gvonte ([#1051](https://github.com/Tencent/tdesign-mobile-vue/pull/1051))
- `ImageViewer`: 修复图片放大异常问题 @ccccpj ([#1041](https://github.com/Tencent/tdesign-mobile-vue/pull/1041))
- `Loading`: 修复组件渲染错误 @anlyyao ([#1053](https://github.com/Tencent/tdesign-mobile-vue/pull/1053))
- `Calendar`: 修复 `value` 外部变更后不响应问题 @byq1213 ([#1045](https://github.com/Tencent/tdesign-mobile-vue/pull/1045))
### 🚧 Others
- other: 添加邮箱校验 @yaogengzhu ([#1050](https://github.com/Tencent/tdesign-mobile-vue/pull/1050)) 

## 🌈 1.0.1 `2023-08-17` 
### 🐞 Bug Fixes
- `upload`:  修复`useUpload`导入异常 @linesoft2 ([#1038](https://github.com/Tencent/tdesign-mobile-vue/pull/1038)) 

## 🌈 1.0.0 `2023-08-16` 
### 🚨 Breaking Changes
- `Cell`: 调整 `CellGroup` 的 `DOM` 结构 @anlyyao ([#1010](https://github.com/Tencent/tdesign-mobile-vue/pull/1010))
- `Rate`: 移除 variant 废弃属性 @LeeJim ([#1005](https://github.com/Tencent/tdesign-mobile-vue/pull/1005))
- `Icon`: 新增 `960` 个图标；调整图标命名 `photo` 为 `camera`，`books` 为 `bookmark`，`stop-cirle-1` 为 `stop-circle-stroke`；移除 `money-circle` 图标，具体请查看图标页面。 @anlyyao ([#1024](https://github.com/Tencent/tdesign-mobile-vue/pull/1024))

### 🚀 Features
- `Collapse`: `CollapsePanel` 新增 `headerLeftIcon` 属性 @LeeJim ([#1009](https://github.com/Tencent/tdesign-mobile-vue/pull/1009))
- `Cell`: `CellGroup` 支持最后一项 `Cell` 无 `border` @anlyyao ([#1010](https://github.com/Tencent/tdesign-mobile-vue/pull/1010))
- 
### 🐞 Bug Fixes
- `Avatar`: 修复 `src` 属性不支持应式的问题 @anlyyao ([#1008](https://github.com/Tencent/tdesign-mobile-vue/pull/1008))
- `Badge`: 修复 count 不支持 slot 的问题 @LeeJim ([#1007](https://github.com/Tencent/tdesign-mobile-vue/pull/1007))
- `DropdownMenu`: 修复单选和多选混合使用是 `label` 显示错误问题 @ccccpj ([#1011](https://github.com/Tencent/tdesign-mobile-vue/pull/1011))
- `Radio`: 修复 `icon='none'` 时 `ts` 类型报错 @anlyyao ([#1015](https://github.com/Tencent/tdesign-mobile-vue/pull/1015))
- `Slider`: 修复 `max` 存在时，刻度计算错误 @anlyyao ([#1026](https://github.com/Tencent/tdesign-mobile-vue/pull/1026))
- `Message`: 修复函数式调用时 `onDurationEnd` 属性无效 @anlyyao ([#1028](https://github.com/Tencent/tdesign-mobile-vue/pull/1028))
- `Cell`: 修复 `CellGroup` 的 `bordered` 属性无效 @anlyyao ([#1010](https://github.com/Tencent/tdesign-mobile-vue/pull/1010))
- `Drawer`: 修复按需引入时无法在 `SFC` 中使用 `Drawer` 组件 @anlyyao ([#1030](https://github.com/Tencent/tdesign-mobile-vue/pull/1030))
- `TabBar`: 修复 `bordered` 属性无效的问题 @anlyyao ([#1569](https://github.com/Tencent/tdesign-common/pull/1569))

### 🚧 Others
- `Upload`: 优化 `Upload` 逻辑 @yaogengzhu ([#999](https://github.com/Tencent/tdesign-mobile-vue/pull/999))
- `Tabs`: 隐藏滚动条样式  @anlyyao ([#1560](https://github.com/Tencent/tdesign-common/pull/1560))
- other: 支持 WebStrom 编辑器代码提示 @liweijie0812 ([#998](https://github.com/Tencent/tdesign-mobile-vue/pull/998))
 

## 🌈 1.0.0-rc.6 `2023-08-01` 
### 🐞 Bug Fixes
- `Calendar`: 解决属性不支持响应式的问题 @LeeJim ([#991](https://github.com/Tencent/tdesign-mobile-vue/pull/991))
- `Tag`: 修复当 `disabled` 为 `true` 时， `closable` 无效的问题 @anlyyao ([#994](https://github.com/Tencent/tdesign-mobile-vue/pull/994))
- `Swiper`: 修复 `change` 事件参数错误 @anlyyao ([#996](https://github.com/Tencent/tdesign-mobile-vue/pull/996))

## 🌈 1.0.0-rc.5 `2023-07-25` 
### 🚨 Breaking Changes
- `Textarea`: `maxLength`属性默认值变更为 `-1` @anlyyao ([#977](https://github.com/Tencent/tdesign-mobile-vue/pull/977))
### 🐞 Bug Fixes
- `Popup`: 修复多个 `popup` 时 `preventScrollThrough` 属性无效 @anlyyao ([#983](https://github.com/Tencent/tdesign-mobile-vue/pull/983))
- `Message`: 修复函数式调用传入 `context` 时 `ts` 类型报错 @anlyyao ([#985](https://github.com/Tencent/tdesign-mobile-vue/pull/985))
- `Message`: 修复关闭窗体时控制台报错 @anlyyao ([#985](https://github.com/Tencent/tdesign-mobile-vue/pull/985))
- `Cascader`: 修复点选后未勾选的问题 @anlyyao ([#986](https://github.com/Tencent/tdesign-mobile-vue/pull/986))
- `DropdownMenu`:  `DropdownItem` 的 `value` 属性支持空字符串 @yaogengzhu ([#980](https://github.com/Tencent/tdesign-mobile-vue/pull/980))
- `Upload`: 修复 `autoUpload` 为 `false` 时无法上传的问题 @yaogengzhu ([#967](https://github.com/Tencent/tdesign-mobile-vue/pull/967))
- `Upload`: 修复图片预览问题 @yaogengzhu ([#967](https://github.com/Tencent/tdesign-mobile-vue/pull/967))
- `Upload`: 修复 `autoUpload` 为 `true` 时 `allowUploadDuplicateFile ` 属性失效图片 @yaogengzhu ([#967](https://github.com/Tencent/tdesign-mobile-vue/pull/967))
- `Upload`: 修复 `v-model` 无效的问题 @anlyyao ([#988](https://github.com/Tencent/tdesign-mobile-vue/pull/988))
- `Upload`: 修复 `onPreview`, `onSuccess`, `onRemove`, `onSelectChange` 无效 @anlyyao ([#987](https://github.com/Tencent/tdesign-mobile-vue/pull/987))
- `Textarea`: 修复 `maxLength`属性无效的问题 @anlyyao ([#977](https://github.com/Tencent/tdesign-mobile-vue/pull/977))
### 🚧 Others
- `Overlay`: 背景色从 `@font-gray-1` 变更为 `@font-gray-2` @anlyyao ([#1540](https://github.com/Tencent/tdesign-common/pull/1540))


## 🌈 1.0.0-rc.4 `2023-07-18` 
### 🚀 Features
- `Tabs`: 新增 `bottomLineMode` 属性 @anlyyao ([#968](https://github.com/Tencent/tdesign-mobile-vue/pull/968))
### 🐞 Bug Fixes
- `Message`: 修复 `Message` 关闭时未销毁节点 @anlyyao ([#962](https://github.com/Tencent/tdesign-mobile-vue/pull/962))
- `Button`: 修复 `disabled` 变更之后仍有点击态的问题 @LeeJim ([#963](https://github.com/Tencent/tdesign-mobile-vue/pull/963))
- `Tabs`: 修复 `badgeProps` 属性失效 @anlyyao ([#968](https://github.com/Tencent/tdesign-mobile-vue/pull/968))


## 🌈 1.0.0-rc.3 `2023-07-13` 
### 🚧 Others
- `Popup`: 类名 `t-overflow-hidden` 更新为 `t-popup-overflow-hidden` @anlyyao ([#947](https://github.com/Tencent/tdesign-mobile-vue/pull/947))
- `Toast`: 类名 `t-overflow-hidden` 更新为 `t-toast-overflow-hidden` @anlyyao ([#947](https://github.com/Tencent/tdesign-mobile-vue/pull/947))
- `Message`: 更新示例代码 @anlyyao ([#949](https://github.com/Tencent/tdesign-mobile-vue/pull/949))
- site: 组件文档新增  `CSS variables` 内容 @anlyyao ([#944](https://github.com/Tencent/tdesign-mobile-vue/pull/944))


## 🌈 1.0.0-rc.2 `2023-07-11` 
### 🚨 Breaking Changes
- `NoticeBar`: `prefixIcon` 属性默认值变更为 `true` @anlyyao ([#929](https://github.com/Tencent/tdesign-mobile-vue/pull/929))
### 🚀 Features
- `Cascader`: `pick` 事件新增 `level` 参数 @anlyyao ([#940](https://github.com/Tencent/tdesign-mobile-vue/pull/940))
### 🐞 Bug Fixes
- `Message`: 修复 `link` 、`onLinkClick`属性无效 @anlyyao ([#931](https://github.com/Tencent/tdesign-mobile-vue/pull/931))
- `Overlay`: 修复 `backgroundColor` 属性致动画失效问题 @yaogengzhu ([#942](https://github.com/Tencent/tdesign-mobile-vue/pull/942))
- `ActionSheet`: 修复多页宫格工作面板高度计算错误 @anlyyao ([#936](https://github.com/Tencent/tdesign-mobile-vue/pull/936))
- `Collapse`: 修复 `CollapsePanel` 的 `expandIcon` 的值为插槽或函数时无效 @anlyyao ([#934](https://github.com/Tencent/tdesign-mobile-vue/pull/934))
- `Table`: 修复table组件卸载时，异常报错 @yaogengzhu ([#938](https://github.com/Tencent/tdesign-mobile-vue/pull/938))
- `Toast`: 修复preventScrollThrough属性无效 @yaogengzhu ([#939](https://github.com/Tencent/tdesign-mobile-vue/pull/939))
- `Search`: 修复 `iOS` 环境 `search` 默认自带图标 @yaogengzhu ([#1519](https://github.com/Tencent/tdesign-common/pull/1519))


## 🌈 1.0.0-rc.1 `2023-07-04` 
### 🚨 Breaking Changes
- `Loading`:  移除`progress` 属性 @anlyyao ([#918](https://github.com/Tencent/tdesign-mobile-vue/pull/918))
### 🚀 Features
- `Popover`: 新增 `closeOnClickOutside` 属性 @anlyyao ([#916](https://github.com/Tencent/tdesign-mobile-vue/pull/916))
- `Loading`: `indicator` 属性新增 `Slot / Function`类型，支持自定义指示符 @anlyyao ([#918](https://github.com/Tencent/tdesign-mobile-vue/pull/918))
- `Cascader`: `options` 支持支持异步数据 @ccccpj ([#917](https://github.com/Tencent/tdesign-mobile-vue/pull/917))
- `DropdownMenu`: 新增 `direction` 属性 @ccccpj ([#878](https://github.com/Tencent/tdesign-mobile-vue/pull/878))
### 🐞 Bug Fixes
- `Stepper`: 修复精度缺失问题 @anlyyao ([#906](https://github.com/Tencent/tdesign-mobile-vue/pull/906))
- `Popup`: 修复 `visible-change` 事件参数错误  @anlyyao ([#920](https://github.com/Tencent/tdesign-mobile-vue/pull/920))
- `NavBar`: 修复 `fixed=true` 时样式错误 @anlyyao ([#1494](https://github.com/Tencent/tdesign-common/pull/1494))
### 🚧 Others
- `Docs`:  新增支持英文站点 @anlyyao ([#914](https://github.com/Tencent/tdesign-mobile-vue/pull/914))

## 🌈 1.0.0-rc `2023-06-27` 
### 🚨 Breaking Changes
- `Divider`: 调整 DOM，移除 lineColor 废弃属性 @LeeJim ([#896](https://github.com/Tencent/tdesign-mobile-vue/pull/896))
- `Tag`: 移除 `CheckTag` 废弃属性 closable @LeeJim ([#899](https://github.com/Tencent/tdesign-mobile-vue/pull/899))

### 🚀 Features
- `Popover`: 新增 Popover 弹出气泡组件 @anlyyao ([#898](https://github.com/Tencent/tdesign-mobile-vue/pull/898))
### 🐞 Bug Fixes
- `PullDownRefresh`: 修复下拉刷新加载样式未居中问题 @ccccpj ([#888](https://github.com/Tencent/tdesign-mobile-vue/pull/888))
- `Fab`: 改用 setup 语法糖 @LeeJim ([#897](https://github.com/Tencent/tdesign-mobile-vue/pull/897))
- `Textarea`: 修复计数器错误 @anlyyao ([#902](https://github.com/Tencent/tdesign-mobile-vue/pull/902))
- `Table`: 修复事件 cell-click 和 row-click 返回参数错误的问题 @LeeJim ([#899](https://github.com/Tencent/tdesign-mobile-vue/pull/899))
- `Drawer`: 修复事件 close 返回参数错误的问题 @LeeJim ([#899](https://github.com/Tencent/tdesign-mobile-vue/pull/899))
- `Image`: 修复事件 load 和 error 返回参数错误的问题 @LeeJim ([#899](https://github.com/Tencent/tdesign-mobile-vue/pull/899))
- `Search`: 修复事件 action-click 返回参数错误的问题 @LeeJim ([#899](https://github.com/Tencent/tdesign-mobile-vue/pull/899))
- `Upload`: 修复事件 select-change 返回参数错误的问题 @LeeJim ([#899](https://github.com/Tencent/tdesign-mobile-vue/pull/899))
- `Search`: 修复 `action-click` 事件无效 @anlyyao ([#908](https://github.com/Tencent/tdesign-mobile-vue/pull/908))
- `DateTimePicker`: 修复 `modelValue` 属性无效的问题 @anlyyao ([#903](https://github.com/Tencent/tdesign-mobile-vue/pull/903))

## 🌈 0.x `2021-12-27 - 2023-06-20`
前往 [GitHub](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/changelogs/CHANGELOG-0.x.md) 查看 `0.x` 更新日志
