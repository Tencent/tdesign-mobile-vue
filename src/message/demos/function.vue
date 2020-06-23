<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('info')">info</t-button>
    <t-button theme="success" @click="onClick('success')">success</t-button>
    <t-button theme="warning" @click="onClick('warning')">warning</t-button>
    <t-button theme="danger" @click="onClick('error')">error</t-button>
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
