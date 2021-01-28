<template>
  <div class="popup-base">
    <t-button theme="primary" @click="left = true">左侧弹出</t-button>
    <t-popup v-model="left" position="left">
      <div style="width: 200px; height: 100%; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const left = ref(false);

    return {
      left,
    };
  },
});
</script>