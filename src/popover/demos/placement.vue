<template>
  <div class="popover-example">
    <div class="popover-example__summary mb-16">顶部弹出气泡</div>
    <div class="popover-example__content row mb-24">
      <div class="popover-example__content__item">
        <t-popover placement="top-left" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 顶部左 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="top" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 顶部中 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="top-right" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 顶部右 </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>

  <div class="popover-example">
    <div class="popover-example__summary mb-16">底部弹出气泡</div>
    <div class="popover-example__content row mb-24">
      <div class="popover-example__content__item">
        <t-popover placement="bottom-left" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 底部左 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="bottom" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 底部中 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="bottom-right" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button class="button-width--small" theme="primary" variant="outline" size="large"> 底部右 </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>

  <div class="popover-example">
    <div class="popover-example__summary mb-16">右侧弹出气泡</div>
    <div class="popover-example__content column mb-24">
      <div class="popover-example__content__item">
        <t-popover placement="right-top" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large"> 右侧上 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="right" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large"> 右侧中 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="right-bottom" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large"> 右侧下 </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>

  <div class="popover-example">
    <div class="popover-example__summary mb-16">左侧弹出气泡</div>
    <div class="popover-example__content column flex-end mb-24">
      <div class="popover-example__content__item">
        <t-popover placement="left-top" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large"> 左侧上 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="left" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large"> 左侧中 </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover placement="left-bottom" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large"> 左侧下 </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="less" scoped>
.popover-example {
  padding: 0 16px;

  &__summary {
    font-size: 14px;
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
    line-height: 22px;
  }

  &__content {
    display: flex;

    &__item {
      flex: 1;
    }
  }

  .row {
    .popover-example__content__item:not(:last-child) {
      margin-right: 16px;
    }
  }

  .column {
    flex-direction: column;

    .popover-example__content__item:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .flex-end {
    align-items: flex-end;
  }
}

.button-width--small {
  width: 102px;
}

.button-with--large {
  width: 223px;
}

.mb-24 {
  margin-bottom: 24px;
}

.mb-16 {
  margin-bottom: 16px;
}
</style>
