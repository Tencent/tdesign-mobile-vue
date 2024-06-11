<template>
  <div class="loading-demo">
    <div id="alice" class="loading-attach-demo__title">Hello, I'm Alice. I'm going to be a front-end developer.</div>
    <t-loading attach="#alice" size="small" :loading="loading"></t-loading>
    <t-switch v-model="loading" :custom-value="[true, false]" size="small" :label="['开', '关']" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Switch as TSwitch } from 'tdesign-mobile-vue';

const loading = ref(false);
</script>

<style scoped>
.loading-demo {
  padding: 0 16px;
}
.loading-attach-demo__title {
  /** `position: relative` is required as a parent node */
  position: relative;
  width: 360px;
  text-align: center;
}
</style>
