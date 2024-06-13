<template>
  <t-button block size="large" variant="outline" theme="primary" @click="visible = true">
    基础图片预览 + 对齐方式
  </t-button>
  <t-image-viewer v-model:images="images" v-model:visible="visible" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const images = [
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
    align: 'start',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
    align: 'end',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
    align: 'center',
  },
];
</script>
