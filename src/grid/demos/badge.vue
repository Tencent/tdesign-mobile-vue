<template>
  <div class="grid-demo">
    <t-grid>
      <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ dot: true }" />
      <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ count: 3 }" />
      <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: 'NEW' }" />
      <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: '···' }" />
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
