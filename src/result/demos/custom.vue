<template>
  <t-result>
    <template #image>
      <t-image src="https://tdesign.gtimg.com/mobile/demos/avatar_1.png" class="external-class-image" fit="cover" />
    </template>
    <template #title>
      <div>自定义结果</div>
    </template>
    <template #description>
      <div>描述文字</div>
    </template>
  </t-result>
</template>

<style>
.external-class-image {
  width: 100px;
  height: 80px;
}
</style>
