<template>
  <t-row>
    <t-col span="8" class="dark">col-8</t-col>
    <t-col span="8" class="light">col-8</t-col>
    <t-col span="8" class="dark">col-8</t-col>
  </t-row>

  <t-row>
    <t-col span="4" class="dark">col-4</t-col>
    <t-col span="16" offset="4" class="light">col-16 col-offset-4</t-col>
  </t-row>

  <t-row>
    <t-col offset="12" span="12" class="dark">col-12 col-offset-12</t-col>
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
