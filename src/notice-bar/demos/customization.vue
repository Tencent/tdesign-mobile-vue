<template>
  <t-notice-bar visible content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述">
    <template #operation>
      <t-link style="margin-left: 2px" theme="primary">详情</t-link>
    </template>
    <template #suffixIcon>
      <CloseIcon />
    </template>
  </t-notice-bar>
</template>

<script lang="ts" setup>
import { CloseIcon } from 'tdesign-icons-vue-next';
</script>
