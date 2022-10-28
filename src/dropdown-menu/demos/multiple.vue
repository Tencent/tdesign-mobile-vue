<template>
  <t-dropdown-menu>
    <t-dropdown-item v-model="value1" label="单列多选" :options="options" multiple options-columns="1" />
    <t-dropdown-item
      v-model="value2"
      label="双列多选"
      :options="options"
      multiple
      options-layout="columns"
      options-columns="2"
    />
    <t-dropdown-item
      v-model="value3"
      label="最多四字项"
      :options="options"
      multiple
      options-layout="columns"
      options-columns="3"
    />
  </t-dropdown-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emptyArr = new Array(10).fill(null);
const options = emptyArr.map((_, i) => ({
  title: '选项名称',
  value: `option_${i + 1}`,
  disabled: false,
}));

options.push({
  title: '禁用选项',
  value: 'disabled-item',
  disabled: true,
});

const value1 = ref(['option_1']);
const value2 = ref(['option_1', 'option_2']);
const value3 = ref(['option_1', 'option_2', 'option_3']);
</script>
