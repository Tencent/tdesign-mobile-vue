<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Footer 页脚</h1>
    <tdesign-demo-block summary="基础页脚">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="基础加链接页脚">
      <linkDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="品牌页脚">
      <logoDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import baseDemo from './base.vue';
import linkDemo from './link.vue';
import logoDemo from './logo.vue';
</script>

<style lang="less" scoped></style>
