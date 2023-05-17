<template>
  <t-drawer
    v-model:visible="visible"
    :items="iconSidebar"
    @item-click="itemClick"
    @overlay-click="onOverlayClick"
    @close="onClose"
  />
  <t-button block variant="outline" size="large" theme="primary" @click="visible = true">带图标抽屉</t-button>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { TriggerSource, DrawerItem } from '../type';

interface DrawerCloseContext {
  trigger: TriggerSource;
}

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

const visible = ref(false);

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
