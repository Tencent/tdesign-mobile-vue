<template>
  <div class="demo-drawer">
    <t-drawer v-model:visible="openBase" placement="left" :items="baseSidebar" @item-click="itemClick"></t-drawer>
    <div class="button-group">
      <t-button block variant="outline" size="large" @click="openDrawer(false)">基础抽屉</t-button>
    </div>
  </div>
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
const openBase = ref(false);
const openDrawer = (type: boolean) => {
  openBase.value = true;
};

const itemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
  console.log('itemclick: ', index, item, context);
};
</script>
<style lang="less" scoped>
.demo-drawer {
  .button-group {
    padding: 0 16px;
  }
}
</style>
