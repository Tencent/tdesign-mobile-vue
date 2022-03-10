<template>
  <div>
    <span ref="myDOM"></span>
    <div class="tdesign-demo-block">
      <t-back-top v-show="showBackTop" :target="myDOMTarget" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const myDOM = ref(null);
    const myDOMTarget = () => {
      return myDOM.value;
    };
    return {
      myDOM,
      myDOMTarget,
    };
  },
});
</script>

<style scoped></style>
