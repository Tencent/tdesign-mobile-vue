<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Drawer 抽屉</h1>
    <p class="summary">用作一组平行关系页面/内容的切换器，相较于Tab，同屏可展示更多的选项数量。</p>
    <tdesign-demo-block title="01 类型" summary="基础抽屉">
      <t-drawer v-model="openBase" :sidebar="baseSidebar"></t-drawer>
      <t-button size="large" variant="outline" shape="round" @click="openDrawer(false)">基础抽屉</t-button>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标抽屉">
      <t-drawer v-model="openIcon" :sidebar="iconSidebar"></t-drawer>
      <t-button size="large" variant="outline" shape="round" @click="openDrawer(true)">带图标抽屉</t-button>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  setup() {
    const baseSidebar = ref([
      {
        name: '菜单一',
      },
      {
        name: '菜单二',
      },
      {
        name: '菜单三',
      },
      {
        name: '菜单四',
      },
      {
        name: '菜单五',
      },
      {
        name: '菜单六',
      },
    ]);
    const iconSidebar = ref([
      {
        name: '菜单一',
        icon: () => h(AppIcon),
      },
      {
        name: '菜单二',
        icon: () => h(AppIcon),
      },
      {
        name: '菜单三',
        icon: () => h(AppIcon),
      },
      {
        name: '菜单四',
        icon: () => h(AppIcon),
      },
      {
        name: '菜单五',
        icon: () => h(AppIcon),
      },
      {
        name: '菜单六',
        icon: () => h(AppIcon),
      },
    ]);
    const openBase = ref(false);
    const openIcon = ref(false);
    const showIcon = ref(false);
    const openDrawer = (type: boolean) => {
      if (type) {
        openIcon.value = true;
      } else {
        openBase.value = true;
      }
    };

    return {
      openBase,
      openIcon,
      baseSidebar,
      iconSidebar,
      openDrawer,
      showIcon,
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
