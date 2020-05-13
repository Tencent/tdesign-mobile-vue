<template>
  <div v-show="title" class="spfx-topnav">
    <div class="spfx-topnav-title">{{ title }}</div>
    <t-icon class="spfx-topnav__back" icon="left" @click="onBack" />
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, computed } from 'vue';
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const title = computed(() => ctx.$router.currentRoute.value.meta.title);
    const onBack = () => {
      if (history.length > 1) {
        history.back();
      }
    };
    return { onBack, title };
  },
};
</script>
