<template>
  <div>
    <t-button @click="handleLoading">plugin形式调用</t-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LoadingPlugin } from '../plugin';

const showLoading = ref(false);
const handleLoading = (value: boolean) => {
  const loading = LoadingPlugin({
    loading: true,
    size: '20px',
    text: '插件形式的loading....加载中',
  });
  const timer = setTimeout(() => {
    loading.hide();
    clearTimeout(timer);
  }, 1000);
};
</script>

<style scoped>
.t-loading {
  margin-right: 64px;
}
</style>
