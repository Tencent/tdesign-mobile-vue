<template>
  <div class="image-example">
    <div class="image-example-title">不同形状的图片</div>
    <div class="image-example-desc">
      提供方形、圆角方形、圆角 3 种形状。 当图片长宽不相等时，无法使用 circle 展示一个正圆。
    </div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imageSrc = ref('https://tdesign.gtimg.com/demo/demo-image-1.png');
</script>

<style lang="less" scoped>
.image-example {
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.6);

  &-title {
    font-size: 14px;
    line-height: 22px;
  }

  &-desc {
    font-size: 12px;
    line-height: 20px;
  }
}

.image-group {
  display: flex;
  flex-wrap: wrap;

  .image-demo {
    margin-right: 24px;
    .image-container {
      height: 72px;
      width: 72px;
      background-color: #000;
    }

    .image-demo-tip {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 22px;
      margin: 16px 0;
      white-space: nowrap;
    }
  }
}
</style>
