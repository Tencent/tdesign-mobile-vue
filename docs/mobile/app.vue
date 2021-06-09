<template>
  <div @touchstart.stop>
    <tdesign-header />
    <div class="tdesign-demo-main">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
