<template>
  <t-drawer v-model:visible="visible" placement="left" title="标题" :items="baseSidebar" @item-click="itemClick" />
  <t-button block variant="outline" size="large" theme="primary" @click="visible = true">带标题抽屉</t-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerItem } from '../type';

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
