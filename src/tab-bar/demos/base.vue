<template>
  <t-tab-bar v-model="value" @change="change">
    <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :value="item.name">
      {{ item.text }}
      <template #icon>
        <icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';

const value = ref('label_1');
const list = ref([
  { name: 'label_1', text: '文字', icon: 'app' },
  { name: 'label_2', text: '文字', icon: 'app' },
  { name: 'label_3', text: '文字', icon: 'app' },
  { name: 'label_4', text: '文字', icon: 'app' },
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
