<template>
  <t-dropdown-menu>
    <t-dropdown-item v-model="value1" label="菜单" :options="options" />
    <t-dropdown-item v-model="value2" label="菜单" :options="options" />
    <t-dropdown-item v-model="value3" label="菜单" :options="options" />
    <t-dropdown-item v-model="value4" label="两字菜单" :options="options" />
  </t-dropdown-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const chineseMap = '一二三四五六';
const emptyArr = new Array(6).fill(null);
const options = emptyArr.map((_, i) => ({
  title: `选项${chineseMap[i]}`,
  value: `option_${i}`,
  disabled: false,
}));

options.push({
  title: '禁用选项',
  value: 'disabled-item',
  disabled: true,
});

const value1 = ref('option_2');
const value2 = ref('option_2');
const value3 = ref('option_2');
const value4 = ref('option_2');
</script>
