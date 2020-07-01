<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" @click="visible = true">普通</t-button>
      <t-button theme="success" @click="visible1 = true">成功</t-button>
      <t-button theme="warning" @click="visible2 = true">警示</t-button>
      <t-button theme="danger" @click="visible3 = true">错误</t-button>
    </div>
    <t-message v-model="visible" content="普通消息" />
    <t-message v-model="visible1" content="成功消息" theme="success" />
    <t-message v-model="visible2" content="警示消息" theme="warning" />
    <t-message v-model="visible3" content="错误消息" theme="error" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
    };
  },
};
</script>
