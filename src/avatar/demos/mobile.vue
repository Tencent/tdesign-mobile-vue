<template>
  <div class="tdesign-mobile-demo" style="background-color: #fff">
    <h1 class="title">Avatar 头像</h1>
    <p class="summary">用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。</p>
    <tdesign-demo-block title="01 组件类型" summary="图片头像">
      <imageAvatar />
    </tdesign-demo-block>
    <tdesign-demo-block summary="字符头像">
      <characterAvatar />
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标头像">
      <iconAvatar />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="纯展示">
      <exhibitionDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作">
      <actionDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="徽标头像">
      <badgeAvatar />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件尺寸" summary=" large/medium/small 尺寸">
      <sizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import imageAvatar from './image-avatar.vue';
import characterAvatar from './character-avatar.vue';
import iconAvatar from './icon-avatar.vue';
import badgeAvatar from './badge-avatar.vue';
import sizeDemo from './size.vue';
import exhibitionDemo from './exhibition.vue';
import actionDemo from './action.vue';
</script>
