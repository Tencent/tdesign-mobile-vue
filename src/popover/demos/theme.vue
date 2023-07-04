<template>
  <div class="popover-example">
    <div class="popover-example__content">
      <t-popover placement="top" theme="dark" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 深色 </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover placement="top" theme="light" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 浅色 </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover placement="top" theme="brand" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 品牌色 </t-button>
        </template>
      </t-popover>
    </div>
  </div>
  <div class="popover-example">
    <div class="popover-example__content">
      <t-popover placement="top" theme="success" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 成功色 </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover placement="top" theme="warning" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 警告色 </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover placement="top" theme="error" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 错误色 </t-button>
        </template>
      </t-popover>
    </div>
  </div>
</template>

<style lang="less" scoped>
.popover-example {
  display: flex;
  padding: 0 16px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &__content {
    flex: 1;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }
}

.button-width--small {
  width: 102px;
}

.mb-24 {
  margin-bottom: 24px;
}

.mb-16 {
  margin-bottom: 16px;
}
</style>
