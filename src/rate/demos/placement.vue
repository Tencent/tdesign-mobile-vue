<template>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">顶部</div>
    <t-rate />
  </div>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">底部</div>
    <t-rate placement="bottom" />
  </div>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">不显示</div>
    <t-rate placement="" />
  </div>
</template>

<style lang="less" scoped>
.rate-demo-cell {
  background-color: var(--bg-color-demo, #fff);
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  &--space {
    margin-bottom: 16px;
  }
}
</style>
