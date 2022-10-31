<template>
  <CustomCell title="规格20" class="space">
    <t-rate v-model="value1" clearable :gap="defaultGap" />
  </CustomCell>
  <CustomCell title="规格16" class="space">
    <t-rate v-model="value" size="16" clearable :gap="defaultGap" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const defaultGap = 8;
const value = ref(3);
const value1 = ref(3);
</script>
<style lang="less" scoped>
.space {
  margin-bottom: 16px;
}
</style>
