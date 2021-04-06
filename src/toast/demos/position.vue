<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('top')">顶部Top</t-button>
    <t-button theme="primary" @click="onClick('middle')">中间Middle</t-button>
    <t-button theme="primary" style="margin-top: 8px" @click="onClick('bottom')">底部Bottom</t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Toast from '../index';
export default defineComponent({
  setup() {
    return {
      onClick: position => Toast({ position, icon: 'check' }),
    };
  },
});
</script>
