<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Toast 轻提示</h1>
    <p class="summary">一种轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title="01 组件类型" summary="纯文字">
      <textDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多行文本">
      <multilineTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带横向图标">
      <rowIconTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带竖向图标">
      <columnIconTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="加载状态">
      <loadingIconTextDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件状态" summary="成功提示">
      <successIconTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="警告提示">
      <warnIconTextTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="失败提示">
      <errorIconTextDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 显示遮罩" summary="弹窗可显示遮罩，禁止滑动和点击">
      <preventScrollThroughDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 手动关闭" summary="手动关闭轻提示">
      <maskDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="05 透传 Overlay" summary="向 Overlay 遮罩透传属性">
      <overlayDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import textDemo from './text.vue';
import multilineTextDemo from './multilineText.vue';
import rowIconTextDemo from './rowIconText.vue';
import columnIconTextDemo from './columnIconText.vue';
import loadingIconTextDemo from './loadingIconText.vue';
import successIconTextDemo from './successIconText.vue';
import warnIconTextTextDemo from './warnIconText.vue';
import errorIconTextDemo from './errorIconText.vue';
import maskDemo from './mask.vue';
import preventScrollThroughDemo from './preventScrollThrough.vue';
import overlayDemo from './overlay.vue';
</script>
