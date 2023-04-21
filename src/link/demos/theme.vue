<template>
  <div class="tdesign-mobile-link-demo">
    <t-link theme="primary">
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
    <t-link>
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
    <t-link theme="danger">
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
  </div>
  <div class="tdesign-mobile-link-demo">
    <t-link theme="success">
      <template #suffixIcon>
        <jump-icon />
      </template>
      跳转链接
    </t-link>
    <t-link theme="warning">
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
  align-items: center;
}
</style>
