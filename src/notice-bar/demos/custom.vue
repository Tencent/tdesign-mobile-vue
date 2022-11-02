<template>
  <div class="noticebar-demo">
    <t-notice-bar class="cover-class" visible content="提示文字描述提示文字描述提示文字描述">
      <template #prefixIcon>
        <sound-icon />
      </template>
    </t-notice-bar>
  </div>
</template>

<script lang="ts" setup>
import { SoundIcon } from 'tdesign-icons-vue-next';
</script>
<style lang="less">
// 覆盖组件内部样式
.cover-class {
  .t-icon {
    color: #ffffff !important;
  }
  .t-notice-bar__text {
    color: #ffffff !important;
  }
  background-color: #a6a6a6;
}
</style>
