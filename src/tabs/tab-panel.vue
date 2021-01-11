<template>
  <div
    v-if="forceRender || isActive"
    v-show="isActive"
    :class="`${prefix}-tabs__panel`"
    :name="name"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs, computed, watch } from 'vue';
import config from '../config';
import { TabPanelProps } from './tabs.interface';
const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-panel`,
  props: TabPanelProps,
  setup(props) {
    const getCurrentName = inject('getCurrentName') as Function;
    const currentName = computed(() => getCurrentName());
    let isActive = computed(() => currentName.value === props.name);
    watch(currentName, (newValue) => {
      isActive = computed(() => newValue === props.name);
    });
    return {
      prefix,
      isActive,
      ...toRefs(props),
    };
  },
});
</script>
