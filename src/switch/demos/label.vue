<template>
  <t-cell title="带文字开关">
    <template #rightIcon>
      <t-switch :default-value="true" :label="['开', '关']" />
    </template>
  </t-cell>
  <div class="box" style="height: 16px" />
  <t-cell title="带图标开关">
    <template #rightIcon>
      <t-switch :default-value="true" :icon="icons" />
    </template>
  </t-cell>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { CloseIcon, CheckIcon } from 'tdesign-icons-vue-next';
import type { SwitchProps } from 'tdesign-mobile-vue';

// icon 运行时接收 VNode，但 TdSwitchProps['icon'] 声明为 TNode[]，此处断言以对齐实际用法
const icons = [h(CheckIcon, { size: '20px' }), h(CloseIcon, { size: '20px' })] as unknown as SwitchProps['icon'];
</script>
