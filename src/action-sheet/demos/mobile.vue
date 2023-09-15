<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ActionSheet 动作面板</h1>
    <p class="summary">从底部弹出的模态框，提供和当前场景相关的操作动作，也支持提供信息输入和描述。</p>
    <tdesign-demo-block title="01 类型" summary="列表型">
      <ListDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="宫格型动作面板">
      <GridDemo />
      <GridMultipleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="列表型选项状态">
      <StatusVue />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件样式" summary="列表型对齐方式">
      <AlignVue />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import ListDemo from './list.vue';
import GridDemo from './grid.vue';
import GridMultipleDemo from './grid-multiple.vue';
import AlignVue from './align.vue';
import StatusVue from './status.vue';
</script>

<style lang="less">
.tdesign-mobile-demo {
  background-color: var(--bg-color-demo, #fff);
}

.action-sheet-grid-demo {
  > div {
    margin-top: 8px;
  }
}
</style>
