<template>
  <div class="image-group">
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" shape="round"></t-image>
      <p class="image-demo-tip">方形</p>
    </div>
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" shape="square"></t-image>
      <p class="image-demo-tip">圆角方形</p>
    </div>
    <div class="image-demo">
      <t-image class="image-container" alt="一张图片" :src="imageSrc" shape="circle"></t-image>
      <p class="image-demo-tip">圆形</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imageSrc = ref('https://tdesign.gtimg.com/site/upload1.png');
</script>

<style lang="less" scoped>
.image-group {
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;
  margin-bottom: -10px;
  .image-demo {
    margin-bottom: 10px;
    margin-right: 7%;
    width: 72px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .image-container {
      width: 100%;
      height: 72px;
    }
    .image-demo-tip {
      color: #646566;
      font-size: 14px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
