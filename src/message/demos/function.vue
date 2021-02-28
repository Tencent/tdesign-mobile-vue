<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('info')">普通</t-button>
    <t-button theme="primary" @click="onClick('success')">成功</t-button>
    <t-button theme="primary" @click="useThisMessage('warning')">警示</t-button>
    <t-button theme="primary" @click="useThisMessage('error')">错误</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Message from '../index';

export default defineComponent({
  setup() {
    return {
      onClick: (type) => Message[type](type)
    };
  },
  methods: {
    useThisMessage(type) {
      this.$message[type](type);
    },
  },
});
</script>
