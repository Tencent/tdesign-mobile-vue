<template>
  <div>
    <div class="demo-drawer">
      <t-drawer v-model="open" :sidebar="baseSidebar" :show-icon="showIcon"></t-drawer>
      <div class="demo-drawer-content">
        <div class="demo-drawer-text">单层级纯文本标签栏</div>
        <t-button size="large" variant="outline" @click="openDrawer(false)">基础抽屉</t-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const baseSidebar = ref([{
      name: '菜单一',
    }, {
      name: '菜单二',
    }, {
      name: '菜单三',
    }, {
      name: '菜单四',
    }, {
      name: '菜单五',
    }, {
      name: '菜单六',
    }]);
    const open = ref(false);
    const showIcon = ref(false);
    const openDrawer = (isShowIcon: boolean) => {
      open.value = true;
      showIcon.value = isShowIcon;
    };

    return {
      baseSidebar,
      open,
      openDrawer,
      showIcon,
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
