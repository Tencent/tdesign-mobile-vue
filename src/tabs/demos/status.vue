<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="0">
      <t-tab-panel value="0" label="选中" />
      <t-tab-panel value="1" label="默认" />
      <t-tab-panel value="2" :disabled="true" label="禁用" />
    </t-tabs>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 16px;
}
</style>
