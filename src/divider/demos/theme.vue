<template>
  <div>
    <div class="divider-demo__title">虚线样式</div>
    <t-divider dashed />
    <t-divider dashed content="文字信息" align="left" />
    <t-divider dashed content="文字信息" />
    <t-divider dashed content="文字信息" align="right" />
  </div>
</template>
<style lang="less" scoped>
.divider-demo__title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  line-height: 20px;
}
</style>
