<template>
  <t-tab-bar v-model="value" theme="tag" :split="false" @change="change">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      {{ item.label }}
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const value = ref('home');
const list = ref([
  { value: 'home', label: '首页' },
  { value: 'app', label: '应用' },
  { value: 'chat', label: '聊天' },
  { value: 'user', label: '我的' },
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
