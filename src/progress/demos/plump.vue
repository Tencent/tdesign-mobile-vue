<template>
  <div class="example-progress">
    <div class="example-progress__item">
      <t-progress theme="plump" :percentage="80" />
    </div>
    <div class="example-progress__item">
      <t-progress theme="plump" :percentage="88" status="warning" />
    </div>
    <div class="example-progress__item">
      <t-progress theme="plump" :percentage="88" status="error" />
    </div>
    <div class="example-progress__item">
      <t-progress theme="plump" :percentage="88" status="success" />
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
