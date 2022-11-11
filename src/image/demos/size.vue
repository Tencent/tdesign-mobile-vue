<template>
  <div class="image-group">
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" style="width: 56px; height: 56px"></t-image>
      <p class="image-demo-tip">56</p>
    </div>
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" style="width: 48px; height: 48px"></t-image>
      <p class="image-demo-tip">48</p>
    </div>
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" style="width: 32px; height: 32px"></t-image>
      <p class="image-demo-tip">32</p>
    </div>
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" style="width: 24px; height: 24px"></t-image>
      <p class="image-demo-tip">24</p>
    </div>
  </div>
  <div class="image-group">
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" style="width: 120px; height: 120px"></t-image>
      <p class="image-demo-tip">120</p>
    </div>
    <div class="image-demo">
      <t-image class="image-container" :src="imageSrc" style="width: 72px; height: 72px"></t-image>
      <p class="image-demo-tip">72</p>
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
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  .image-demo {
    margin-bottom: 10px;
    margin-right: 7%;
    &:last-child {
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
