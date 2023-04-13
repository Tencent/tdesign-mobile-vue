<template>
  <div>
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
