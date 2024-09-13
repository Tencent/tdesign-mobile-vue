<template>
  <t-config-provider :global-config="globalConfig">
    <!-- 全局配置：空数据呈现，演示 -->
    <t-table :data="[]" :columns="columns" bordered row-key="property"></t-table>
  </t-config-provider>
</template>

<script setup lang="ts">
import merge from 'lodash/merge';
import enConfig from 'tdesign-mobile-vue/es/locale/en_US';

const columns = [
  {
    colKey: 'type',
    title: 'Type',
    sorter: true,
  },
  {
    colKey: 'platform',
    title: 'Platform',
  },
  {
    colKey: 'property',
    title: 'Property',
    sorter: true,
    filter: {
      type: 'single',
    },
  },
];

const data = [
  { type: 'Array', platform: 'Vue(PC)', property: 'A' },
  { type: 'String', platform: 'React(PC)', property: 'B' },
  { type: 'Object', platform: 'Miniprogram', property: 'C' },
];

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
const globalConfig = merge(enConfig, {
  table: {
    empty: 'Empty Data Test',
  },
});
</script>
