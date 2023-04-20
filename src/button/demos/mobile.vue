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

    <tdesign-demo-block title="02 状态" summary="按钮禁用态">
      <StatusButtonDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="按钮尺寸">
      <div className="button-demo">
        <SizeButtonDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import './style/index.less';
import BaseButtonDemo from './base.vue';
import StatusButtonDemo from './status.vue';
import SizeButtonDemo from './size.vue';
import iconDemo from './icon.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
