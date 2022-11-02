<template>
  <CustomCell title="空心评分" class="space">
    <t-rate v-model="value1" variant="outline" clearable :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
  </CustomCell>
  <CustomCell title="实心评分" class="space">
    <t-rate v-model="value" clearable allow-half :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const defaultGap = 8;
const value = ref(2.5);
const value1 = ref(3);
</script>
<style lang="less" scoped>
.space {
  margin-bottom: 16px;
}
</style>
