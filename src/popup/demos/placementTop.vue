<template>
  <div class="popup-base">
    <t-button theme="primary" @click="top = true">顶部弹出</t-button>
    <t-popup v-model="top" placement="top">
      <div style="height: 200px; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const top = ref(false);

    return {
      top,
    };
  },
});
</script>
