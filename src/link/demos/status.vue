<template>
  <div class="tdesign-mobile-link-demo">
    <t-link theme="primary" disabled>
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
    <t-link disabled>
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
    <t-link theme="danger" disabled>
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
  </div>
  <div class="tdesign-mobile-link-demo">
    <t-link theme="success" disabled>
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
    <t-link theme="warning" disabled>
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
  </div>
</template>
<script lang="ts" setup>
import { JumpIcon } from 'tdesign-icons-vue-next';
</script>
<style scoped>
.tdesign-mobile-link-demo {
  height: 48px;
  background: #ffffffff;
  display: flex;
  justify-content: space-around;
  margin-bottom: 6.4vw;
}
</style>
