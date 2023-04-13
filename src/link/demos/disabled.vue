<template>
  <div>
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
