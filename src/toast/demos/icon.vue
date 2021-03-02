<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('tick')">成功</t-button>
    <t-button theme="primary" @click="onClick('warning' )">失败</t-button>
    <t-button theme="primary" style="margin-top: 8px;" @click="onClick('loading')">加载</t-button>
    <t-button theme="primary" style="margin-top: 8px;" @click="onClick('user-filled')">自定义图标</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Toast from '../index';
export default defineComponent({
  setup() {
    return {
      onClick: (icon) => Toast({ icon }),
    };
  },
});
</script>
