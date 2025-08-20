<template>
  <div class="example-progress">
    <div class="example-progress__item">
      <t-progress :percentage="78" />
    </div>
    <div class="example-progress__item">
      <t-progress :percentage="80" status="warning" />
    </div>
    <div class="example-progress__item">
      <t-progress :percentage="80" status="error" />
    </div>
    <div class="example-progress__item">
      <t-progress :percentage="80" status="success" />
    </div>
    <div class="example-progress__item">
      <t-progress :percentage="78" :color="['#0052D9', '#2BA471']" status="active" />
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
