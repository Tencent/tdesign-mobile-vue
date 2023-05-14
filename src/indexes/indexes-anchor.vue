<template>
  <div :class="`${name}`">
    <div :class="contentClass">
      <div :class="`${name}__slot`">
        <slot />
      </div>
      <div :class="indexClass">{{ index }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import config from '../config';
import IndexesProps from './props';
import indexesAnchorProps from './indexes-anchor-props';

const name = `${config.prefix}-indexes-anchor`;

export default defineComponent({
  name,
  props: indexesAnchorProps,
  setup(props, context) {
    const indexesProvide = inject('indexesProvide') as typeof IndexesProps;
    const boxClasses = computed(() => []);
    const contentClass = computed(() => [
      `${name}__wrapper`,
      { [`${name}__wrapper--sticky`]: false },
      { [`${name}__wrapper--active`]: false },
    ]);
    const active = ref(false);
    const indexClass = computed(() => [
      `${name}__header`,
      {
        [`${name}__header--active`]: false,
      },
    ]);

    return {
      name,
      boxClasses,
      contentClass,
      indexClass,
    };
  },
});
</script>
