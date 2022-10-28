<template>
  <t-cell-group>
    <t-input label="小规格H48" placeholder="请输入文字" />
  </t-cell-group>
  <t-cell-group>
    <t-input label="中规格H56" placeholder="请输入文字" size="medium" />
  </t-cell-group>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.t-cell-group + .t-cell-group {
  margin-top: 16px;
}
</style>
