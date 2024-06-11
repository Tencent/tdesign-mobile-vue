<template>
  <div class="loading-demo">
    <t-loading :loading="loading" text="加载中..." fullscreen />
    <div>
      全局加载开关（开启加载1秒后自动归位）：
      <t-switch v-model="loading" size="small"></t-switch>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import TSwitch from '../../switch';

const loading = ref(false);

watch(
  () => loading.value,
  (v) => {
    if (!v) return;
    const timer = setTimeout(() => {
      loading.value = false;
      clearTimeout(timer);
    }, 1000);
  },
);
</script>

<style lang="less" scoped>
.loading-demo {
  padding: 0 16px;
}
</style>
