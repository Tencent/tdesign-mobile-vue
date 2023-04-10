<template>
  <t-input label="标签文字" layout="vertical" placeholder="请输入文字">
    <template #suffixIcon>
      <error-circle-filled-icon />
    </template>
  </t-input>
</template>

<script lang="ts" setup>
import { ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
</script>
