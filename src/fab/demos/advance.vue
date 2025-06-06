<template>
  <t-fab :icon="iconFunc" text="按钮文字" @click="onClick" />
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';

const iconFunc = () => h(AddIcon, { size: '24px' });

const onClick = () => {
  console.log('click Fab');
};
</script>
