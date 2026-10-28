<template>
  <div>
    <BaseDemo />
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
</script>

<style lang="less">
.tdesign-demo-topnav,
.tdesign-mobile-demo {
  background-color: var(--td-bg-color-container);
}

.tdesign-mobile-demo {
  &-block__slot {
    margin-top: 0;
  }
}
</style>
