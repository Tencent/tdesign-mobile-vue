<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('info')">普通</t-button>
    <t-button theme="success" @click="onClick('success')">成功</t-button>
    <t-button theme="warning" @click="onClick('warning')">警示</t-button>
    <t-button theme="danger" @click="onClick('error')">错误</t-button>
  </div>
</template>

<script>
import Message from '../message';
export default {
  methods: {
    onClick(type) {
      Message[type](type);
    },
  },
};
</script>
