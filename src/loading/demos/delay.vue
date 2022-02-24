<template>
  <div>
    <div class="switch-wrap">
      <t-switch @change="onChangeLoading"></t-switch>
      <div>{{ showLoading ? '请求发起，延迟显示loading' : '请求结束，隐藏loading' }}</div>
    </div>
    <t-loading :delay="1000" :loading="showLoading" text="加载中..." />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const showLoading = ref(false);
    const onChangeLoading = (value: boolean) => {
      showLoading.value = value;
    };

    return {
      showLoading,
      onChangeLoading,
    };
  },
});
</script>
