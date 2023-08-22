<template>
  <div v-for="(animationItem, index) in animationList" :key="index">
    <div class="demo-section__desc">{{ animationItem.title }}</div>
    <div class="demo-section__content">
      <t-skeleton theme="paragraph" :animation="animationItem.value" :loading="animationItem.loading"></t-skeleton>
    </div>
  </div>
</template>
<script lang="ts" setup>
const animationList = [
  {
    title: '渐变加载效果',
    value: 'gradient',
    loading: true,
  },
  {
    title: '闪烁加载效果',
    value: 'flashed',
    loading: true,
  },
];
</script>
<style lang="less" scoped>
.demo-section__desc {
  font-size: 14px;
  color: var(--td-text-color-disabled, rgba(0, 0, 0, 0.4));
  margin-top: 8px;
  line-height: 22px;
}

.demo-section__content {
  margin-top: 16px;
  margin-bottom: 24px;
}
</style>
