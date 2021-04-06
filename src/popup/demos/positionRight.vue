<template>
  <div class="popup-base">
    <t-button theme="primary" @click="right = true">右侧弹出</t-button>
    <t-popup v-model="right" position="right">
      <div style="width: 200px; height: 100%; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const right = ref(false);

    return {
      right,
    };
  },
});
</script>
