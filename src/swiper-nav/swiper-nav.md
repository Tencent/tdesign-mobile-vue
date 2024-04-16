:: BASE_DOC ::

## API


### SwiperNav Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
current | Number | 0 | 当前轮播在哪一项（下标） | N
direction | String | horizontal | 轮播滑动方向，包括横向滑动和纵向滑动两个方向。可选项：horizontal/vertical | N
minShowNum | Number | 2 | 小于这个数字不会显示导航器 | N
paginationPosition | String | bottom | 页码信息展示位置。可选项：top-left/top/top-right/bottom-left/bottom/bottom-right | N
placement | String | inside | 导航器位置，位于主体的内侧或是外侧。可选项：inside/outside | N
showControls | Boolean | false | 是否显示两侧的控制按钮 | N
total | Number | 0 | 总共的项数 | N
type | String | dots | 导航器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等。TS 类型：`SwiperNavigationType` `type SwiperNavigationType = 'dots' \| 'dots-bar' \| 'fraction'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper-nav/type.ts) | N
