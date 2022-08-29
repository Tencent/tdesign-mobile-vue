<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Switch 开关</h1>
    <p class="summary">开关用于切换当个设置项的状态，开启、关闭为两个互斥的操作</p>
    <tdesign-demo-block title="01 类型" summary="基础开关">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带描述信息开关">
      <descDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="开关状态">
      <disabledVue />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import baseDemo from './base.vue';
import descDemo from './desc.vue';
import disabledVue from './disabled.vue';
</script>
