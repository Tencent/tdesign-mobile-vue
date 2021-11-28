<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Message 消息通知</h1>
    <p class="summary">用于页面消息通知提示，具有成功提示、提醒、警示等功能，通常在顶部出现，可以自动消失或点击关闭</p>
    <tdesign-demo-block title="01 类型" summary="弹窗内容为存文本、标题和副标题、带输入框">
      <div class="button-demo" style="margin: 0 16px">
        <t-button size="large" variant="outline" @click="visible = true">纯文字通知</t-button>
        <t-button size="large" variant="outline" @click="visible1 = true">带图标通知</t-button>
        <t-button size="large" variant="outline" @click="visible2 = true">带关闭通知</t-button>
        <t-button size="large" variant="outline" @click="visible3 = true">带按钮通知</t-button>
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="弹窗内容为存文本、标题和副标题、带输入框">
      <div class="button-demo" style="margin: 0 16px">
        <t-button size="large" variant="outline" @click="visible4 = true">普通通知</t-button>
        <t-button size="large" variant="outline" @click="visible5 = true">成功提示通知</t-button>
        <t-button size="large" variant="outline" @click="visible6 = true">警示提示通知</t-button>
        <t-button size="large" variant="outline" @click="visible7 = true">错误提示通知</t-button>
      </div>
    </tdesign-demo-block>

    <t-message v-model="visible">这是一条纯文字的消息通知</t-message>
    <t-message v-model="visible1" content="这是一条带图标的消息通知"></t-message>
    <t-message v-model="visible2" content="警示消息"></t-message>
    <t-message v-model="visible3" content="错误消息"></t-message>
    <t-message v-model="visible4" content="这是一条普通的通知信息" theme="info"></t-message>
    <t-message v-model="visible5" content="这是一条需要成功的提示消息" theme="success"></t-message>
    <t-message v-model="visible6" content="这是一条需要用户关注到的警示通知" theme="warning"></t-message>
    <t-message v-model="visible7" content="这是一条错误提示通知" theme="error"></t-message>

  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import TButton from '../../button';
import TMessage from '../index';

export default defineComponent({
  components: { TButton },
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
      onClick: type => TMessage[type](type),
    };
  },
});
</script>

<style lang="less">
// .message-base {
//   .t-button:not(:last-child) {
//     margin-right: 20px;
//   }
// }
.tdesign-demo-block {
  .t-button:not(:last-child) {
    margin-bottom: 12px;
  }
}
.tdesign-text-message-btn {
  .t-button:not(:last-child) {
    margin-right: 6px;
    margin-bottom: 12px;
  }
}
</style>
