<template>
  <div class="cell-base">
    <t-steps v-model="current" :readonly="false" class="demo-steps">
      <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
      <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="未完成" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-steps-demo`;
export default defineComponent({
  name,
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
