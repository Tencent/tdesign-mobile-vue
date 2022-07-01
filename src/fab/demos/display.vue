<template>
  <div>
    <t-fab :icon="iconFunc" @click="onClick" />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';

const iconFunc = () => h(AddIcon);
const onClick = () => {
  console.log('click Fab');
};
</script>

<style lang="less" scoped></style>
