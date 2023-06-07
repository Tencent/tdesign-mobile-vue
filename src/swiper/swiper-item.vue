<template>
  <div :class="name" :style="rootStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, inject, computed, getCurrentInstance, onMounted, onUnmounted } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-swiper-item`;

export default {
  name,
};
</script>

<script lang="ts" setup>
const { addChild, removeChild, isVertical, root, loop, items } = inject('parent') as any;
const rootStyle = ref('');
const instance = getCurrentInstance();

const direction = computed(() => (isVertical.value ? 'Y' : 'X'));

const calcTranslateStyle = (index: number, activeIndex: number) => {
  const distance = root.value?.[isVertical.value ? 'offsetHeight' : 'offsetWidth'] ?? 0;
  const lastItemIndex = items.value.length - 1;
  let step = Math.min(index + 1, Math.abs(activeIndex - index));

  if (activeIndex === index) step = 0;
  else if (index === activeIndex + 1 || (loop && activeIndex === lastItemIndex && index === 0)) step = 1;
  else if (index === activeIndex - 1 || (loop && activeIndex === 0 && index === lastItemIndex)) step = -1;

  rootStyle.value = `transform: translate${direction.value}(${step * distance}px)`;
};

onMounted(() => {
  addChild({
    uid: instance?.uid,
    calcTranslateStyle,
  });
});

onUnmounted(() => {
  removeChild(instance?.uid);
});
</script>
