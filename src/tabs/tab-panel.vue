<template>
  <div v-if="forceRender || isActive" v-show="isActive" :class="`${prefix}-tabs__panel`" :name="name">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs, Ref, computed } from 'vue';
import config from '../config';
import { TabPanelProps } from './tabs.interface';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-panel`,
  props: TabPanelProps,
  setup(props) {
    const currentName = inject('currentName', '') as unknown as Ref<string>;
    const isActive = computed(() => currentName.value === props.name);

    return {
      prefix,
      isActive,
      ...toRefs(props),
    };
  },
});
</script>
