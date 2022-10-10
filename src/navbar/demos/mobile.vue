<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">NavBar 导航栏</h1>
    <p class="summary">用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。</p>
    <tdesign-demo-block title="01 类型" summary="基础导航栏">
      <t-navbar title="标题" left-icon :fixed="false" @left-click="handleClick"> </t-navbar>
    </tdesign-demo-block>

    <tdesign-demo-block summary="左侧双操作导航栏">
      <t-navbar title="标题" :fixed="false">
        <template #left-icon>
          <t-icon size="24px" name="chevron-left" class="btn-left" />
          <t-icon size="24px" name="close" />
        </template>
        <template #right-icon>
          <t-icon size="24px" name="ellipsis" />
        </template>
      </t-navbar>
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧双操作导航栏">
      <t-navbar title="标题" left-icon :fixed="false">
        <template #right-icon>
          <t-icon size="24px" name="notification" class="btn-left" />
          <t-icon size="24px" name="ellipsis" />
        </template>
      </t-navbar>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import Toast from '../../toast/index';

export default defineComponent({
  components: { TIcon },
  setup() {
    return {};
  },
  methods: {
    onClickMore() {
      Toast('Click More');
      console.log('on click more');
    },
    onClickLeft() {
      Toast('Click close');
      console.log('on click left');
    },
    handleClick() {
      console.log('yes');
    },
    handleHomeClick() {
      console.log('home');
    },
  },
});
</script>

<style lang="less" scoped>
.divide-line {
  width: 100%;
  height: 24px;
  background: #f9f9f9;
}

.btn-left {
  margin-right: 8px;
}
</style>
