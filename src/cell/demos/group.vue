<template>
  <t-cell-group theme="card">
    <t-cell :left-icon="app" title="单行标题" arrow />
    <t-cell :left-icon="service" title="单行标题" arrow />
    <t-cell :left-icon="internet" title="单行标题" arrow />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AppIcon, ServiceIcon, InternetIcon } from 'tdesign-icons-vue-next';

const app = () => h(AppIcon);
const service = () => h(ServiceIcon);
const internet = () => h(InternetIcon);
</script>
