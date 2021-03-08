<template>
  <div>
    <div class="demo-drawer">
      <t-drawer v-model="open" :sidebar="baseSidebar" :show-icon="showIcon"></t-drawer>
      <div class="demo-drawer-content">
        <div class="demo-drawer-text">单层级纯文本标签栏</div>
        <t-button size="large" variant="outline" @click="openDrawer(true)">带图标抽屉</t-button>
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
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单二',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单三',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单四',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单五',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
    }, {
      name: '菜单六',
      iconImg: '//img.yangshipin.cn/assets/图标占位-kiydhrokdxjg.png',
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
