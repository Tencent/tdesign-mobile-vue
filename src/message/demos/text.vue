<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" @click="visible = true">纯文本</t-button>
    </div>
    <t-message v-model="visible">纯文本，不带icon</t-message>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    return { visible };
  },
});
</script>
