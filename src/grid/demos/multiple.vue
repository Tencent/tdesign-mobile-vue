<template>
  <t-grid :column="4" class="grid-demo">
    <t-grid-item :image="imgUrl" text="标题文字" />
    <t-grid-item :image="imgUrl" text="标题文字" />
    <t-grid-item :image="imgUrl" text="标题文字" />
    <t-grid-item :image="imgUrl" text="最多五个字" />
    <t-grid-item :image="imgUrl" text="标题文字" />
    <t-grid-item :image="imgUrl" text="标题文字" />
    <t-grid-item :image="imgUrl" text="标题文字" />
    <t-grid-item :image="imgUrl" text="最多五个字" />
  </t-grid>
</template>
<script lang="ts" setup>
const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example1.png';
</script>
<style lang="less" scoped>
.grid-demo {
  margin-bottom: 16px;
}
</style>
