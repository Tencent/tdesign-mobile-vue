<template>
  <div class="cell-base">
    <t-progress :percentage="0" />
    <t-progress :percentage="30" />
    <t-progress :percentage="100" />
    <t-progress type="error" :percentage="88" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.cell-base {
  .t-progress {
    margin-bottom: 20px;
  }
}
</style>
