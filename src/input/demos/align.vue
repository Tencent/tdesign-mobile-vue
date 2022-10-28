<template>
  <t-cell-group>
    <t-input label="左对齐" placeholder="请输入文字" />
  </t-cell-group>
  <t-cell-group>
    <t-input label="居中" placeholder="请输入文字" align="center" />
  </t-cell-group>
  <t-cell-group>
    <t-input label="右对齐" placeholder="请输入文字" align="right" />
  </t-cell-group>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.t-cell-group + .t-cell-group {
  margin-top: 16px;
}
</style>
