<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Drawer 抽屉</h1>
    <p class="summary">用作一组平行关系页面/内容的切换器，相较于Tab，同屏可展示更多的选项数量。</p>
    <tdesign-demo-block title="01 类型" summary="基础抽屉">
      <t-drawer v-model:visible="openBase" placement="left" :items="baseSidebar" @item-click="itemClick"></t-drawer>
      <t-button size="large" variant="outline" shape="round" @click="openDrawer(false)">基础抽屉</t-button>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标抽屉">
      <t-drawer
        v-model:visible="openIcon"
        placement="left"
        :items="iconSidebar"
        @item-click="itemClick"
        @overlay-click="onOverlayClick"
        @close="onClose"
      ></t-drawer>
      <t-button size="large" variant="outline" shape="round" @click="openDrawer(true)">带图标抽屉</t-button>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { DrawerCloseContext, DrawerItem } from '../type';

export default defineComponent({
  setup() {
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
    const openBase = ref(false);
    const openIcon = ref(false);
    const openDrawer = (type: boolean) => {
      if (type) {
        openIcon.value = true;
      } else {
        openBase.value = true;
      }
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

    return {
      openBase,
      openIcon,
      baseSidebar,
      iconSidebar,
      openDrawer,
      itemClick,
      onClose,
      onOverlayClick,
    };
  },
});
</script>
<style lang="less" scoped>
.demo-drawer {
  &-text {
    font-size: 14px;
    margin: 24px 0 12px 0;
    color: #999999;
  }
  &-content {
    padding: 0 16px;
  }
}
</style>
