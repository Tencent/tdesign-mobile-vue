<template>
  <div class="cell-base">
    <t-cell-group title="竖向只读步骤">
      <t-steps v-model="current" direction="vertical">
        <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
        <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
        <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
      </t-steps>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      current: 0,
    };
  },
};
</script>
