<template>
  <div class="divider-container">
    <h3>纯文字</h3>
    <t-divider line-color="transparent"> 没有更多了~ </t-divider>

    <h3>垂直分割</h3>
    <div class="demo-6">
      <span>文字信息</span>
      <t-divider layout="vertical"></t-divider>
      <span>文字信息</span>
      <t-divider layout="vertical"></t-divider>
      <span>文字信息</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.divider-container {
  padding-bottom: 16px;

  h3 {
    font-size: 12px;
    font-weight: 400;
    font-family: 'PingFang SC';
    color: #a9a9a9;
    padding: 16px;
  }

  .demo-6 {
    display: flex;
    height: 20px;
    color: #a9a9a9;
    line-height: 20px;
    align-items: center;
    margin: 0 16px;
    font-size: 12px;
    .t-divider {
      height: 12px;
    }
  }
}
</style>
