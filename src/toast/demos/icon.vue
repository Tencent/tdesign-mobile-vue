<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('check', '成功')">成功</t-button>
    <t-button theme="danger" @click="onClick('warning', '失败')">失败</t-button>
    <t-button theme="primary" @click="onClick('loading', '加载')">加载</t-button>
    <t-button theme="primary" @click="onClick('user-filled', '自定义图标')">自定义图标</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Toast from '../index';
export default defineComponent({
  setup() {
    return {
      onClick: (icon, message) => Toast({ icon, message }),
    };
  },
});
</script>
