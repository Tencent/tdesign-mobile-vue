<template>
  <div>
    <div class="demo-drawer">
      <t-drawer v-model="open" :sidebar="baseSidebar"></t-drawer>
      <div class="demo-drawer-content">
        <div class="demo-drawer-text">单层级纯文本标签栏</div>
        <t-button size="large" variant="outline" @click="openDrawer()">带图标抽屉</t-button>
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
        icon:
          'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单二',
        icon:
          'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单三',
        icon:
          'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单四',
        icon:
          'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单五',
        icon:
          'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
      {
        name: '菜单六',
        icon:
          'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
      },
    ]);
    const open = ref(false);
    const openDrawer = () => {
      open.value = true;
    };

    return {
      baseSidebar,
      open,
      openDrawer,
    };
  },
});
</script>
<style lang="less" scoped>

.demo-drawer {
  &-text {
    margin: 24px 0 12px 0;
    color: #999999;
  }
  &-content {
    padding: 0 16px;
  }
}
</style>
