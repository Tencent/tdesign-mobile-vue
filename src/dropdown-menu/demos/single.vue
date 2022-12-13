<template>
  <t-dropdown-menu>
    <t-dropdown-item v-for="(item, index) in valueList" :key="index" :value="item" label="菜单" :options="options" />
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

const valueList = ref(['option_2', 'option_2', 'option_2', 'option_2']);
</script>
