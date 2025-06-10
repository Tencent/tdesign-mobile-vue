<template>
  <div class="button-group">
    <t-button
      v-bind="{
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        content: '圆形返回顶部',
      }"
      @click="onClick('round', '顶部')"
    />
    <t-button
      v-bind="{
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        content: '半圆形返回顶部',
      }"
      @click="onClick('half-round', '返回顶部')"
    />
  </div>
  <div class="group">
    <t-skeleton v-for="i in 6" :key="i" :row-col="rowCols" class="item" />
  </div>

  <t-back-top :theme="theme" :text="text" :on-to-top="handleToTop" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const theme = ref('round');
const text = ref('顶部');

const rowCols = [
  {
    width: '165.5px',
    height: '165.5px',
    borderRadius: '12px',
  },
  {
    width: '100px',
  },
];
const onClick = (tem: string, txt: string) => {
  text.value = txt;
  theme.value = tem;
};
function handleToTop() {
  console.log('handleToTop');
}
</script>

<style lang="less" scoped>
.button-group {
  padding: 8px 16px 16px;

  .t-button {
    margin-bottom: 10px;
  }
}
.group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 16px 30px 16px;
  .item {
    width: 47%;
    margin-bottom: 16px;
  }
}
</style>
