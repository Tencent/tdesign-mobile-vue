<template>
  <div class="sticky-demo">
    <t-sticky :z-index="50">
      <t-button theme="primary" class="custom-common-button">基础吸顶</t-button>
    </t-sticky>
  </div>
</template>

<style lang="less" scoped>
.sticky-demo {
  padding-left: 16px;
}
.custom-common-button {
  color: #fff;
  width: 104px;
  height: 44px;
}
</style>
