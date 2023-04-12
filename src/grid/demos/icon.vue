<template>
  <t-grid :column="4" class="grid-demo">
    <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
    <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
    <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
    <t-grid-item text="标题最多六字" :image="imgUrl" description="说明最多六字" />
  </t-grid>
</template>

<script lang="ts" setup>
const imgUrl = 'https://tdesign.gtimg.com/miniprogram/images/example1.png';
</script>
<style scoped lang="less">
.grid-demo {
  margin-bottom: 16px;
}
</style>
