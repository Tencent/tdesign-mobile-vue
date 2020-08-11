<template>
  <div :class="containerClass" ref="refContainer">
    <slot />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

const componentName = 'dropdown-menu';
const name = `${componentName}-demo`;

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

<style lang="less" scoped>
.dropdown-menu-demo {
  position: relative;
  background: #fff;
  height: 400px;
  padding: 1px 0;
  & /deep/ p {
    font-size: 14px;
    line-height: 1.4;
    margin: 1em .5em;
  }
}
.relative-container {
  transform: translate(0, 0);
}
</style>
