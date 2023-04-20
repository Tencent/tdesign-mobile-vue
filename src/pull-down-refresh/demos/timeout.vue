<template>
  <div class="tdesign-mobile-demo">
    <tdesign-demo-block title="" summary="">
      <t-pull-down-refresh
        v-model="refreshing"
        :refresh-timeout="1000"
        @timeout="handleTimeout"
        @refresh="handleRefresh"
        >下拉刷新</t-pull-down-refresh
      >
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { Toast } from 'tdesign-mobile-vue';

export default defineComponent({
  setup(props, context) {
    const refreshing = ref(false);
    const handleRefresh = (value: any) => {
      refreshing.value = true;
      setTimeout(() => {
        refreshing.value = false;
      }, 1000);
    };
    const handleTimeout = () => {
      Toast('已超时');
    };
    return {
      refreshing,
      handleRefresh,
      handleTimeout,
    };
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
