<template>
  <div class="popup-base">
    <t-button theme="primary" @click="center = true">中部弹出</t-button>
    <t-popup v-model="center" placement="center">
      <div style="width: 200px; height: 200px; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const center = ref(false);

    return {
      center,
    };
  },
});
</script>
