<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Message 消息通知</h1>
    <p class="summary">用于页面消息通知提示，具有成功提示、提醒、警示等功能，通常在顶部出现，可以自动消失或点击关闭</p>
    <tdesign-demo-block title="01 类型" summary="弹窗内容为存文本、标题和副标题、带输入框">
      <div class="message-demo">
        <t-button size="large" variant="outline" @click="visible7 = true">纯文本通知</t-button>
        <!-- <t-button size="large" variant="outline" @click="visible12 = true">滚动通知</t-button>
        <t-button size="large" variant="outline" @click="visible3 = true">带按钮通知</t-button>
        <t-button size="large" variant="outline" @click="visible1 = true">带图标通知</t-button>
        <t-button size="large" variant="outline" @click="visible2 = true">带关闭通知</t-button> -->
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="消息的状态">
      <div class="message-demo">
        <t-button size="large" variant="outline" @click="visible = true">普通</t-button>
        <t-button size="large" variant="outline" @click="visible1 = true">成功</t-button>
        <t-button size="large" variant="outline" @click="visible2 = true">警示</t-button>
        <t-button size="large" variant="outline" @click="visible3 = true">错误</t-button>
      </div>
    </tdesign-demo-block>
    <t-message v-model="visible" content="普通消息"></t-message>
    <t-message v-model="visible1" content="成功消息" theme="success"></t-message>
    <t-message v-model="visible2" content="警示消息" theme="warning"></t-message>
    <t-message v-model="visible3" content="错误消息" theme="error"></t-message>
    <t-message v-model="visible5" content="5000ms后消失" :duration="5000" />
    <t-message v-model="visible6" content="居中对齐" align="center" />
    <t-message v-model="visible7">纯文本，不带icon</t-message>
    <t-message v-model="visible8" theme="success">纯文本，不带icon</t-message>
    <t-message v-model="visible9" theme="warning">纯文本，不带icon</t-message>
    <t-message v-model="visible10" theme="error">纯文本，不带icon</t-message>
    <t-message v-model="visible12"
      >提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述描述描述提示文字描述描描述描述描述提示文字描述</t-message
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Message from '../index';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const visible4 = ref(false);
    const visible5 = ref(false);
    const visible6 = ref(false);
    const visible7 = ref(false);
    const visible8 = ref(false);
    const visible9 = ref(false);
    const visible10 = ref(false);
    const visible11 = ref(false);
    const visible12 = ref(false);

    return {
      visible,
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      visible6,
      visible7,
      visible8,
      visible9,
      visible10,
      visible11,
      visible12,
      onClick: (type) => Message[type](type),
    };
  },
});
</script>
