<template>
  <t-button block size="large" variant="outline" theme="primary" @click="visible = true">带操作图片预览</t-button>
  <t-image-viewer v-model:images="images" v-model:visible="visible" :delete-btn="true" show-index />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const images = [
  'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
  'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
];
</script>
