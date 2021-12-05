<template>
  <div class="popup-base">
    <t-button theme="primary" @click="bottom = true">底部弹出</t-button>
    <t-popup v-model="bottom" placement="bottom">
      <div style="height: 200px; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const bottom = ref(false);

    return {
      bottom,
    };
  },
});
</script>
