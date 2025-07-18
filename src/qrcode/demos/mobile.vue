<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">QRCode 二维码</h1>
    <p class="summary">用于将文本转换成二维码。</p>
    <tdesign-demo-block title="01 基本用法">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 带 Icon 的二维码">
      <IconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block
      title="03 不同的状态"
      summary="通过 status 的值控制二维码的状态，提供了 active、expired、loading、scanned 四个值"
    >
      <StatusDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 自定义状态渲染器" summary="通过 statusRender 的值控制二维码不同状态的渲染逻辑。">
      <StatusRenderDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>
    <tdesign-demo-block title="05 自定义渲染类型" summary="通过设置 type 自定义渲染结果，提供 canvas 和 svg 两个选项。">
      <TypeDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>
    <tdesign-demo-block
      title="06 自定义颜色"
      summary="通过设置 color 自定义二维码颜色，通过设置 bgColor 自定义背景颜色。"
    >
      <ColorDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>
    <tdesign-demo-block title="07 自定义尺寸">
      <SizeDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>
    <tdesign-demo-block title="08 下载二维码" summary="下载二维码的简单实现。">
      <DownloadDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>
    <tdesign-demo-block title="09 纠错比例">
      <LevelDemo class="tdesign-demos-qrcode" />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import IconDemo from './icon.vue';
import StatusDemo from './status.vue';
import StatusRenderDemo from './status-render.vue';
import TypeDemo from './type.vue';
import ColorDemo from './color.vue';
import SizeDemo from './size.vue';
import DownloadDemo from './download.vue';
import LevelDemo from './level.vue';
</script>

<style lang="less">
.tdesign-demos-qrcode {
  padding: 16px;
  background-color: var(--td-bg-color-container);
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
