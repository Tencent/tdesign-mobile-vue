<template>
  <div class="cell-base">
    <t-steps v-model="current4" :readonly="false">
      <t-step title="步骤描述1" content="辅助信息文字最多两行">
        <template #icon>
          <t-icon name="user-filled"></t-icon>
        </template>
      </t-step>
      <t-step title="未完成" content="辅助信息文字最多两行">
        <template #icon>
          <t-icon name="user-filled"></t-icon>
        </template>
      </t-step>
      <t-step title="未完成" content="辅助信息文字最多两行">
        <template #icon>
          <t-icon name="user-filled"></t-icon>
        </template>
      </t-step>
      <t-step title="未完成" content="辅助信息文字最多两行">
        <template #icon>
          <t-icon name="user-filled"></t-icon>
        </template>
      </t-step>
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
    const current4 = ref(1);
    return {
      current4,
    };
  },
});
</script>
