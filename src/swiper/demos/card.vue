<template>
  <t-swiper
    type="card"
    :navigation="{ type: 'dots' }"
    :previous-margin="12"
    :next-margin="12"
    :autoplay="false"
    @change="handleChange"
  >
    <t-swiper-item v-for="(item, index) in swiperList" :key="index">
      <img :src="item" class="img" />
    </t-swiper-item>
  </t-swiper>
</template>
<script lang="ts" setup>
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

const handleChange = (index: number, context: any) => {
  console.log('基础示例,页数变化到》》》', index, context);
};
</script>

<style>
img {
  display: block;
  width: 100%;
  height: 192px;
}
</style>
