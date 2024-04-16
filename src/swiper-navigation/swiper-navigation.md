:: BASE_DOC ::

## API

### SwiperNavigation

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
minShowNum | Number | - | 小于这个数字不会显示导航器 | N
paginationPosition | String | bottom | 页码信息展示位置。可选项：top-left/top/top-right/bottom-left/bottom/bottom-right | N
showControls | Boolean | false | 是否显示两侧的控制按钮 | N
type | String | - | 导航器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等。TS 类型：`SwiperNavigationType` `type SwiperNavigationType = 'dots' \| 'dots-bar' \| 'fraction'`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper/type.ts) | N
