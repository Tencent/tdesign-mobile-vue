<template>
  <div class="image-group">
    <div class="image-demo">
      <p class="image-demo-tip">裁切</p>
      <t-image class="image-container image-container-1" fit="cover" position="left" :src="imageSrc"></t-image>
    </div>
    <div class="image-demo">
      <p class="image-demo-tip">适应高</p>
      <t-image class="image-container image-container-2" fit="contain" :src="imageSrc"></t-image>
    </div>
    <div class="image-demo">
      <p class="image-demo-tip">cover</p>
      <t-image class="image-container image-container-3" fit="contain" :src="imageSrc"></t-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// https://tdesign.gtimg.com/demo/demo-image-1.png
// https://tdesign.gtimg.com/mobile/images/example4.png
const imageSrc = ref('https://tdesign.gtimg.com/demo/demo-image-1.png');
</script>

<style lang="less" scoped>
.image-group {
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;
  margin-bottom: -10px;

  .image-demo {
    margin-right: 24px;
    // width: 72px;

    &:nth-child(3n) {
      margin-right: 0;
    }

    .image-container {
      // width: 100%;
      height: 72px;
    }

    .image-container-1 {
      width: 72px;
    }

    .image-container-2 {
      width: 89px;
    }

    .image-container-3 {
      width: 121px;
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
