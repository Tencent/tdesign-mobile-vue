<template>
  <div class="sticky-demo">
    <t-sticky :offset-top="50">
      <t-button theme="danger" class="custom-common-button">吸顶距离</t-button>
    </t-sticky>
  </div>
</template>

<style lang="less" scoped>
.sticky-demo {
  padding-left: 120px;
}
.custom-common-button {
  color: #fff;
  width: 104px;
  height: 44px;
}
</style>
