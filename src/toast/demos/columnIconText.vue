<template>
  <div class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showWithIcon(text, 'column')"
      >带竖向图标</t-button
    >
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

const text = ref('轻提示文字内容');
const showWithIcon = (message: string, direction: any) => {
  Toast({
    theme: 'success',
    direction,
    duration: 10000,
    message,
  });
};
</script>
