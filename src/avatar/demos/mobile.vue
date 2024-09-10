<template>
  <div class="tdesign-mobile-demo">
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
    <tdesign-demo-block summary="徽标头像">
      <badgeAvatar />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 特殊类型" summary="纯展示的头像组">
      <exhibition />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作的头像组">
      <action />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 组件尺寸" summary="组件尺寸">
      <size />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import imageAvatar from './image-avatar.vue';
import characterAvatar from './character-avatar.vue';
import iconAvatar from './icon-avatar.vue';
import exhibition from './exhibition.vue';
import action from './action.vue';
import badgeAvatar from './badge-avatar.vue';
import size from './size.vue';
</script>
<style scoped>
.tdesign-mobile-demo {
  background-color: var(--bg-color-demo, #fff);
}
</style>
