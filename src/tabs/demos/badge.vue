<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="first">
      <t-tab-panel value="first" :badge-props="{ dot: true, offset: [-4, 14] }" label="选项" />
      <t-tab-panel value="second" :badge-props="{ count: 8, offset: [-8, 16] }" label="选项" />
      <t-tab-panel value="third" label="选项" />
    </t-tabs>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 16px;
}
</style>
