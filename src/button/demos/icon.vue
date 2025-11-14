<template>
  <div class="row">
    <t-button theme="primary" size="large" :icon="appIcon">填充按钮</t-button>
    <t-button theme="primary" size="large" :icon="appIcon" shape="square" />
    <t-button theme="primary" size="large" loading>加载中</t-button>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

const appIcon = () => h(AppIcon, { size: '24px' });
</script>

<style scoped lang="less">
.row {
  display: flex;
  padding: 0 16px;
}

.row + .row {
  margin-top: 16px;
}

.t-button + .t-button {
  margin-left: 16px;
}
</style>
