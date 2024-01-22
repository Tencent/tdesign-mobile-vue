<template>
  <t-button block size="large" variant="outline" theme="primary" @click="visible = true">基础图片预览</t-button>
  <t-image-viewer v-model:images="images" v-model:visible="visible" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];
</script>
