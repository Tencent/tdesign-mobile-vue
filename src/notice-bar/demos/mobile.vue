<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">NoticeBar 公告栏</h1>
    <p class="summary">在导航栏下方，用于给用户显示提示消息。</p>
    <tdesign-demo-block title="01 组件类型" summary="纯文字的公告栏">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标的公告栏">
      <iconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带关闭的公告栏">
      <suffixIcon />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带入口的公告栏">
      <event />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定样式的公告栏">
      <customDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义内容的公告栏">
      <customizationDemo />
    </tdesign-demo-block>
    <tdesign-demo-block
      title="02 组件状态"
      summary="公告栏类型有普通（info）、警示（warning）、成功（success）、错误（error）"
    >
      <themeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 可 滚动的公告栏" summary="可滚动公告栏有水平 (horizontal) 和垂直 (vertical)">
      <scrollDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import iconDemo from './icon.vue';
import suffixIcon from './suffixIcon.vue';
import event from './event.vue';
import customDemo from './custom.vue';
import customizationDemo from './customization.vue';
import themeDemo from './theme.vue';
import scrollDemo from './scrolling.vue';
</script>

<style>
.tdesign-mobile-demo {
  background-color: #fff;
}

.notice-bar-demo-block {
  margin-bottom: 16px;
}
</style>
