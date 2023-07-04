<template>
  <div class="textarea-example">
    <t-textarea
      class="textarea"
      label="标签文字"
      placeholder="请输入文字"
      maxlength="500"
      indicator
      layout="vertical"
    />
  </div>

  <div class="textarea-example card">
    <div class="textarea-example__summary">卡片样式</div>
    <t-textarea class="textarea" label="标签文字" placeholder="请输入文字" maxlength="500" indicator />
  </div>
</template>

<style lang="less" scoped>
.textarea-example {
  margin-bottom: 24px;
  overflow: hidden;

  &__summary {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 16px;
    line-height: 22px;
  }
}

.card {
  border-radius: 9px;
  margin: 0 16px 24px;
}
.textarea {
  height: 156px;
}
</style>
