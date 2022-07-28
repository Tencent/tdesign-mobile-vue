<template>
  <div class="group">
    <t-skeleton :row-col="rowCols" class="item" :loading="loading"></t-skeleton>
    <t-skeleton :row-col="rowCols" class="item" :loading="loading"></t-skeleton>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean,
});

const { loading } = toRefs(props);
const rowCols = [
  { height: '171px' },
  1,
  { width: '107px' },
  [{ width: '93px' }, { width: '32px', marginLeft: '41px' }],
];
</script>
<style lang="less" scoped>
.group {
  display: flex;
  justify-content: space-between;
  .item {
    width: 47%;
  }
}
</style>
