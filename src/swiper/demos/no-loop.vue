<template>
  <t-swiper :interval="3000" :loop="false" :navigation="{ showSlideBtn: true }">
    <t-swiper-item class="swiper-item--demo">
      <img src="https://tdesign.gtimg.com/site/swiper/01.png" class="img" />
    </t-swiper-item>
    <t-swiper-item class="swiper-item--demo">
      <img src="https://tdesign.gtimg.com/site/swiper/02.png" class="img" />
    </t-swiper-item>
    <t-swiper-item class="swiper-item--demo">
      <img src="https://tdesign.gtimg.com/site/swiper/03.png" class="img" />
    </t-swiper-item>
  </t-swiper>
</template>
<style lang="less">
.swiper-item--demo {
  img {
    height: 100%;
  }
}
</style>
