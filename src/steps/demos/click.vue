<template>
  <div class="cell-base">
    <t-steps v-model="current" :readonly="false" class="demo-steps">
      <t-step v-for="(item, index) in stepData" :key="index" :title="item.title" :content="item.content"></t-step>
    </t-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const current = ref(0);
    const stepData = ref([
      {
        title: '步骤描述',
        content: '辅助信息文字最多两行',
      },
      {
        title: '选中步骤',
        content: '辅助信息文字最多两行',
      },
      {
        title: '未完成',
        content: '辅助信息文字最多两行',
      },
    ]);
    return {
      current,
      stepData,
    };
  },
});
</script>

<style lang="less" scoped>
.demo-steps {
  padding-top: 12px;
}
</style>
