:: BASE_DOC ::

## API
### Swiper Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
animation | String | slide | 轮播切换动画效果类型。可选项：slide | N
autoplay | Boolean | true | 是否自动播放 | N
current | Number | 0 | 当前轮播在哪一项（下标）。支持语法糖 `v-model` 或 `v-model:current` | N
direction | String | horizontal | 轮播滑动方向，包括横向滑动和纵向滑动两个方向。可选项：horizontal/vertical | N
duration | Number | 300 | 滑动动画时长 | N
height | Number / String | - | 轮播的高度 | N
interval | Number | 5000 | 轮播间隔时间 | N
loop | Boolean | true | 是否循环播放 | N
navigation | Object / Slot / Function | - | 导航器全部配置。TS 类型：`SwiperNavigation \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
nextMargin | String / Number | 0 | 【开发中】后边距，可用于露出后一项的一小部分。默认单位 `px` | N
previousMargin | String / Number | 0 | 【开发中】前边距，可用于露出前一项的一小部分。默认单位 `px` | N
onChange | Function |  | TS 类型：`(current: number, context: { source: SwiperChangeSource }) => void`<br/>轮播切换时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper/type.ts)。<br/>`type SwiperChangeSource = 'autoplay' \| 'touch' \| 'nav'`<br/> | N
onClick | Function |  | TS 类型：`(index: number) => void`<br/>点击轮播项时触发 | N

### Swiper Events

名称 | 参数 | 描述
-- | -- | --
change | `(current: number, context: { source: SwiperChangeSource })` | 轮播切换时触发。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper/type.ts)。<br/>`type SwiperChangeSource = 'autoplay' \| 'touch' \| 'nav'`<br/>
click | `(index: number)` | 点击轮播项时触发

### SwiperNavigation

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
minShowNum | Number | - | 小于这个数字不会显示导航器 | N
paginationPosition | String | bottom | 页码信息展示位置。可选项：top-left/top/top-right/bottom-left/bottom/bottom-right | N
placement | String | inside | 导航器位置，位于主体的内侧或是外侧。可选项：inside/outside | N
showControls | Boolean | false | 是否显示两侧的控制按钮 | N
type | String | dots | 导航器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等。TS 类型：`SwiperNavigationType` `type SwiperNavigationType = 'dots' \| 'dots-bar' \| 'fraction'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper/type.ts) | N


### CSS 变量
组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-swiper-nav-btn-bg-color | @font-gray-3 | - 
--td-swiper-nav-btn-color | @font-white-1 | - 
--td-swiper-nav-btn-size | 24px | - 
--td-swiper-nav-dot-active-color | @font-white-1 | - 
--td-swiper-nav-dot-color | @font-white-2 | - 
--td-swiper-nav-dot-size | 6px | - 
--td-swiper-nav-dots-bar-active-width | 20px | - 
--td-swiper-nav-fraction-bg-color | @font-gray-3 | - 
--td-swiper-nav-fraction-color | @font-white-1 | - 
--td-swiper-nav-fraction-font-size | 12px | - 
--td-swiper-nav-fraction-height | 24px | - 
--td-swiper-border-radius | 8px | - 
