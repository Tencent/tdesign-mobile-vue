<template>
  <div class="demo-steps-base">
    <t-steps v-model="current" :readonly="false" class="demo-steps">
      <t-step title="步骤描述"></t-step>
      <t-step title="选中步骤"></t-step>
    </t-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      current: 0,
    };
  },
});
</script>
<style lang="less" scoped>
.demo-steps-base {
  .demo-steps {
    padding-top: 12px;
  }
}
</style>
