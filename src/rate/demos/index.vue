<template>
  <div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value" />
    </div>

    <div class="tdesign-demo-block">
      <!-- 允许清除 -->
      <t-rate v-model="value1" clearable />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      value: ref(2),
      value1: ref(3),
    };
  },
});
</script>
