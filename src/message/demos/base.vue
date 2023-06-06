<template>
  <div class="button-demo">
    <t-button block size="large" variant="outline" theme="primary" @click="showTextMessage">纯文字的通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showIconMessage">带图标的通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showCloseMessage">带关闭的通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showScrollMessage">可滚动的通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showBtnMessage">带按钮的通知</t-button>
  </div>

  <!-- 纯文字通知 -->
  <t-message v-model="visible" :icon="false" :offset="[10, 16]" :duration="5000" content="这是一条普通的通知信息" />

  <!-- 带图标通知 -->
  <t-message v-model="visible1" :offset="['10px', '16px']" :duration="5000" content="这是一条普通的通知信息" />

  <!-- 带关闭通知 -->
  <t-message v-model="visible2" :offset="['10px', 16]" :duration="-1" content="这是一条普通的通知信息">
    <template #closeBtn>
      <t-button class="close-btn" variant="text">按钮</t-button>
      <closeIcon class="t-message__icon--right" />
    </template>
  </t-message>

  <!-- 滚动通知 -->
  <t-message
    v-model="visible3"
    :icon="false"
    :offset="[10, 16]"
    :marquee="true"
    content="这是一条普通的通知信息，这是一条普通的通知信息，这是一条普通的通知信息"
  />

  <!-- 带按钮通知 -->
  <t-message v-model="visible4" :offset="[10, 16]" :duration="-1" content="这是一条普通的通知信息">
    <template #closeBtn>
      <t-button class="close-btn" variant="text">按钮</t-button>
    </template>
  </t-message>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

const visible = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);

const suffixIconStyle = {
  color: 'rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
};

const closeIcon = () => h(CloseIcon, { ...suffixIconStyle });

const showTextMessage = () => {
  cleanMessage();
  visible.value = true;
};

const showIconMessage = () => {
  cleanMessage();
  visible1.value = true;
};

const showCloseMessage = () => {
  cleanMessage();
  visible2.value = true;
};
const showScrollMessage = () => {
  cleanMessage();
  visible3.value = true;
};

const showBtnMessage = () => {
  cleanMessage();
  visible4.value = true;
};

const cleanMessage = () => {
  visible.value = false;
  visible1.value = false;
  visible2.value = false;
  visible3.value = false;
  visible4.value = false;
};
</script>

<style lang="less" scoped>
.close-btn {
  margin-left: 8px;
  height: 22px;
  line-height: 22px;
  color: #0052d9;
  font-size: 14px;

  &::after {
    background: none;
  }
}
</style>
