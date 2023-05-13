<template>
  <t-pull-down-refresh
    v-model="refreshing"
    :loading-bar-height="66"
    :loading-texts="['下拉刷新', '松开刷新', '正在刷新', '刷新完成']"
    @refresh="handleRefresh"
    @scrolltolower="handleScrolltolower"
  >
    <!-- 包裹页面全部内容 -->
    <div class="tdesign-mobile-demo">
      <tdesign-demo-block>
        <h1 class="title">PullDownRefresh 下拉刷新</h1>
        <p class="summary">用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。</p>
        <div class="tdesign-mobile-block">拖拽该区域演示 顶部下拉刷新</div>
        <div class="group">
          <t-skeleton v-for="i in 6" :key="i" :row-col="rowCols" class="item" />
        </div>
      </tdesign-demo-block>
    </div>
  </t-pull-down-refresh>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rowCols = [
  1,
  {
    width: '100px',
  },
  {
    width: '165.5px',
    height: '165.5px',
    borderRadius: '12px',
  },
];

const refreshing = ref(false);
const handleRefresh = (value: any) => {
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
};
const handleScrolltolower = () => {
  console.log('触底');
};
</script>

<style lang="less" scoped>
.tdesign-mobile-block {
  box-sizing: border-box;
  background-color: rgba(243, 243, 243, 1);
  border-radius: 12px;
  height: 171px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.26);
  line-height: 171px;
  text-align: center;
  margin: 16px;
}
.group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 16px 140px 16px;
  .item {
    width: 47%;
    margin-bottom: 16px;
  }
}
</style>
