<template>
  <div class="cell-base">
    <t-cell-group title="横向可操作步骤条">
      <t-steps
        v-model="current" :readonly="false">
        <t-step title="步骤描述"></t-step>
        <t-step title="选中步骤"></t-step>
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
