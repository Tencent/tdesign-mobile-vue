<template>
  <div class="grid-demo">
    <t-grid :column="3">
      <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
      <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
      <t-grid-item text="标题最多六字" :image="imgUrl" description="说明最多六字" />
    </t-grid>
  </div>
  <div class="grid-demo">
    <t-grid :column="2">
      <t-grid-item text="标题文字" layout="horizontal" :image="imgUrl" description="说明文字" />
      <t-grid-item text="标题文字" layout="horizontal" :image="imgUrl" description="说明文字" />
    </t-grid>
  </div>
</template>
<script lang="ts" setup>
const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
</script>
<style scoped lang="less">
.grid-demo {
  margin: 0 16px 8px;

  &.short-width {
    margin: 0 26px 8px;
  }
}
</style>
