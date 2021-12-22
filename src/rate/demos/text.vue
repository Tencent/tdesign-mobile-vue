<template>
  <div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value" clearable show-text allow-half />
    </div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value1" clearable show-text allow-half text-color="#FA0" />
    </div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value2" clearable show-text :texts="texts" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(0);
    const value1 = ref(2.5);
    const value2 = ref(3);
    const texts = ref(['很差', '差', '一般', '好评', '优秀']);

    return {
      value,
      value1,
      value2,
      texts,
    };
  },
});
</script>
