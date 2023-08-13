<template>
  <div style="padding: 0 16px">
    <t-swiper
      :autoplay="true"
      :navigation="{ showControls: true, paginationPosition: 'bottom-right' }"
      height="192"
      @change="handleChange"
    >
      <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px">
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

const handleChange = (index: number, context: any) => {
  console.log('基础示例,页数变化到》》》', index, context);
};
</script>
