<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">SideBar 侧边栏</h1>
    <p class="summary">用于内容分类后的展示切换。</p>
    <tdesign-demo-block title="01 组件类型" summary="侧边导航用法" :padding="true">
      <t-button size="large" theme="primary" variant="outline" block @click="handleClick('base')"> 锚点用法 </t-button>
      <t-button size="large" theme="primary" variant="outline" block @click="handleClick('switch')">
        切页用法
      </t-button>
    </tdesign-demo-block>

    <tdesign-demo-block summary="带图标侧边导航" :padding="true">
      <t-button size="large" theme="primary" variant="outline" block @click="handleClick('with-icon')">
        带图标侧边导航
      </t-button>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件样式" summary="侧边导航样式" :padding="true">
      <t-button size="large" theme="primary" variant="outline" block @click="handleClick('custom')">
        自定义样式
      </t-button>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = (t = 'base') => {
  router.push(`/side-bar/${t}`);
};
</script>

<style>
.t-button {
  margin-bottom: 16px;
}
</style>
