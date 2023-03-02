<template>
  <div ref="refContainer" :class="containerClass">
    <slot />
  </div>
</template>

<script lang="ts">
import { Ref, ref, computed, onMounted, defineComponent } from 'vue';

const componentName = 'dropdown-menu';
const name = `tdesign-demo-${componentName}`;

export default defineComponent({
  name,
  setup() {
    const refContainer = ref(null);
    const extraContainerClass: Ref<Array<string>> = ref([]);
    const containerClass = computed(() => [`${name}`, ...extraContainerClass.value]);
    onMounted(() => {
      const container: any = refContainer.value;
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
});
</script>
