:: BASE_DOC ::

## API

### Swiper Props

name | type | default | description | required
-- | -- | -- | -- | --
animation | String | slide | options：slide | N
autoplay | Boolean | true | \- | N
current | Number | 0 | `v-model` and `v-model:current` is supported | N
defaultCurrent | Number | 0 | uncontrolled property | N
direction | String | horizontal | options：horizontal/vertical | N
duration | Number | 300 | \- | N
height | Number | - | \- | N
interval | Number | 5000 | \- | N
loop | Boolean | true | \- | N
navigation | Object / Slot / Function | - | Typescript：`SwiperNavigation | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
paginationPosition | String | bottom-right | options：top-left/top/top-right/bottom-left/bottom/bottom-right | N
onChange | Function |  | TS 类型：`(current: number, context: { source: SwiperChangeSource }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper/type.ts)。<br/>`type SwiperChangeSource = 'autoplay' | 'touch' | ''`<br/> | N

### Swiper Events

name | params | description
-- | -- | --
change | `(current: number, context: { source: SwiperChangeSource })` | [see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper/type.ts)。<br/>`type SwiperChangeSource = 'autoplay' | 'touch' | ''`<br/>

### SwiperNavigation

name | type | default | description | required
-- | -- | -- | -- | --
minShowNum | Number | - | \- | N
showSlideBtn | Boolean | - | \- | N
type | String | - | Typescript：`SwiperNavigationType` `type SwiperNavigationType = 'dots' | 'dots-bar' | 'fraction'`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/swiper/type.ts) | N
