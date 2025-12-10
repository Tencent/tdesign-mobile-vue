<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Footer 页脚</h1>
    <p class="summary">用于展示网站的版权声明、联系信息、重要页面链接和其他相关内容等信息。</p>
    <tdesign-demo-block summary="基础页脚">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="基础加链接页脚">
      <linksDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="品牌页脚">
      <logoDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import linksDemo from './links.vue';
import logoDemo from './logo.vue';
</script>
