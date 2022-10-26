<template>
  <t-tab-bar v-model="value" @change="change">
    <t-tab-bar-item v-for="(item, i) in list" :key="item.name || i" :value="item.name">
      <template #icon>
        <app-icon />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

const value = ref('label_1');
const list = ref([{ name: 'label_1' }, { name: 'label_2' }, { name: 'label_3' }, { name: 'label_4' }]);

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
