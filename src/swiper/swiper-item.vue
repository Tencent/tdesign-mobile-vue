<template>
  <div ref="selfRef" :class="name" :style="rootStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, inject, computed, getCurrentInstance, onMounted, onUnmounted, watch } from 'vue';
import { useElementBounding } from '@vueuse/core';

import config from '../config';

const { prefix } = config;
const name = `${prefix}-swiper-item`;

export default {
  name,
};
</script>

<script lang="ts" setup>
const { addChild, removeChild, isVertical, root, loop, items, setContainerHeight } = inject('parent') as any;
const selfRef = ref(null);
const rootStyle = ref('');
const instance = getCurrentInstance();

const direction = computed(() => (isVertical.value ? 'Y' : 'X'));

const calcTranslateStyle = (index: number, activeIndex: number) => {
  const distance = root.value?.[isVertical.value ? 'offsetHeight' : 'offsetWidth'] ?? 0;
  const lastItemIndex = items.value.length - 1;
  const step = activeIndex === lastItemIndex && index === 0 ? 1 : index - activeIndex;

  rootStyle.value = `transform: translate${direction.value}(${step * distance}px)`;
};
const { height } = useElementBounding(selfRef);

watch(height, (val) => {
  setContainerHeight(val);
});

onMounted(() => {
  addChild({
    proxy: instance?.proxy,
    uid: instance?.uid,
    calcTranslateStyle,
  });
});

onUnmounted(() => {
  removeChild(instance?.uid);
});
</script>
