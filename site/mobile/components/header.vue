<template>
  <div v-show="title" class="tdesign-demo-topnav">
    <div class="tdesign-demo-topnav-title">{{ title }}</div>
    <chevron-left-icon class="tdesign-demo-topnav__back" name="chevron-left" @click="onBack" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
export default defineComponent({
  components: { ChevronLeftIcon },
  setup() {
    const router = useRouter();
    const title = computed(() => router.currentRoute.value.meta.title);

    const onBack = () => {
      if (history.length > 1) {
        history.back();
      }
    };
    return { onBack, title };
  },
});
</script>
