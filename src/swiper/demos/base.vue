<template>
  <div class="tdesign-mobile-demo">
    <div style="padding: 0 16px">
      <t-swiper>
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
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less">
.t-swiper {
  margin-bottom: 24px;
}
.swiper-item--demo {
  img {
    height: 100%;
  }
}
</style>
