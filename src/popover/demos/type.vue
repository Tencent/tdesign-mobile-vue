<template>
  <div class="popover-example">
    <div class="popover-example__summary mb-16">带箭头的弹出气泡</div>
    <div class="popover-example__content mb-24">
      <t-popover
        :visible="visibleList[0]"
        placement="top"
        theme="dark"
        content="弹出气泡内容"
        @visible-change="handleVisibleChange"
      >
        <template #triggerElement>
          <t-button theme="primary" variant="outline" size="large" @click="handleClick(0)">带箭头</t-button>
        </template>
      </t-popover>
    </div>
  </div>
  <div class="popover-example">
    <div class="popover-example__summary mb-16">不带箭头的弹出气泡</div>
    <div class="popover-example__content mb-24">
      <t-popover :visible="visibleList[1]" placement="top" theme="dark" :show-arrow="false" content="弹出气泡内容">
        <template #triggerElement>
          <t-button theme="primary" variant="outline" size="large" @click="handleClick(1)">不带箭头</t-button>
        </template>
      </t-popover>
    </div>
  </div>
  <div class="popover-example">
    <div class="popover-example__summary mb-16">自定义内容弹出气泡</div>
    <div class="custom popover-example__content mb-24">
      <t-popover :visible="visibleList[2]" placement="top" theme="dark">
        <template #triggerElement>
          <t-button theme="primary" variant="outline" size="large" @click="handleClick(2)">自定义内容</t-button>
        </template>
        <template #content>
          <div class="custom__list">
            <div v-for="i in 3" :key="i" class="custom__item">选项{{ i }}</div>
          </div>
        </template>
      </t-popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const visibleList = ref([false, false, false]);

const handleClick = (number: number) => {
  const newVisibleList = visibleList.value.map((item, index) => {
    if (index === number) {
      return !item;
    }
    return false;
  });
  visibleList.value = newVisibleList;
};

const handleVisibleChange = (visible: boolean) => {
  console.log('visible is: ', visible);
};
</script>

<style lang="less" scoped>
.popover-example {
  padding: 0 16px;

  &__content {
    display: flex;
    justify-content: center;
  }

  &__summary {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 22px;
  }
}

.custom {
  --td-popover-padding: 0;
}
.custom__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.custom__item {
  width: 105px;
  line-height: 24px;
  text-align: center;
  padding: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid #fff;
  }
}
.mb-24 {
  margin-bottom: 24px;
}

.mb-16 {
  margin-bottom: 16px;
}
</style>
