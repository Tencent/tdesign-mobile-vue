<template>
  <div ref="container" class="tdesign-mobile-demo">
    <h1 class="title">BackTop 回到顶部</h1>
    <p class="summary">当页面过长往下滑动是会出现返回顶部的便捷操作，帮助用户快速回到页面顶部</p>
    <tdesign-demo-block title="形状" summary="">
      <BaseDemo :visible="visible" :style="style" :container="() => container?.parentElement" @close="handleClose" />
    </tdesign-demo-block>
    <tdesign-demo-block>
      <div class="group">
        <t-skeleton v-for="i in 6" :key="i" :row-col="rowCols" class="item" />
      </div>
    </tdesign-demo-block>

    <div class="blank"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './base.vue';

const visible = ref(false);
const visible1 = ref(false);
const style = ref({});
const container = ref<HTMLElement>();

const handleClose = () => {
  visible.value = true;
  visible1.value = false;
};

const handleClose1 = () => {
  visible.value = false;
  visible1.value = true;
};
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

window.document.addEventListener('scroll', function (e: Event) {
  const { scrollTop = 0 } = (e.currentTarget as Document)?.scrollingElement || {};
  if (scrollTop <= 300) {
    style.value = { display: 'none' };
  } else {
    style.value = { display: 'block' };
  }
});
</script>

<style lang="less" scoped>
.button-group {
  padding: 8px 16px 16px;
  .t-button {
    margin-bottom: 10px;
    background-color: #fff;
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
