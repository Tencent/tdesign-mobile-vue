<template>
  <t-grid :column="3" class="grid-demo">
    <t-grid-item text="标题文字" :image="imgUrl" description="描述文字" />
    <t-grid-item text="标题文字" :image="imgUrl" description="描述文字" />
    <t-grid-item text="标题最多六字" :image="imgUrl" description="描述最多六字" />
  </t-grid>
  <t-grid :column="2" class="grid-demo">
    <t-grid-item text="标题文字" layout="horizontal" :image="imgUrl" description="描述文字" />
    <t-grid-item text="标题文字" layout="horizontal" :image="imgUrl" description="描述文字" />
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
