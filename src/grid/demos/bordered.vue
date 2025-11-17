<template>
  <t-grid :column="3" border class="grid-demo">
    <t-grid-item :image="imgUrl" description="描述文字" text="标题文字" />
    <t-grid-item :image="imgUrl" description="描述文字" text="标题文字" />
    <t-grid-item :image="imgUrl" description="描述最多六字" text="标题最多六字" />
  </t-grid>
  <t-grid :column="2" border class="grid-demo">
    <t-grid-item :image="imgUrl" description="描述文字" layout="horizontal" text="标题文字" />
    <t-grid-item :image="imgUrl" description="描述文字" layout="horizontal" text="标题文字" />
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
