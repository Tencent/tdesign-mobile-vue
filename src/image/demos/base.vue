<template>
  <div class="image-group">
    <div class="image-demo">
      <p class="image-demo-tip">fill</p>
      <t-image class="image-container" fit="fill" :src="imageSrc"></t-image>
    </div>
    <div class="image-demo">
      <p class="image-demo-tip">contain</p>
      <t-image class="image-container" fit="contain" :src="imageSrc"></t-image>
    </div>
    <div class="image-demo" style="width: 134px">
      <p class="image-demo-tip">cover</p>
      <t-image class="image-container" fit="cover" :src="imageSrc"></t-image>
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
    margin-right: 24px;
    width: 72px;

    &:nth-child(3n) {
      margin-right: 0;
    }

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
