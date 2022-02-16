<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('top')">顶部Top</t-button>
    <t-button theme="primary" @click="onClick('middle')">中间Middle</t-button>
    <t-button theme="primary" style="margin-top: 8px" @click="onClick('bottom')">底部Bottom</t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { CheckIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

export default defineComponent({
  setup() {
    return {
      onClick: (position: any) => Toast({ position, icon: () => h(CheckIcon) }),
    };
  },
});
</script>
