<template>
  <div style="padding: 0 16px">
    <t-swiper
      :navigation="{ type: 'dots' }"
      :autoplay="true"
      :current="current"
      @click="handleClick"
      @change="handleChange"
    >
      <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 192px">
        <img :src="item" class="img" />
      </t-swiper-item>
    </t-swiper>
    <div class="tdesign-demo-block-row">
      <t-button size="small" theme="primary" @click="current = current + 2 > 5 ? 0 : current + 1">
        跳转到第 {{ current + 2 >= 6 ? 1 : current + 2 }} 项
      </t-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];
const current = ref(0);

const handleChange = (index: number, context: any) => {
  console.log('基础示例,页数变化到》》》', index, context);
};

const handleClick = (value: number) => {
  console.log('click: ', value);
};
</script>

<style>
img {
  display: block;
  width: 100%;
  height: 192px;
}
</style>
