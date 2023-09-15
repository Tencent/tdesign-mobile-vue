<template>
  <div class="image-example">
    <div class="image-example-title">不同填充模式的图片</div>
    <div class="image-example-desc">提供 fill、contain、cover、none、scale-down 5 种填充类型。</div>
    <div class="image-group">
      <div class="image-demo">
        <p class="image-demo-tip">fill</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="fill"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">contain</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="contain"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">cover</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="cover"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">none</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="none"
          :src="imageSrc"
        ></t-image>
      </div>
      <div class="image-demo">
        <p class="image-demo-tip">scale-down</p>
        <t-image
          class="image-container"
          :style="{ width: '72px', height: '72px' }"
          fit="scale-down"
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
