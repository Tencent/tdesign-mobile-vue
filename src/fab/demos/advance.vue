<template>
  <t-fab :icon="iconFunc" text="按钮文字" :style="customStyle" @click="onClick" />
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';

const iconFunc = () => h(AddIcon, { size: '24px' });

const customStyle = 'right: 16px; bottom: 32px;';
const onClick = () => {
  console.log('click Fab');
};
</script>
