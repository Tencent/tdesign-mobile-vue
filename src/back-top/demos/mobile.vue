<template>
  <div class="tdesign-mobile-demo" :style="{ 'background-color': '#fff' }">
    <h1 class="title">BackTop 回到顶部</h1>
    <p class="summary">当页面过长往下滑动是会出现返回顶部的便捷操作，帮助用户快速回到页面顶部</p>
    <tdesign-demo-block title="01 类型" summary="圆型返回顶部">
      <BaseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block>
      <div className="content">
        <div v-for="i in 4" :key="i" class="row">
          <div v-for="j in 2" :key="j" class="item">
            <t-skeleton theme="text" :row-col="rowCols" />
          </div>
        </div>
      </div>
    </tdesign-demo-block>

    <div class="blank"></div>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';

const rowCols = [
  {
    height: '171px',
    borderRadius: '16px',
  },
  1,
  {
    width: '80%',
  },
  [
    {
      width: '60%',
    },
    {
      width: '20%',
    },
  ],
];
</script>

<style lang="less" scoped>
.button-group {
  padding: 8px 16px 16px;
  .t-button {
    margin-bottom: 10px;
    background-color: #fff;
  }
}
.content {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    .item {
      width: 47%;
      margin-bottom: 16px;
    }
  }
}
</style>
