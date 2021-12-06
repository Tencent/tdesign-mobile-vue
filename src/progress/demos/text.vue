<template>
  <div class="cell-base">
    <t-progress :percentage="0" :show-text="false" />
    <t-progress :percentage="30" :show-text="false" />
    <t-progress :percentage="100" :show-text="false" />
    <t-progress type="error" :percentage="88" :show-text="false" />
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
