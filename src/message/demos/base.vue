<template>
  <div class="button-demo" style="margin: 0 16px">
    <t-button block size="large" variant="outline" @click="showTextMessage">纯文字通知</t-button>
    <t-button block size="large" variant="outline" @click="showIconMessage">带图标通知</t-button>
    <t-button block size="large" variant="outline" @click="showCloseMessage">带关闭通知</t-button>
    <t-button block size="large" variant="outline" @click="showScrollMessage">滚动通知</t-button>
    <t-button block size="large" variant="outline" @click="showBtnMessage">带按钮通知</t-button>
  </div>

  <!-- 纯文字通知 -->
  <t-message v-model="visible" :icon="false" :offset="[20, 32]" :duration="5000"
    >这是一条纯文字的消息通知 5s消失
  </t-message>

  <!-- 带图标通知 -->
  <t-message v-model="visible1" :offset="['20px', '32px']" :duration="5000" content="这是一条带图标的消息通知 5s消失">
  </t-message>

  <!-- 带关闭通知 -->
  <t-message
    v-model="visible2"
    :offset="['20px', 32]"
    :close-btn="true"
    :duration="-1"
    content="这是一条带关闭的消息通知，常驻可关闭"
  ></t-message>

  <!-- 滚动通知 -->
  <t-message
    v-model="visible3"
    :offset="[20, 32]"
    :marquee="{ speed: 50, loop: -1, delay: 5000 }"
    :duration="-1"
    content="这是一条 5s后开始滚动的通知信息"
  ></t-message>

  <!-- 带按钮通知 -->
  <t-message
    v-model="visible4"
    :icon="iconContent"
    :offset="[20, 32]"
    :duration="-1"
    content="这是一条带操作的消息通知"
  >
    <template #closeBtn>
      <t-button class="close-btn" theme="primary" variant="outline" size="small" shape="round">按钮</t-button>
    </template>
  </t-message>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { NotificationIcon } from 'tdesign-icons-vue-next';

const visible = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);

const iconContent = () => h(NotificationIcon);

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

<style lang="less" scoped>
.close-btn {
  margin-left: 8px;
  font-size: inherit;
  line-height: inherit;
  height: 22px;
  line-height: 22px;
  border-radius: 4px;
  border-color: inherit;
  color: inherit;
  min-height: 0;
  background: transparent;
}
</style>
