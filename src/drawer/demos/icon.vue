<template>
  <div class="demo-drawer">
    <t-drawer
      v-model:visible="openIcon"
      placement="left"
      :items="iconSidebar"
      @item-click="itemClick"
      @overlay-click="onOverlayClick"
      @close="onClose"
    ></t-drawer>
    <div class="button-group">
      <t-button block variant="outline" size="large" @click="openDrawer(true)">带图标抽屉</t-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { DrawerCloseContext, DrawerItem } from '../type';

const iconSidebar = ref([
  {
    title: '菜单一',
    icon: () => h(AppIcon),
  },
  {
    title: '菜单二',
    icon: () => h(AppIcon),
  },
  {
    title: '菜单三',
    icon: () => h(AppIcon),
  },
  {
    title: '菜单四',
    icon: () => h(AppIcon),
  },
  {
    title: '菜单五',
    icon: () => h(AppIcon),
  },
  {
    title: '菜单六',
    icon: () => h(AppIcon),
  },
]);
const openIcon = ref(false);
const openDrawer = (type: boolean) => {
  openIcon.value = true;
};

const itemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
  console.log('itemclick: ', index, item, context);
};

const onClose = ({ trigger }: DrawerCloseContext) => {
  console.log('onClose: ', trigger);
};

const onOverlayClick = ({ visible }: { visible: boolean }) => {
  console.log('onOverlayClick:', visible);
};
</script>
<style lang="less" scoped>
.demo-drawer {
  .button-group {
    padding: 0 16px;
  }
}
</style>
