<template>
  <div class="group">
    <t-skeleton class="group-avatar" :row-col="rowColsImage" :loading="loading"></t-skeleton>
    <t-skeleton class="group-content" :row-col="rowColsContent" :loading="loading"></t-skeleton>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean,
});

const { loading } = toRefs(props);
const rowColsImage = [{ size: '48px', type: 'rect' }];
const rowColsContent = [{ width: '50%' }, { width: '100%' }];
</script>
<style lang="less" scoped>
.group {
  display: flex;
}

.group-avatar {
  margin-right: 12px;
}

.group-content {
  width: 100%;
}
</style>
