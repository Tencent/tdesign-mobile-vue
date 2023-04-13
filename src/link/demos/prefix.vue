<template>
  <div>
    <t-link theme="primary">
      <template #prefixIcon>
        <link-icon />
      </template>
      跳转链接
    </t-link>
    <t-link>
      <template #prefixIcon>
        <link-icon />
      </template>
      跳转链接
    </t-link>
  </div>
</template>
<script lang="ts" setup>
import { LinkIcon } from 'tdesign-icons-vue-next';
</script>
