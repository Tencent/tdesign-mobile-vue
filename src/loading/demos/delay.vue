<template>
  <div class="switch-wrap">
    <t-switch @change="onChangeLoading"></t-switch>
    <div>{{ showLoading ? '请求发起，延迟显示loading' : '请求结束，隐藏loading' }}</div>
  </div>
  <t-loading :delay="1000" :loading="showLoading" text="加载中..." />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { SwitchValue } from 'tdesign-mobile-vue';

const showLoading = ref(false);
const onChangeLoading = (value: SwitchValue) => {
  showLoading.value = Boolean(value);
};
</script>

<style scoped>
.switch-wrap {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  .t-switch {
    margin-right: 10px;
  }
}
</style>
