<template>
  <div>
    <div class="demo-drawer">
      <t-drawer v-model:visible="open" placement="left" :items="baseSidebar"></t-drawer>
      <div class="demo-drawer-content">
        <div class="demo-drawer-text">单层级纯文本标签栏</div>
        <t-button size="large" variant="outline" shape="round" @click="openDrawer()">基础抽屉</t-button>
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
