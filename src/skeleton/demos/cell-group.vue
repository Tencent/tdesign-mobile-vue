<template>
  <div class="group">
    <t-skeleton class="group-avatar" :row-col="rowColsAvater" loading></t-skeleton>
    <t-skeleton class="group-content" :row-col="rowColsContent" loading></t-skeleton>
  </div>

  <div class="group">
    <t-skeleton class="group-avatar" :row-col="rowColsImage" loading></t-skeleton>
    <t-skeleton class="group-content" :row-col="rowColsContent" loading></t-skeleton>
  </div>
</template>

<script lang="ts" setup>
const rowColsAvater = [{ size: '96rpx', type: 'circle' }];
const rowColsImage = [{ size: '96rpx', type: 'rect' }];
const rowColsContent = [{ width: '50%' }, { width: '100%' }];
</script>

<style lang="less" scoped>
.group {
  display: flex;
  align-items: center;
  margin-top: 16px;
}

.group-avatar {
  margin-right: 12px;
}

.group-content {
  width: 283px;
}
</style>
