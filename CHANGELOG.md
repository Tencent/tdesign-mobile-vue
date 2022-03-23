---
title: 更新日志
docClass: timeline
toc: false
spline: explain
---

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
