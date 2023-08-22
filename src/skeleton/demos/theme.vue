<template>
  <div v-for="(themeItem, index) in themeList" :key="index">
    <div class="demo-section__desc">{{ themeItem.title }}</div>
    <div class="demo-section__content">
      <t-skeleton :theme="themeItem.value" :loading="themeItem.loading"></t-skeleton>
    </div>
  </div>
</template>
<script lang="ts" setup>
const themeList = [
  {
    title: '头像骨架屏',
    value: 'avatar',
    loading: true,
  },
  {
    title: '图片骨架屏',
    value: 'image',
    loading: true,
  },
  {
    title: '文本骨架屏',
    value: 'text',
    loading: true,
  },
  {
    title: '段落骨架屏',
    value: 'paragraph',
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
