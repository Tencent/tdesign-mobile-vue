<template>
  <t-button size="large" block variant="outline" theme="primary" @click="visible = true">基础用法</t-button>
  <t-overlay
    :visible="visible"
    @click="visible = false"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const onOpen = () => {
  console.log('--遮罩执行弹出动画效果前触发--');
};
const onOpened = () => {
  console.log('--遮罩弹出动画效果结束后触发--');
};
const onClose = () => {
  console.log('--遮罩执行消失动画效果前触发--');
};
const onClosed = () => {
  console.log('--遮罩消失动画效果结束后触发--');
};
</script>
