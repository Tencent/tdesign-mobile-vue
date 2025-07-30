<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">QRCode 二维码</h1>
    <p class="summary">能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置</p>
    <tdesign-demo-block title="01 组件类型" summary="基本用法" :padding="true">
      <BaseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="带 Icon 的二维码" :padding="true">
      <IconDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="无边框的二维码" :padding="true">
      <BorderLessDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="二维码纠错等级">
      <LevelDemo />
    </tdesign-demo-block>

    <!-- <tdesign-demo-block summary="自定义渲染类型">
      <TypeDemo  />
    </tdesign-demo-block> -->

    <tdesign-demo-block title="02 组件状态" summary="active">
      <StatusDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>

    <!-- <tdesign-demo-block summary="自定义状态渲染器">
      <StatusRenderDemo  />
    </tdesign-demo-block> -->

    <tdesign-demo-block title="03 组件样式" summary="二维码颜色">
      <ColorDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>

    <!-- <tdesign-demo-block summary="二维码尺寸">
      <SizeDemo />
    </tdesign-demo-block> -->

    <!-- <tdesign-demo-block summary="下载二维码的简单实现。">
      <DownloadDemo  />
    </tdesign-demo-block> -->
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import BorderLessDemo from './borderless.vue';
import IconDemo from './icon.vue';
import StatusDemo from './status.vue';
// import StatusRenderDemo from './status-render.vue';
// import TypeDemo from './type.vue';
import ColorDemo from './color.vue';
// import SizeDemo from './size.vue';
// import DownloadDemo from './download.vue';
import LevelDemo from './level.vue';
</script>

<style lang="less">
.tdesign-mobile-demo {
  background-color: var(--td-bg-color-container);
}

.qrcode-content {
  padding: 16px 16px 0;
}

.tdesign-demos-qrcode {
  padding: 0 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.button-group {
  background-color: var(--bg-color-demo, #fff);
  box-sizing: border-box;
  padding: 8px 4px;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 25%;

  .t-button {
    height: 32px;
    flex: 1;

    &:not(:last-child) {
      flex: 1;
      margin-right: 8px;
    }
  }
}
</style>
