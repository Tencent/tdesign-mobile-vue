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
export default defineComponent({
  mounted() {
    this.initIframeMode();
  },
  methods: {
    initIframeMode() {
      const parent = window.parent;
      if (!parent) return;

      const mode = parent.document.documentElement.getAttribute('theme-mode') || 'light'
      document.documentElement.setAttribute('theme-mode', mode);
    }
  }
});
</script>
