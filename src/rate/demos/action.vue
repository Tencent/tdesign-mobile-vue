<template>
  <tdesign-demo-block summary="只可选全星时">
    <CustomCell title="点击或滑动" class="space">
      <t-rate v-model="value1" />
    </CustomCell>
  </tdesign-demo-block>
  <tdesign-demo-block summary="可选半星时">
    <CustomCell title="点击或滑动" class="space">
      <t-rate v-model="value2" allow-half />
    </CustomCell>
  </tdesign-demo-block>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const value1 = ref(3);
const value2 = ref(3);
</script>
<style lang="less" scoped>
.space {
  margin-bottom: 16px;
}
</style>
