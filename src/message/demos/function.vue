<template>
  <div class="tdesign-demo-block">
    <t-button size="large" variant="outline" @click="onClick('info')">普通</t-button>
    <t-button size="large" variant="outline" @click="onClick('success')" style="margin-top: 8px;">成功</t-button>
    <t-button size="large" variant="outline" @click="useThisMessage('warning')" style="margin-top: 8px;">警示</t-button>
    <t-button size="large" variant="outline" @click="useThisMessage('error')" style="margin-top: 8px;">错误</t-button>
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
