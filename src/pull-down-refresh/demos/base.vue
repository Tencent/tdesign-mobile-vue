<template>
  <t-pull-down-refresh
    v-model="refreshing"
    :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']"
    @refresh="handleRefresh"
  >
    <slot> 下拉刷新 </slot>
  </t-pull-down-refresh>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const refreshing = ref(false);
const handleRefresh = (value: any) => {
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
};
</script>

<style lang="less" scoped></style>
