<template>
  <div class="example-progress">
    <div class="example-progress__item">
      <t-progress :percentage="80" />
    </div>
    <div className="summary">百分比内显</div>
    <div class="example-progress__item">
      <t-progress theme="plump" :percentage="80" />
    </div>
    <div className="summary">环形进度条</div>
    <div class="example-progress__item">
      <t-progress theme="circle" :percentage="30" />
    </div>
    <div className="summary">微型环形进度条</div>
    <div className="example-progress__item">
      <t-progress theme="circle" size="micro" :percentage="30" :label="false" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.example-progress {
  &__item {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .summary {
    margin-bottom: 16px;
  }
}
</style>
