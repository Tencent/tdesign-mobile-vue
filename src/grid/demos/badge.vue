<template>
  <t-grid class="grid-demo">
    <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ dot: true }" />
    <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ count: 8 }" />
    <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: 13 }" />
    <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: 'NEW' }" />
  </t-grid>
</template>

<script lang="ts" setup>
const imgUrl = 'https://tdesign.gtimg.com/miniprogram/images/example1.png';
</script>
