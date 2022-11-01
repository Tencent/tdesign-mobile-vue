<template>
  <t-tab-bar default-value="label_3">
    <t-tab-bar-item
      v-for="(item, index) in list"
      :key="item.name || index"
      :value="item.name"
      :sub-tab-bar="item.children"
    >
      {{ item.text }}
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
const list = [
  {
    name: 'label_1',
    text: '标签栏一',
  },
  {
    name: 'label_2',
    text: '标签栏二',
  },
  {
    name: 'label_3',
    text: '此处展开',
    children: [
      {
        value: 'spread_3',
        label: '展开项三',
      },
      {
        value: 'spread_2',
        label: '展开项二',
      },
      {
        value: 'spread_1',
        label: '展开项一',
      },
    ],
  },
];
</script>
