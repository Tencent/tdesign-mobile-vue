<template>
  <div>
    <tdesign-demo-block summary="自定义颜色">
      <div class="progress-demo">
        <t-progress :percentage="customPercentage" track-color="#EAC9FF" color="#CD04FF">
          <template #label>
            <span class="label--color">{{ customPercentage }}%</span>
          </template>
        </t-progress>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TypeDemo',
  setup() {
    const customPercentage = ref(88);
    return {
      customPercentage,
    };
  },
});
</script>
<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
  .label--color {
    color: #d504d9;
  }
}
</style>
