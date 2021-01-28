<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('提示内容')">短文本</t-button>
    <t-button theme="primary"
              @click="onClick('这是一条长文字提示，超过一定字数就会换行。这是一条长文字提示，超过一定字数就会换行')"
    >长文本</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Toast from '../index';
export default defineComponent({
  setup() {
    return {
      onClick: (text) => Toast(text),
    };
  },
});
</script>
