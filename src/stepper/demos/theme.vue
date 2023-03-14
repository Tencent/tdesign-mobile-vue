<template>
  <div class="stepper-example">
    <t-stepper default-value="3" theme="filled" />
    <t-stepper default-value="3" theme="outline" />
    <t-stepper default-value="3" />
  </div>
</template>

<style lang="less">
.stepper-example {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  background-color: #fff;
}
</style>
