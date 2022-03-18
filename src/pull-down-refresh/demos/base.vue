<template>
  <div class="tdesign-mobile-demo">
    <tdesign-demo-block title="" summary="">
      <t-pull-down-refresh v-model="refreshing" @refresh="handleRefresh">下拉刷新</t-pull-down-refresh>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup(props, context) {
    const refreshing = ref(false);
    const handleRefresh = (value: any) => {
      refreshing.value = true;
      setTimeout(() => {
        refreshing.value = false;
      }, 1000);
    };
    return {
      refreshing,
      handleRefresh,
    };
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
