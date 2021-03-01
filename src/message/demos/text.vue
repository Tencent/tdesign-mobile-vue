<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" @click="visible = true">普通文本</t-button>
      <t-button variant="outline" @click="visible8 = true">成功文本</t-button>
      <t-button theme="danger" @click="visible10 = true">错误文本</t-button>
    </div>
    <t-message v-model="visible" >纯文本，不带icon</t-message>
    <t-message v-model="visible8" theme="success">纯文本，不带icon</t-message>
    <t-message v-model="visible10" theme="danger">纯文本，不带icon</t-message>
    <t-message v-model="visible12">提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述描述描述提示文字描述描描述描述描述提示文字描述</t-message>
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
      const visible12 = ref(false);
    return { visible,visible8,visible9,visible10,visible12 };
  },
});
</script>
