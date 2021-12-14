<template>
  <div>
    <t-swiper :autoplay="false" :navigation="{ type: 'fraction', showSlideBtn: true }">
      <t-swiper-item class="swiper-item--demo"> itme1 </t-swiper-item>
      <t-swiper-item style="background: blue" class="swiper-item--demo"> item2 </t-swiper-item>
      <t-swiper-item style="background: green" class="swiper-item--demo"> item3 </t-swiper-item>
    </t-swiper>
  </div>
</template>
<script lang="ts" setup></script>
