<template>
  <t-cell-group theme="card">
    <t-cell :left-icon="lock" title="单行标题" arrow />
    <t-cell :left-icon="service" title="单行标题" arrow />
    <t-cell :left-icon="internet" title="单行标题" arrow />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { LockOnIcon, ServiceIcon, InternetIcon } from 'tdesign-icons-vue-next';

const lock = () => h(LockOnIcon);
const service = () => h(ServiceIcon);
const internet = () => h(InternetIcon);
</script>
