<template>
  <div id="container" class="sticky-demo">
    <t-sticky container="#container" @scroll="onScroll">
      <t-button class="custom-common-button green-button">指定容器</t-button>
    </t-sticky>
  </div>
</template>
<script setup lang="ts">
const onScroll = (context: { scrollTop: number; isFixed: boolean }) => {
  console.log(context);
};
</script>

<style lang="less" scoped>
.sticky-demo {
  background: white;
  height: 200px;
  padding-left: 250px;
}
.custom-common-button {
  color: #fff;
  width: 104px;
  height: 44px;
}
.green-button {
  background-color: rgba(0, 168, 112, 1) !important;
  color: #fff !important;
}
</style>
