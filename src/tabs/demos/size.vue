<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="1" size="medium">
      <t-tab-panel v-for="(item, index) in mediumTabPanels" :key="index" :value="item.value" :label="item.label" />
    </t-tabs>
    <t-tabs default-value="1" size="large">
      <t-tab-panel v-for="(item, index) in largeTabPanels" :key="index" :value="item.value" :label="item.label" />
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
const mediumTabPanels = [
  {
    value: '1',
    label: '小尺寸',
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

const largeTabPanels = [
  {
    value: '1',
    label: '大尺寸',
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
