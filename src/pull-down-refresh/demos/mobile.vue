<template>
  <div class="tdesign-mobile-demo" :style="{ 'background-color': '#fff', height: '100vh' }">
    <tdesign-demo-block>
      <BaseDemo>
        <h1 class="title">PullDownRefresh 下拉刷新</h1>
        <p class="summary">用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。</p>
        <div className="tdesign-mobile-block">拖拽该区域演示 顶部下拉刷新</div>
        <div className="content">
          <div v-for="i in 1" :key="i" class="row">
            <div v-for="j in 2" :key="j" class="item">
              <t-skeleton theme="text" :row-col="rowCols" />
            </div>
          </div>
        </div>
      </BaseDemo>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';

const rowCols = [
  1,
  {
    width: '80%',
  },
  {
    height: '171px',
    borderRadius: '16px',
  },
];
</script>

<style lang="less" scoped>
.tdesign-mobile-block {
  box-sizing: border-box;
  background-color: rgba(243, 243, 243, 1);
  border-radius: 8px;
  height: 171px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.26);
  line-height: 171px;
  text-align: center;
  margin: 16px;
}
.content {
  box-sizing: border-box;
  margin: 16px;

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
