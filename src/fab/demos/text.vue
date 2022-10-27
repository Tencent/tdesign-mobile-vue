<template>
  <div>
    <t-fab :icon="iconFunc" text="获取手机号" :button-props="baseButtonProps" :style="customStyle" @click="onClick" />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { CallIcon } from 'tdesign-icons-vue-next';

const iconFunc = () => h(CallIcon);
const baseButtonProps = {
  variant: 'outline',
};
const customStyle = 'right: 16px; bottom: 96px;';
const onClick = () => {
  console.log('click Fab');
};
</script>

<style lang="less" scoped></style>
