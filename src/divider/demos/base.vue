<template>
  <div>
    <div class="divider-demo__title">水平分割线</div>
    <t-divider />

    <div class="divider-demo__title">带文字水平分割线</div>
    <t-divider content="文字信息" align="left" />
    <t-divider content="文字信息" />
    <t-divider content="文字信息" align="right" />

    <div class="divider-demo__title" style="margin-bottom: 10px">垂直分割线</div>
    <view class="divider-wrapper">
      <span>文字信息</span>
      <t-divider layout="vertical" />
      <span>文字信息</span>
      <t-divider layout="vertical" />
      <span>文字信息</span>
    </view>
  </div>
</template>

<style lang="less" scoped>
.divider-demo__title {
  font-size: 14px;
  color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
  padding: 8px 16px;
  line-height: 20px;
}
.divider-wrapper {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  padding-left: 16px;
}
</style>
