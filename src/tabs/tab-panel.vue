<template>
  <div
    :class="`${prefix}-tabs__panel`"
    :name="name"
    v-if="forceRender || isActive"
    v-show="isActive"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs, computed } from 'vue';
import config from '../config';
import { TabPanelProps } from './tabs.interface';
const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-panel`,
  props: TabPanelProps,
  setup(props) {
    const currentName = inject('currentName', '');
    const isActive = computed(() => currentName.value === props.name);

    return {
      prefix,
      isActive,
      ...toRefs(props),
    };
  },
});
</script>
