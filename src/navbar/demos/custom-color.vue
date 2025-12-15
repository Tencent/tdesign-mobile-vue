<template>
  <t-navbar :fixed="false" class="custom-navbar" left-arrow title="标题文字">
    <template #right>
      <t-icon name="ellipsis" size="24px" />
    </template>
  </t-navbar>
</template>

<script lang="ts" setup>
import { Icon as TIcon } from 'tdesign-icons-vue-next';
</script>

<style lang="less" scoped>
@import '../../_common/style/mobile/_variables';

.custom-navbar {
  --td-navbar-bg-color: @brand-color;
  --td-navbar-color: #fff;
}
</style>
