<template>
  <div class="image-group">
    <div class="image-demo">
      <p class="image-demo-tip">方形</p>
      <t-image class="image-container" :src="imageSrc" />
    </div>
    <div class="image-demo">
      <p class="image-demo-tip">圆角方形</p>
      <t-image class="image-container" :src="imageSrc" shape="round" />
    </div>
    <div class="image-demo">
      <p class="image-demo-tip">圆形</p>
      <t-image class="image-container" alt="一张图片" :src="imageSrc" fit="cover" shape="circle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imageSrc = ref('https://tdesign.gtimg.com/mobile/images/example4.png');
</script>

<style lang="less" scoped>
.image-group {
  margin-top: 24px;
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;

  .image-demo {
    width: 72px;
    margin-right: 24px;

    .image-container {
      width: 100%;
      height: 72px;
    }
    .image-demo-tip {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 16px;
      white-space: nowrap;
    }
  }
}
</style>
