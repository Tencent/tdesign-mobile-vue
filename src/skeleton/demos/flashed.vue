<template>
  <div class="group">
    <t-skeleton class="group-avatar" :row-col="rowColsAvater" :loading="loading"></t-skeleton>
    <t-skeleton class="group-content" animation="flashed" theme="paragraph" :loading="loading" />
  </div>
</template>
<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean,
});

const { loading } = toRefs(props);
const rowColsAvater = [{ size: '48px', type: 'circle' }];
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
