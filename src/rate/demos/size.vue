<template>
  <CustomCell title="大尺寸 24" class="space">
    <t-rate v-model="value1" />
  </CustomCell>
  <CustomCell title="小尺寸 20" class="space">
    <t-rate v-model="value" size="20" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const value = ref(3);
const value1 = ref(3);
</script>
<style lang="less" scoped>
.space {
  margin-bottom: 16px;
}
</style>
