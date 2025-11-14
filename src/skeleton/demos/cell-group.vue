<template>
  <div class="group">
    <t-skeleton :row-col="rowColsAvater" class="group-avatar" loading></t-skeleton>
    <t-skeleton :row-col="rowColsContent" class="group-content" loading></t-skeleton>
  </div>

  <div class="group">
    <t-skeleton :row-col="rowColsImage" class="group-avatar" loading></t-skeleton>
    <t-skeleton :row-col="rowColsContent" class="group-content" loading></t-skeleton>
  </div>
</template>

<script lang="ts" setup>
const rowColsAvater = [{ size: '48px', type: 'circle' }];
const rowColsImage = [{ size: '48px', type: 'rect' }];
const rowColsContent = [{ width: '50%' }, { width: '100%' }];
</script>

<style lang="less" scoped>
.group {
  display: flex;
  align-items: center;
  margin-top: 16px;
}

.group-avatar {
  margin-right: 16px;
}

.group-content {
  width: 283px;
}
</style>
