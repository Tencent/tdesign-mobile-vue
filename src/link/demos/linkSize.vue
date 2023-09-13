<template>
  <div class="tdesign-mobile-link-demo">
    <t-link theme="primary" size="small">
      <template #suffixIcon>
        <jump-icon />
      </template>
      S跳转链接
    </t-link>
    <t-link theme="primary" size="medium">
      <template #suffixIcon>
        <jump-icon />
      </template>
      M跳转链接
    </t-link>
    <t-link theme="primary" size="large">
      <template #suffixIcon>
        <jump-icon />
      </template>
      L跳转链接
    </t-link>
  </div>
</template>
<script lang="ts" setup>
import { JumpIcon } from 'tdesign-icons-vue-next';
</script>
<style scoped>
.tdesign-mobile-link-demo {
  height: 48px;
  background-color: var(--bg-color-demo, #fff);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
