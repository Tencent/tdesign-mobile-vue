<template>
  <div class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showFailRow('警告文案')">警告提示</t-button>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';
import { h } from 'vue';

const showFailRow = (message: string) => {
  Toast({
    icon: () => h(ErrorCircleIcon),
    direction: 'column',
    message,
  });
};
</script>
