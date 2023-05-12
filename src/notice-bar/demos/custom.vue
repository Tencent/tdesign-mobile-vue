<template>
  <t-notice-bar class="cover-class" visible content="提示文字描述提示文字描述提示文字描述">
    <template #prefixIcon>
      <SoundIcon />
    </template>
    <template #suffixIcon>
      <ChevronRightIcon />
    </template>
  </t-notice-bar>
</template>

<script lang="ts" setup>
import { SoundIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
</script>

<style lang="less">
.cover-class {
  .t-icon {
    color: rgba(0, 0, 0, 0.9) !important;
  }
  .t-notice-bar__text {
    color: #ffffff !important;
  }
  background-color: rgba(243, 243, 243, 1);
}
</style>
