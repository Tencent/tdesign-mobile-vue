<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DropdownMenu 下拉菜单</h1>
    <p class="summary">向下弹出的菜单列表</p>
    <tdesign-demo-block title="01 类型" summary="单选下拉菜单">
      <!-- <t-dropdown-menu>
        <t-dropdown-item :value="valueS1" label="菜单名称" :options="optionsN" @change="onChange" />
        <t-dropdown-item v-model="valueS2" label="菜单名称" :options="optionsC" />
      </t-dropdown-menu> -->
      <singleVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多选下拉菜单">
      <multipleVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="树形下拉菜单">
      <treeVue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="下拉菜单状态">
      <t-dropdown-menu>
        <t-dropdown-item disabled label="禁用菜单" :options="[]" />
        <t-dropdown-item disabled label="禁用菜单" :options="[]" />
      </t-dropdown-menu>
    </tdesign-demo-block>
    <div style="height: 300px" />
  </div>
</template>

<script lang="ts" setup>
import singleVue from './single.vue';
import multipleVue from './multiple.vue';
import treeVue from './tree.vue';
</script>
