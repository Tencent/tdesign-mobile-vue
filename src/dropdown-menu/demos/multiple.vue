<template>
  <t-dropdown-menu>
    <t-dropdown-item
      v-model="value1"
      label="单列多选"
      :options="multipleSelect.options"
      multiple
      options-columns="1"
      @change="handleMultipleSelect"
    />
    <t-dropdown-item
      v-model="value2"
      label="双列多选"
      :options="doubleColumnsOptions"
      :default-value="['option_1', 'option_2']"
      multiple
      options-layout="columns"
      options-columns="2"
    />
    <t-dropdown-item
      v-model="value3"
      label="三列多选"
      :options="tripleColumnsOptions"
      :default-value="['option_1', 'option_2', 'option_3']"
      multiple
      options-layout="columns"
      options-columns="3"
    />
  </t-dropdown-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const chineseNumber = '一二三四五六七八九十'.split('');

const singleSelectOptions = new Array(8).fill(null).map((_, i) => ({
  label: `选项${chineseNumber[i]}`,
  value: `option_${i + 1}`,
  disabled: false,
}));

singleSelectOptions.push({
  label: '禁用选项',
  value: 'disabled',
  disabled: true,
});

const doubleColumnsOptions = [
  ...singleSelectOptions,
  {
    label: '禁用选项',
    value: 'disabled',
    disabled: true,
  },
];

const tripleColumnsOptions = [
  ...doubleColumnsOptions,
  {
    label: '禁用选项',
    value: 'disabled',
    disabled: true,
  },
];

tripleColumnsOptions.splice(8, 0, {
  label: `选项${chineseNumber[8]}`,
  value: `option_${9}`,
  disabled: false,
});

const multipleSelect = {
  value: ['option_1'],
  options: singleSelectOptions,
};

function handleMultipleSelect(e: any) {
  console.log(e);
}

const emptyArr = new Array(10).fill(null);
const options = emptyArr.map((_, i) => ({
  label: '选项名称',
  value: `option_${i + 1}`,
  disabled: false,
}));

options.push({
  label: '禁用选项',
  value: 'disabled-item',
  disabled: true,
});

const value1 = ref(['option_1']);
const value2 = ref(['option_1', 'option_2']);
const value3 = ref(['option_1', 'option_2', 'option_3']);
</script>
