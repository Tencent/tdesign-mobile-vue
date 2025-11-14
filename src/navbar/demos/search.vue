<template>
  <t-navbar :fixed="false">
    <template #left>
      <t-search class="navbar-search" placeholder="搜索预设文案" shape="round" />
    </template>
    <template #right>
      <t-icon name="home" size="24px" />
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';
</script>

<style lang="less" scoped>
.navbar-search {
  --td-search-font-size: 14px;
}

.t-icon-home {
  margin-right: 8px;
}
</style>
