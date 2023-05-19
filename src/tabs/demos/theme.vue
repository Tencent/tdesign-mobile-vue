<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="1" theme="tag">
      <t-tab-panel v-for="(item, index) in tabPanels" :key="index" :value="item.value" :label="item.label" />
    </t-tabs>
    <t-tabs default-value="1" theme="card">
      <t-tab-panel v-for="(item, index) in tabPanels" :key="index" :value="item.value" :label="item.label" />
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
const tabPanels = [
  {
    value: '1',
    label: '选项',
  },
  {
    value: '2',
    label: '选项',
  },
  {
    value: '3',
    label: '选项',
  },
  {
    value: '4',
    label: '选项',
  },
];
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 16px;
}
</style>
