<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" @click="visible = true">纯文本</t-button>
      <t-button theme="primary" @click="visible8 = true">纯文本</t-button>
      <t-button theme="primary" @click="visible9 = true">纯文本</t-button>
      <t-button theme="primary" @click="visible10 = true">纯文本</t-button>
    </div>
    <t-message v-model="visible" >纯文本，不带icon</t-message>
    <t-message v-model="visible8" theme="success">纯文本，不带icon</t-message>
    <t-message v-model="visible9" theme="warning">纯文本，不带icon</t-message>
    <t-message v-model="visible10" theme="danger">纯文本，不带icon</t-message>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible8 = ref(false);
    const visible9 = ref(false);
    const visible10 = ref(false);
    return { visible,visible8,visible9,visible10 };
  },
});
</script>
