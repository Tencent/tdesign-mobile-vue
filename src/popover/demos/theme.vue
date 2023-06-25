<template>
  <div class="popover-example">
    <div class="popover-example__content">
      <t-popover :visible="visibleList[0]" placement="top" theme="dark" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large" @click="handleClick(0)">
            深色
          </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover :visible="visibleList[1]" placement="top" theme="light" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large" @click="handleClick(1)">
            浅色
          </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover :visible="visibleList[2]" placement="top" theme="brand" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large" @click="handleClick(2)">
            品牌色
          </t-button>
        </template>
      </t-popover>
    </div>
  </div>
  <div class="popover-example">
    <div class="popover-example__content">
      <t-popover :visible="visibleList[3]" placement="top" theme="success" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large" @click="handleClick(3)">
            成功色
          </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover :visible="visibleList[4]" placement="top" theme="warning" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large" @click="handleClick(4)">
            警告色
          </t-button>
        </template>
      </t-popover>
    </div>
    <div class="popover-example__content">
      <t-popover :visible="visibleList[5]" placement="top" theme="error" content="弹出气泡内容">
        <template #triggerElement>
          <t-button class="button-width--small" theme="primary" variant="outline" size="large" @click="handleClick(5)">
            错误色
          </t-button>
        </template>
      </t-popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const visibleList = ref([false, false, false, false, false, false]);

const handleClick = (number: number) => {
  const newVisibleList = visibleList.value.map((item, index) => {
    if (index === number) {
      return !item;
    }
    return false;
  });
  visibleList.value = newVisibleList;
};
</script>

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
