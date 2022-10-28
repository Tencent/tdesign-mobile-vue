<template>
  <CustomCell title="请点击评分">
    <t-rate :default-value="3" variant="outline" clearable :gap="8" />
  </CustomCell>
</template>
<script lang="ts" setup>
import CustomCell from './custom-cell.vue';
</script>
