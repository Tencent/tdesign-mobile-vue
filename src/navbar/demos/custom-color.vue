<template>
  <t-navbar title="标题文字" :fixed="false" left-arrow class="custom-navbar">
    <template #right>
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';
</script>

<style lang="less" scoped>
.custom-navbar {
  --td-navbar-bg-color: #0052d9;
  --td-navbar-color: #fff;
}
</style>
