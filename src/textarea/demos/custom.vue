<template>
  <div class="textarea-example">
    <text class="textarea-example__label">标签文字</text>
    <t-textarea class="textarea" placeholder="请输入文字" bordered maxlength="100" indicator style="{{style}}" />
  </div>
</template>

<style lang="less" scoped>
.textarea-example {
  padding: 16px 16px 24px;
  background-color: var(--bg-color-demo, #fff);
}
.textarea-example__label {
  display: block;
  color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  font-size: 12px;
  line-height: 20px;
  padding-bottom: 8px;
}
.textarea {
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
