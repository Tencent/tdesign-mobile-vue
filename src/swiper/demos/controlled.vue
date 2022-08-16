<template>
  <t-swiper v-model:current="state.currentPage" :interval="3000" :autoplay="true" :navigation="{ showSlideBtn: true }">
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
<script lang="ts" setup>
import { reactive } from 'vue';

const state: {
  currentPage: number;
} = reactive({
  currentPage: 1,
});
</script>
<style lang="less">
.swiper-item--demo {
  img {
    height: 100%;
  }
}
</style>
