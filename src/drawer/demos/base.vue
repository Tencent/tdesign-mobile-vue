<template>
  <t-drawer v-model:visible="visible" :items="baseSidebar" @item-click="itemClick"></t-drawer>
  <t-button block variant="outline" size="large" theme="primary" @click="visible = true">基础抽屉</t-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerItem } from 'tdesign-mobile-vue';

const baseSidebar = ref([
  {
    title: '菜单一',
  },
  {
    title: '菜单二',
  },
  {
    title: '菜单三',
  },
  {
    title: '菜单四',
  },
  {
    title: '菜单五',
  },
  {
    title: '菜单六',
  },
]);
const visible = ref(false);
const itemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
  console.log('itemclick: ', index, item, context);
};
</script>
