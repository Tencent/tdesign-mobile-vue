<template>
  <div class="tdesign-demo-block">
    <t-button variant="outline" @click="visible = true">带关闭通知</t-button>
    <t-button variant="outline" @click="visible1 = true">带按钮通知</t-button>
  </div>
  <t-message
    v-model="visible"
    content="这是一条带关闭的消息通知，常驻可关闭"
    :close-btn="true"
    :duration="0"
  ></t-message>
  <t-message v-model="visible1" content="这是一条带操作的消息通知">
    <template #closeBtn>
      <t-button theme="primary" variant="outline" size="small" shape="round">按钮</t-button>
    </template>
  </t-message>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    return { visible, visible1 };
  },
});
</script>
