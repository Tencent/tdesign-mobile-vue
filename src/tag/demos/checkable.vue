<template>
  <div>
    <div>
      <div v-for="(item, index) in variants" :key="index" class="tag-block check-tag-block">
        <div class="check-tag-block__title">{{ item }}</div>
        <t-check-tag :variant="item" size="large" :content="['已选中态', '未选中态']" />
        <t-check-tag :variant="item" default-checked size="large" :content="['已选中态', '未选中态']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const variants = ['light', 'dark', 'outline', 'light-outline'];
</script>

<style lang="less">
.check-tag-block {
  display: flex;
  align-items: center;

  &__title {
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    width: 80px;
    margin-right: 16px;
  }
}
</style>
