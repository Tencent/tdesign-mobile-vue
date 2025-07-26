<template>
  <div class="upload-demo">
    <div class="upload-title">可拖拽排序</div>
    <t-upload
      v-model="files"
      multiple
      :draggable="true"
      accept="image/png"
      action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const files = ref([
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png',
    name: 'image1.png',
    type: 'image',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/upload6.png',
    name: 'image2.png',
    type: 'image',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/upload5.png',
    name: 'image3.png',
    type: 'image',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/upload6.png',
    name: 'image4.png',
    type: 'image',
  },
]);
</script>

<style scoped lang="less">
.upload-demo {
  background: var(--bg-color-demo, #fff);
  .upload-title {
    font-size: 16px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
    padding: 12px 16px;
  }
}
</style>
