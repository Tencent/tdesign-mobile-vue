<template>
  <div style="padding: 0 16px">
    <t-swiper
      direction="vertical"
      :autoplay="true"
      :navigation="{ type: 'dots-bar', paginationPosition: 'right' }"
      @change="handleChange"
    >
      <t-swiper-item v-for="(item, index) in swiperList" :key="index" class="swiper-item--demo">
        <img :src="item" class="img" />
      </t-swiper-item>
    </t-swiper>
  </div>
</template>
<script lang="ts" setup>
const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

const handleChange = (index: number) => {
  console.log('基础示例,页数变化到》》》', index);
};
</script>
<style lang="less">
.swiper-item--demo {
  img {
    height: 100%;
  }
}
</style>
