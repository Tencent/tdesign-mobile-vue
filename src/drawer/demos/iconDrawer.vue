<template>
  <div>
    <div class="demo-drawer">
      <t-drawer v-model="open" :sidebar="baseSidebar" shape="round"></t-drawer>
      <div class="demo-drawer-content">
        <div class="demo-drawer-text">单层级纯文本标签栏</div>
        <t-button size="large" variant="outline" shape="round" @click="openDrawer()">带图标抽屉</t-button>
      </div>
    </div>
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
