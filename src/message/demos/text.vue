<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button size="large" variant="outline" @click="visible = true">普通</t-button>
      <t-button size="large" variant="outline" @click="visible8 = true" style="margin-top: 8px">成功</t-button>
      <t-button size="large" variant="outline" @click="visible9 = true" style="margin-top: 8px">警示</t-button>
      <t-button size="large" variant="outline" @click="visible10 = true" style="margin-top: 8px">错误</t-button>
    </div>
    <t-message v-model="visible" >纯文本，不带icon</t-message>
    <t-message v-model="visible8" theme="success">纯文本，不带icon</t-message>
    <t-message v-model="visible9" theme="warning">纯文本，不带icon</t-message>
    <t-message v-model="visible10" theme="error">纯文本，不带icon</t-message>
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
