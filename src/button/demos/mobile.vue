<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Button 按钮</h1>
    <p class="summary">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础按钮">
      <BaseButtonDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="图标按钮">
      <iconDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="幽灵按钮">
      <ghostDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="组合按钮">
      <groupDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="通栏按钮">
      <blockDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件状态" summary="按钮禁用态">
      <statusDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 组件样式" summary="按钮尺寸">
      <sizeDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="按钮形状">
      <shapeDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="按钮主题">
      <themeDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import './style/index.less';
import BaseButtonDemo from './base.vue';
import iconDemo from './icon.vue';
import ghostDemo from './ghost.vue';
import groupDemo from './group.vue';
import blockDemo from './block.vue';
import statusDemo from './status.vue';
import sizeDemo from './size.vue';
import shapeDemo from './shape.vue';
import themeDemo from './theme.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
