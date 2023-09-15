<template>
  <div class="image-example">
    <div class="image-example-title">不同填充位置的图片</div>
    <div class="image-example-desc">当图片过大时，提供显示图片的局部左侧对齐、或右侧对齐的不同位置。</div>
    <div class="image-group">
      <div class="image-demo">
        <p class="image-demo-tip">cover center</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="cover"
          position="center"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">cover left</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="cover"
          position="left"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">cover right</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="cover"
          position="right"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">cover top</p>
        <t-image :style="{ width: '240px', height: '80px' }" fit="cover" position="top" :src="imageSrc"></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">cover bottom</p>
        <t-image :style="{ width: '240px', height: '80px' }" fit="cover" position="bottom" :src="imageSrc"></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">contain top</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '80px' }"
          fit="contain"
          position="top"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">contain bottom</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '80px' }"
          fit="contain"
          position="bottom"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">contain center</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '80px' }"
          fit="contain"
          position="center"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">contain left</p>
        <t-image
          class="image-container"
          :style="{ width: '180px', height: '80px' }"
          fit="contain"
          position="left"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">contain right</p>
        <t-image
          class="image-container"
          :style="{ width: '180px', height: '80px' }"
          fit="contain"
          position="right"
          :src="imageSrc"
        ></t-image>
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
  color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));

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
      background-color: #000;
    }

    .image-demo-tip {
      color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
      font-size: 14px;
      line-height: 22px;
      margin: 16px 0;
      white-space: nowrap;
    }
  }
}
</style>
