<template>
  <t-navbar title="标题文字" :fixed="false" left-arrow @left-click="handleClick" />

  <t-navbar title="这是一个超长的标题文字" :fixed="false" left-arrow @left-click="handleClick">
    <template #left>
      <t-icon name="close" size="24px" />
    </template>
    <template #right>
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>

  <t-navbar title="只能显示五个字" :title-max-length="5" :fixed="false" @left-click="handleClick">
    <template #capsule>
      <div class="custom-capsule">
        <t-icon name="chevron-left" size="20px" class="custom-capsule__icon" />
        <t-divider layout="vertical" />
        <t-icon name="home" size="20px" class="custom-capsule__icon" />
      </div>
    </template>
    <template #right>
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
  margin-left: 8px;
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
