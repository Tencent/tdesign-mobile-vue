<template>
  <t-navbar :fixed="false">
    <template #left>
      <t-image src="https://tdesign.gtimg.com/mobile/demos/logo1.png" class="logo" />
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
.logo {
  width: 102px;
  height: 24px;
}

.t-icon-home {
  margin-right: 8px;
}
</style>
