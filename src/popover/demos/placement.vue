<template>
  <div class="popover-example">
    <div class="popover-example__summary mb-16">顶部弹出气泡</div>
    <div class="popover-example__content row mb-24">
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[0]" placement="top-left" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button
              class="button-width--small"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(0)"
            >
              顶部左
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[1]" placement="top" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button
              class="button-width--small"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(1)"
            >
              顶部中
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[2]" placement="top-right" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button
              class="button-width--small"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(2)"
            >
              顶部右
            </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>

  <div class="popover-example">
    <div class="popover-example__summary mb-16">底部弹出气泡</div>
    <div class="popover-example__content row mb-24">
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[3]" placement="bottom-left" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button
              class="button-width--small"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(3)"
            >
              底部左
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[4]" placement="bottom" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button
              class="button-width--small"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(4)"
            >
              底部中
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[5]" placement="bottom-right" theme="dark" content="弹出气泡内容">
          <template #triggerElement>
            <t-button
              class="button-width--small"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(5)"
            >
              底部右
            </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>

  <div class="popover-example">
    <div class="popover-example__summary mb-16">右侧弹出气泡</div>
    <div class="popover-example__content column mb-24">
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[6]" placement="right-top" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large" @click="handleClick(6)">
              右侧上
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[7]" placement="right" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large" @click="handleClick(7)">
              右侧中
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[8]" placement="right-bottom" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large" @click="handleClick(8)">
              右侧下
            </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>

  <div class="popover-example">
    <div class="popover-example__summary mb-16">左侧弹出气泡</div>
    <div class="popover-example__content column flex-end mb-24">
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[9]" placement="left-top" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button class="button-with--large" theme="primary" variant="outline" size="large" @click="handleClick(9)">
              左侧上
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[10]" placement="left" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button
              class="button-with--large"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(10)"
            >
              左侧中
            </t-button>
          </template>
        </t-popover>
      </div>
      <div class="popover-example__content__item">
        <t-popover :visible="visibleList[11]" placement="left-bottom" theme="dark" content="气泡内容">
          <template #triggerElement>
            <t-button
              class="button-with--large"
              theme="primary"
              variant="outline"
              size="large"
              @click="handleClick(11)"
            >
              左侧下
            </t-button>
          </template>
        </t-popover>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const visibleList = ref([false, false, false, false, false, false, false, false, false, false, false, false]);

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
  padding: 0 16px;

  &__summary {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
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
