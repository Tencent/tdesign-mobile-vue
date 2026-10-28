<template>
  <t-dropdown-menu placement="right" @menu-opened="handleMenuOpened" @menu-closed="handleMenuClosed">
    <t-dropdown-item :options="product.options" :value="product.value" @change="onChange" />
    <t-dropdown-item :options="sorter.options" :value="sorter.value" />
  </t-dropdown-menu>
</template>

<script lang="ts" setup>
import type { DropdownOption, DropdownValue } from 'tdesign-mobile-vue';

const product: { value: DropdownValue; options: DropdownOption[] } = {
  value: 'all',
  options: [
    {
      value: 'all',
      label: '全部产品',
    },
    {
      value: 'new',
      label: '最新产品',
    },
    {
      value: 'hot',
      label: '最火产品',
    },
  ],
};
const sorter: { value: DropdownValue; options: DropdownOption[] } = {
  value: 'default',
  options: [
    {
      value: 'default',
      label: '默认排序',
    },
    {
      value: 'price',
      label: '价格从高到低',
    },
  ],
};
function onChange(e: any) {
  console.log(e);
}

const handleMenuOpened = () => {
  console.log('==handleMenuOpened===');
};

const handleMenuClosed = (val: string) => {
  console.log('==handleMenuClosed===', val);
};
</script>
