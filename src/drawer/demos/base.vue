<template>
  <div>
    <div class="demo-drawer">
      <t-drawer v-model="openBase" :sidebar="baseSidebar"></t-drawer>
      <t-drawer v-model="openIcon" :sidebar="iconSidebar"></t-drawer>
      <div class="demo-drawer-content">
        <div class="demo-drawer-text">单层级纯文本标签栏</div>
        <t-button size="large" variant="outline" shape="round" @click="openDrawer(false)">基础抽屉</t-button>
        <div class="demo-drawer-text">单层级纯文本标签栏</div>
        <t-button size="large" variant="outline" shape="round" @click="openDrawer(true)">带图标抽屉</t-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';

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
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单二',
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单三',
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单四',
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单五',
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单六',
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
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
