<template>
  <div :class="containerClass" ref="refContainer">
    <slot />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

const componentName = 'dropdown-menu';
const name = `tdesign-demo-${componentName}`;

export default {
  name,
  setup() {
    const refContainer = ref(null);
    const extraContainerClass = ref([]);
    const containerClass = computed(() => [`${name}`, ...extraContainerClass.value]);
    onMounted(() => {
      const container = refContainer.value;
      const containerRect = container.getBoundingClientRect();
      const isNeedRelativeContainer = containerRect.left > 0;
      if (isNeedRelativeContainer) {
        extraContainerClass.value.push('relative-container');
      }
    });
    return {
      refContainer,
      containerClass,
    };
  },
};
</script>
