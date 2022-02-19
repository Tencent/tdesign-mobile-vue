<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick()">背景遮罩</t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Toast } from 'tdesign-mobile-vue';

export default defineComponent({
  setup() {
    return {
      onClick: () => Toast({ showOverlay: true, message: '提示内容' }),
    };
  },
});
</script>
