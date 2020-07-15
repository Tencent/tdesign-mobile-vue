<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('提示内容')">文字提示</t-button>
    <t-button theme="primary"
              @click="onClick('这是一条长文字提示，超过一定字数就会换行。这是一条长文字提示，超过一定字数就会换行')"
    >文字长提示</t-button>
  </div>
</template>

<script>
import Toast from '../index';
export default {
  methods: {
    onClick(text) {
      Toast(text);
    },
  },
};
</script>
