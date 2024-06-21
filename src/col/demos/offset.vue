<template>
  <t-row gutter="16">
    <t-col span="8">
      <div class="dark">col-8</div>
    </t-col>
    <t-col span="8">
      <div class="dark">col-8</div>
    </t-col>
    <t-col span="8">
      <div class="dark">col-8</div>
    </t-col>
  </t-row>
</template>
<style scoped lang="less">
.dark {
  background-color: #0052d9;
}

.light {
  background-color: #366ef4;
}

.dark,
.light {
  color: #fff;
  font-size: 14px;
  line-height: 48px;
  margin-bottom: 16px;
  text-align: center;
}
</style>
