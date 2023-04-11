<template>
  <CustomCell title="填充评分" class="space">
    <t-rate v-model="value1" allow-half :color="['#FFC51C', '#E8E8E8']" />
  </CustomCell>
  <CustomCell title="线描评分" class="space">
    <t-rate v-model="value" allow-half color="#00A870" :icon="['star-filled', 'star']" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const value = ref(2);
const value1 = ref(3);
</script>
<style lang="less" scoped>
.space {
  margin-bottom: 16px;
}
</style>
