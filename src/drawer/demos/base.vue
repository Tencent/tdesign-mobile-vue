<template>
  <div>
    <div class="demo-drawer">
      <t-drawer v-model="open" :sidebar="baseSidebar" :show-icon="showIcon"></t-drawer>
      <div class="demo-drawer-content">
        <div class="demo-drawer-text">基础抽屉</div>
        <t-button size="large" @click="openDrawer(false)">基础抽屉（左侧弹出）</t-button>
        <div class="demo-drawer-text">带图标抽屉</div>
        <t-button size="large" @click="openDrawer(true)">带图标抽屉（左侧弹出）</t-button>
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
      path: '//www.qq.com/',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单二',
      path: '//www.qq.com/',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单三',
      path: '//www.qq.com/',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单四',
      path: '//www.qq.com/',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单五',
      path: '//www.qq.com/',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单六',
      path: '//www.qq.com/',
      iconName: 'search',
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
