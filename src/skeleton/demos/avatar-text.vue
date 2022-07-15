<template>
  <div class="group">
    <t-skeleton class="group-avatar" :row-col="rowColsAvater" :loading="loading"></t-skeleton>
    <t-skeleton class="group-content" :row-col="rowColsContent" :loading="loading"></t-skeleton>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean,
});

const { loading } = toRefs(props);
const rowColsAvater = [{ size: '48px', type: 'circle' }];
const rowColsContent = [{ width: '50%' }, { width: '100%' }];
</script>
<style lang="less" scoped>
.group {
  display: flex;
  margin-bottom: 16px;
}

.group-avatar {
  margin-right: 12px;
}

.group-content {
  width: 100%;
}
</style>
