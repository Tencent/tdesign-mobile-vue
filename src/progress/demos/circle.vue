<template>
  <div class="example-progress">
    <div class="example-progress__item">
      <t-progress theme="circle" :percentage="80" />
    </div>
    <div class="example-progress__item">
      <t-progress theme="circle" :percentage="80" status="warning" />
    </div>
    <div class="example-progress__item">
      <t-progress theme="circle" :percentage="80" status="error" />
    </div>
    <div class="example-progress__item">
      <t-progress theme="circle" :percentage="80" status="success" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.example-progress {
  &__item:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
