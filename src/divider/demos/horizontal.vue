<template>
  <div>
    <h3>左右间距</h3>
    <t-divider class="demo-2"></t-divider>

    <h3>右侧拉通</h3>
    <t-divider class="demo-3"></t-divider>

    <h3>自定义左侧间距</h3>
    <t-divider class="demo-4"></t-divider>
  </div>
</template>

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
</style>
