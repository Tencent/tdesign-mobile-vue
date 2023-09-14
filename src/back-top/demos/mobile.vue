<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">BackTop 回到顶部</h1>
    <p class="summary">当页面过长往下滑动是会出现返回顶部的便捷操作，帮助用户快速回到页面顶部</p>
    <tdesign-demo-block title="01 类型" summary="圆型返回顶部">
      <BaseDemo :visible="visible" :style="style" @close="handleClose" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="半圆型返回顶部">
      <HalfRoundDemo :visible="visible1" :style="style" @close="handleClose1" />
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
import HalfRoundDemo from './half-round.vue';

const visible = ref(false);
const visible1 = ref(false);
const style = ref({});

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
  1,
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
