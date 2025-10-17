<template>
  <t-navbar :fixed="false" left-arrow title="标题文字" @left-click="handleClick" />

  <t-navbar :fixed="false" left-arrow title="标题文字" @left-click="handleClick">
    <template #left>
      <t-icon name="close" size="24px" />
    </template>
    <template #right>
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>

  <t-navbar :fixed="false" :title-max-length="5" left-arrow title="标题文字超出" @left-click="handleClick">
    <template #right>
      <t-icon name="home" size="24px" />
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const handleClick = () => {
  console.log('left-click');
};
</script>

<style lang="less" scoped>
.t-navbar {
  margin-bottom: 16px;
}

.t-icon-close {
  margin: 0 8px;
}

.t-icon-home {
  margin-right: 8px;
}

.custom-capsule {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-capsule__icon {
  flex: 1;
  position: relative;
  margin: 0;
}

.custom-capsule :deep(.t-divider--vertical-center) :deep(.t-divider--vertical) {
  margin: 0;
}
</style>
