<template>
  <CustomCell title="带描述评分" class="space">
    <t-rate v-model="value1" show-text :texts="texts" />
  </CustomCell>
  <CustomCell title="带描述评分" class="space">
    <t-rate v-model="value2" show-text />
  </CustomCell>
  <CustomCell title="带描述评分" class="space">
    <t-rate v-model="value3" show-text />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const value1 = ref(3);
const value2 = ref(5);
const value3 = ref(0);
const texts = ref(['很差', '差', '一般', '好评', '优秀']);
</script>
<style lang="less" scoped>
.space {
  margin-bottom: 16px;
}
</style>
