<template>
  <t-tab-bar v-model="value" @change="change">
    <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :value="item.name">
      {{ item.text }}
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const value = ref('label_1');
const list = ref([
  { name: 'label_1', text: '标签栏一' },
  { name: 'label_2', text: '标签栏二' },
  { name: 'label_3', text: '标签栏三' },
  { name: 'label_4', text: '标签栏四' },
]);

watch(
  () => value.value,
  (newValue) => {
    console.log('当前值改变为：', newValue);
  },
);
const change = (changeValue: number | string) => {
  console.log('TabBar 值改变为：', changeValue);
};
</script>
