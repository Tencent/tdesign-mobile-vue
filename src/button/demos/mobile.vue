<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Button 按钮</h1>
    <p class="summary">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</p>
    <tdesign-demo-block title="01 类型" summary="基础按钮">
      <div class="button-demo">
        <BaseButtonDemo />
      </div>
      <OtherButtonDemo />
      <div class="button-demo align-center margin-right">
        <IconButtonDemo />
      </div>
      <div class="flex align-center margin-right button-demo-loading">
        <LoadingButtonDemo />
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="按钮禁用态">
      <div class="button-demo">
        <BaseButtonDemo :disabled="disabled" />
      </div>
      <OtherButtonDemo :disabled="disabled" />
      <div class="button-demo align-center margin-right">
        <IconButtonDemo :disabled="disabled" />
      </div>
      <div class="flex align-center margin-right button-demo-loading">
        <LoadingButtonDemo :disabled="disabled" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="按钮尺寸">
      <div className="button-demo">
        <SizeButtonDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import './style/index.less';
import BaseButtonDemo from './base.vue';
import IconButtonDemo from './icon.vue';
import LoadingButtonDemo from './loading.vue';
import SizeButtonDemo from './size.vue';
import OtherButtonDemo from './other.vue';

const disabled = ref(true);
</script>
