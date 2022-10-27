<template>
  <t-tab-bar v-model="value" @change="change">
    <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :value="item.name" :badge-props="item.badgeProps">
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
  { name: 'label_1', text: '文字', icon: 'app', badgeProps: { count: 16 } },
  { name: 'label_2', text: '文字', icon: 'app', badgeProps: { dot: true } },
  { name: 'label_3', text: '文字', icon: 'app', badgeProps: { count: 'New' } },
  { name: 'label_4', text: '文字', icon: 'app', badgeProps: { count: '···' } },
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
