<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DropdownMenu 下拉菜单</h1>
    <p class="summary">菜单呈现数个并列的选项类目，用于整个页面的内容筛选，由菜单面板和菜单选项组成。</p>
    <tdesign-demo-block title="01 组件类型" summary="单选下拉菜单">
      <singleVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="分栏下拉菜单">
      <multipleVue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="禁用状态">
      <t-dropdown-menu>
        <t-dropdown-item disabled label="禁用菜单" />
        <t-dropdown-item disabled label="禁用菜单" />
      </t-dropdown-menu>
    </tdesign-demo-block>
    <div style="height: 40px" />
  </div>
</template>

<script lang="ts" setup>
import singleVue from './single.vue';
import multipleVue from './multi.vue';
</script>
