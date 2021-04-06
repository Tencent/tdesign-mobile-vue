<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="useToast('提示内容')">文字提示</t-button>
    <t-button theme="primary" @click="useThisToast('这是一条长文字提示，超过一定字数就会换行。这是一条长文字提示，超过一定字数就会换行')"
    >文字长提示</t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from '../index';

export default defineComponent({
  setup() {
    return {
      useToast: (text: string) => Toast(text),
    };
  },
  methods: {
    useThisToast(text: string) {
      this.$toast(text);
    },
  },
});
</script>
