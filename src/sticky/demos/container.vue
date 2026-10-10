<template>
  <div ref="container" class="sticky-demo">
    <t-sticky :container="container" @scroll="onScroll">
      <t-button size="large" class="common-button green-button">指定容器</t-button>
    </t-sticky>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const container = ref<HTMLElement>();
const onScroll = (context: { scrollTop: number; isFixed: boolean }) => {
  console.log(context);
};
</script>

<style lang="less" scoped>
.sticky-demo {
  width: 100%;
  height: 150px;
  background-color: var(--td-bg-color-container);
}
.common-button {
  color: #fff;
  width: 104px;
  margin-left: 256px;
}
.green-button {
  background-color: rgba(0, 168, 112, 1);
  color: #fff;
}
</style>
