<template>
  <t-grid :column="5" class="grid-demo">
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="最多四字" :image="imgUrl" />
  </t-grid>

  <t-grid class="grid-demo">
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="最多五个字" :image="imgUrl" />
  </t-grid>

  <t-grid :column="3" class="grid-demo">
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="标题文字" :image="imgUrl" />
    <t-grid-item text="最多六个文字" :image="imgUrl" />
  </t-grid>
</template>

<script lang="ts" setup>
const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example1.png';
</script>
<style scoped lang="less">
.grid-demo {
  margin-bottom: 16px;
}
</style>
