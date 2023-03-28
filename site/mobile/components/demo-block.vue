<template>
  <div :class="rootClassName">
    <div v-if="title || summary" class="tdesign-mobile-demo-block__header">
      <h2 v-if="title" class="tdesign-mobile-demo-block__title">{{ title }}</h2>
      <p v-if="summary" :class="summaryClassName">
        {{ summary }}
      </p>
    </div>
    <div :class="slotClassName">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  title?: String;
  summary?: String;
  padding?: Boolean;
}>();

const rootClassName = computed(() => [
  'tdesign-mobile-demo-block',
  {
    ['tdesign-mobile-demo-block_notitle']: !!props.title,
  },
]);

const summaryClassName = computed(() => [
  `tdesign-mobile-demo-block__summary`,
  {
    ['tdesign-mobile-demo-block_subtitle']: !!props.title,
  },
]);

const slotClassName = computed(() => [
  `tdesign-mobile-demo-block__slot`,
  {
    ['with-padding']: props.padding,
  },
]);
</script>
