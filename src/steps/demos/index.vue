<template>
  <div class="cell-base">
    <t-steps v-model="current5">
      <t-step title="已完成步骤"></t-step>
      <t-step title="当前步骤"></t-step>
      <t-step title="未完成步骤"></t-step>
    </t-steps>
    <hr />
    <t-steps v-model="current6">
      <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      current: 0,
    };
  },
});
</script>
<style lang="less">
hr{
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
}
</style>
