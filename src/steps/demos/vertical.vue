<template>
  <div class="cell-base">
    <t-steps v-model="current" layout="vertical" class="demo-steps">
      <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const current = ref(0);
    return {
      current,
    };
  },
});
</script>
<style lang="less" scoped>
.demo-steps {
  padding-top: 12px;
}
</style>
