<template>
  <t-input label="标签文字" placeholder="请输入文字">
    <template #prefixIcon>
      <app-icon />
    </template>
  </t-input>
  <t-input placeholder="请输入文字">
    <template #prefixIcon>
      <app-icon />
    </template>
  </t-input>
</template>

<script lang="ts" setup>
import { AppIcon } from 'tdesign-icons-vue-next';
</script>
