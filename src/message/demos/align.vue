<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button variant="outline" @click="visible = true">居中对齐</t-button>
    </div>
    <t-message v-model="visible" content="居中对齐" align="center" />
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
