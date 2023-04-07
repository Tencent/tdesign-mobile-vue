<template>
  <div class="button-demo" style="margin: 0 16px">
    <p class="summary">纯文字通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showTextMessage">纯文字的通知</t-button>
    <p class="summary">带图标通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showIconMessage">带图标的通知</t-button>
    <p class="summary">带关闭通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showCloseMessage">带关闭的通知</t-button>
    <p class="summary">可滚动通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showScrollMessage">可滚动的通知</t-button>
    <p class="summary">带按钮通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showBtnMessage">带按钮的通知</t-button>
  </div>

  <!-- 纯文字通知 -->
  <t-message v-model="visible" :icon="false" :offset="[20, 32]" :duration="5000" content="这是一条普通的通知信息" />

  <!-- 带图标通知 -->
  <t-message
    v-model="visible1"
    :icon="prefixIcon"
    :offset="['20px', '32px']"
    :duration="5000"
    content="这是一条普通的通知信息"
  />

  <!-- 带关闭通知 -->
  <t-message
    v-model="visible2"
    :icon="prefixIcon"
    :offset="['20px', 32]"
    :duration="-1"
    content="这是一条普通的通知信息"
  >
    <template #closeBtn>
      <t-button class="close-btn" variant="text">按钮</t-button>
      <closeIcon class="t-message__icon--right" />
    </template>
  </t-message>

  <!-- 滚动通知 -->
  <t-message
    v-model="visible3"
    :icon="false"
    :offset="[20, 32]"
    :marquee="true"
    content="这是一条普通的通知信息，这是一条普通的通知信息，这是一条普通的通知信息"
  />

  <!-- 带按钮通知 -->
  <t-message v-model="visible4" :icon="prefixIcon" :offset="[20, 32]" :duration="-1" content="这是一条普通的通知信息">
    <template #closeBtn>
      <t-button class="close-btn" variant="text">按钮</t-button>
    </template>
  </t-message>

  <!-- 带按钮通知 -->
  <t-message
    v-model="visible4"
    :icon="prefixIcon"
    :close-btn="rightIcon"
    :offset="[90, 32]"
    :duration="-1"
    content="这是一条普通的通知信息"
  />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { ErrorCircleFilledIcon, CloseIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';

const visible = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);

const suffixIconStyle = {
  color: 'rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
};

const prefixIcon = () => h(ErrorCircleFilledIcon, { color: '#0052D9' });
const closeIcon = () => h(CloseIcon, { ...suffixIconStyle });
const rightIcon = () => h(ChevronRightIcon, { ...suffixIconStyle });

const showTextMessage = () => {
  visible.value = true;
};

const showIconMessage = () => {
  visible1.value = true;
};

const showCloseMessage = () => {
  visible2.value = true;
};
const showScrollMessage = () => {
  visible3.value = true;
};

const showBtnMessage = () => {
  visible4.value = true;
};
</script>

<script lang="ts">
export default {
  name: 'BaseDemo',
};
</script>

<style lang="less" scoped>
.tdesign-mobile-demo-block__slot {
  margin-top: 8px;

  .t-button {
    border-radius: 6px;

    &.t-size-l {
      height: 48px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}

.tdesign-mobile-demo .summary {
  margin: 8px 0 16px;
  display: inline-block;
}

.close-btn {
  margin-left: 8px;
  height: 22px;
  line-height: 22px;
  color: #0052d9;

  &:active {
    background: none;
  }
}
</style>
