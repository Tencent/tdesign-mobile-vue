<template>
  <t-cell-group theme="card">
    <t-cell :left-icon="h(ServiceIcon)" title="单行标题" arrow />
    <t-cell :left-icon="h(InternetIcon)" title="单行标题" arrow />
    <t-cell :left-icon="h(LockOnIcon)" title="单行标题" arrow />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { LockOnIcon, ServiceIcon, InternetIcon } from 'tdesign-icons-vue-next';
</script>
