<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Divider 分割符</h1>
    <p class="summary">
      分割线是一个呈线状的轻量化组件，起到分割、组织、细化的作用，用于有逻辑的组织元素内容和页面结构。
    </p>
    <tdesign-demo-block title="01 类型" summary="分割符主要是由直线和文字组成">
      <div style="background: #fff; margin-top: 16px">
        <h3>直线拉通</h3>
        <t-divider></t-divider>

        <h3>虚线拉通</h3>
        <t-divider dashed></t-divider>

        <h3>左右间距</h3>
        <t-divider class="demo-2"></t-divider>

        <h3>右侧拉通</h3>
        <t-divider class="demo-3"></t-divider>

        <h3>自定义左侧间距</h3>
        <t-divider class="demo-4"></t-divider>

        <h3>文字+直线</h3>
        <t-divider class="demo-5"> 文字信息 </t-divider>

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
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
h3 {
  font-size: 12px;
  font-weight: 400;
  font-family: 'PingFang SC';
  color: #a9a9a9;
  padding: 16px;
}

.demo-2 {
  margin: 0 16px;
}

.demo-3 {
  margin-left: 16px;
}

.demo-4 {
  margin-left: 76px;
}

.demo-5 {
  margin: 0 16px;
}

.demo-6 {
  display: flex;
  height: 20px;
  line-height: 20px;
  align-items: center;
  margin: 0 16px;
  font-size: 12px;
  .t-divider {
    height: 12px;
  }
}
</style>
