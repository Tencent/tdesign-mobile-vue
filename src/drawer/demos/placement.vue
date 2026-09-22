<template>
  <t-button block variant="outline" size="large" theme="primary" @click="visibleLeft = true">左侧抽屉</t-button>
  <t-button block variant="outline" size="large" theme="primary" @click="visibleRight = true">右侧抽屉</t-button>

  <t-drawer v-model:visible="visibleLeft" placement="left" :items="baseSidebar" @item-click="itemClick" />
  <t-drawer v-model:visible="visibleRight" placement="right" :items="baseSidebar" @item-click="itemClick" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DrawerItem } from 'tdesign-mobile-vue';

const visibleLeft = ref(false);
const visibleRight = ref(false);

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
]);
const itemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
  console.log('itemclick: ', index, item, context);
};
</script>
