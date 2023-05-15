<template>
  <t-notice-bar visible content="这是一条普通的通知信息">
    <template #suffixIcon>
      <CloseIcon />
    </template>
  </t-notice-bar>
</template>

<script lang="ts" setup>
import { CloseIcon } from 'tdesign-icons-vue-next';
</script>
