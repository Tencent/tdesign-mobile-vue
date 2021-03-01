<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button size="large" variant="outline" @click="visible = true">普通</t-button>
      <t-button size="large" variant="outline" @click="visible1 = true" style="margin-top: 8px">成功</t-button>
      <t-button size="large" variant="outline" @click="visible2 = true" style="margin-top: 8px">警示</t-button>
      <t-button size="large" variant="outline" @click="visible3 = true" style="margin-top: 8px">错误</t-button>
    </div>
    <t-message v-model="visible" content="普通消息" />
    <t-message v-model="visible1" content="成功消息" theme="success" />
    <t-message v-model="visible2" content="警示消息" theme="warning" />
    <t-message v-model="visible3" content="错误消息" theme="error" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);

    return {
      visible,
      visible1,
      visible2,
      visible3,
    };
  },
});
</script>
