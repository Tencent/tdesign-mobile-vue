<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Guide 引导</h1>
    <p class="summary">逐步骤进行指引或解释说明的组件，常用于用户不熟悉的或需进行特别强调的页面。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础引导">
      <base-vue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="不带遮罩的引导">
      <no-mask />
    </tdesign-demo-block>
    <tdesign-demo-block summary="弹窗形式的引导">
      <dialog-vue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="气泡与弹窗混合的引导">
      <popover-dialog />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义气泡">
      <custom-popover />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseVue from './base.vue';
import NoMask from './no-mask.vue';
import DialogVue from './dialog.vue';
import PopoverDialog from './popover-dialog.vue';
import CustomPopover from './custom-popover.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
