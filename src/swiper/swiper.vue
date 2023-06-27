<template>
  <div ref="root" :class="rootClass">
    <div
      ref="swiperContainer"
      :class="`${name}__container`"
      :style="{
        flexDirection: !isVertical ? 'row' : 'column',
        transition: animating ? `transform ${duration}ms` : 'none',
        transform: translateContainer,
        height: containerHeight,
      }"
      @transitionend="handleAnimationEnd"
      @click="onItemClick"
    >
      <slot />
    </div>
    <!-- 导航器 -->
    <template v-if="navigation && enableNavigation">
      <span v-if="!isVertical && 'showControls' in navigation && navigation.showControls" :class="`${navName}__btn`">
        <span :class="`${navName}__btn--prev`" @click="goPrev()" />
        <span :class="`${navName}__btn--next`" @click="goNext()" />
      </span>
      <span
        v-if="'type' in navigation"
        :class="[
          `${navName}--${direction}`,
          `${navName}__${navigation.type || ''}`,
          `${navName}--${navigation.paginationPosition || 'bottom'}`,
        ]"
      >
        <template v-if="['dots', 'dots-bar'].includes(navigation.type || '')">
          <span
            v-for="(_, index) in items.length"
            :key="'page' + index"
            :class="[
              `${navName}__${navigation.type}-item`,
              { [`${navName}__${navigation.type}-item--active`]: index === current },
              `${navName}__${navigation.type}-item--${direction}`,
            ]"
          ></span>
        </template>
        <span v-if="navigation.type && navigation.type === 'fraction'">
          {{ (current ?? 0) + 1 + '/' + items.length }}
        </span>
      </span>
    </template>
    <template v-else-if="computedNavigation">
      <t-node :content="computedNavigation" />
    </template>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, computed, ref, provide, defineEmits, defineProps, watch } from 'vue';
import { useSwipe } from '@vueuse/core';
import isObject from 'lodash/isObject';
import { isNumber } from 'lodash';

import config from '../config';
import SwiperProps from './props';
import { renderTNode, TNode, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-swiper`;

export default {
  name,
};
</script>

<script lang="ts" setup>
const navName = `${prefix}-swiper-nav`;
const self = getCurrentInstance();

const setOffset = (offset: number, direction = 'X'): void => {
  translateContainer.value = `translate${direction}(${offset}px)`;
};

const root = ref();
const items = ref<any>([]);
const props = defineProps(SwiperProps);
const emit = defineEmits(['change', 'update:current', 'update:modelValue']);

const [current, setCurrent] = useVModel(
  ref(props.current),
  ref(props.modelValue),
  props.defaultCurrent,
  props.onChange,
);
const swiperContainer = ref<HTMLElement | null>(null);
const computedNavigation = computed(() => (isObject(props.navigation) ? '' : renderTNode(self, 'navigation')));

const animating = ref(false);
const disabled = ref(false);
const translateContainer = ref('');

const isVertical = computed(() => props.direction === 'vertical');
const containerHeight = ref('auto');

const rootClass = computed(() => {
  return [`${name}`, `${name}--${props.type}`];
});

const enableNavigation = computed(() => {
  if (typeof props.navigation === 'object') {
    return props.navigation?.minShowNum ? items.value.length >= props.navigation?.minShowNum : true;
  }
  return false;
});

let autoplayTimer: any = null;

const onItemClick = () => {
  props.onClick?.(current.value ?? 0);
};

const move = (step: number) => {
  animating.value = true;
  processIndex((current.value as number) + step);

  const moveDirection = !isVertical.value ? 'X' : 'Y';
  const distance = root.value?.[isVertical.value ? 'offsetHeight' : 'offsetWidth'] ?? 0;

  translateContainer.value = `translate${moveDirection}(${-1 * distance * step}px)`;
};

const handleAnimationEnd = () => {
  disabled.value = false;
  animating.value = false;
  translateContainer.value = 'translateX(0)';

  updateItemPosition();
};

const stopAutoplay = () => {
  if (!autoplayTimer) return;
  clearInterval(autoplayTimer as number);
  autoplayTimer = null;
};

const startAutoplay = () => {
  if (typeof props.current === 'number') return false;
  if (!props?.autoplay || autoplayTimer !== null) return false; // stop repeat autoplay
  autoplayTimer = setInterval(() => {
    goNext();
  }, props?.interval);
};

const goPrev = () => {
  disabled.value = true;
  move(-1);
};
const goNext = () => {
  disabled.value = true;
  move(1);
};

const processIndex = (index: number) => {
  const max = items.value.length;
  let val = index;

  if (index < 0) {
    val = props.loop ? max - 1 : 0;
  }
  if (index >= max) {
    val = props.loop ? 0 : max - 1;
  }

  setCurrent(val);
};

const { lengthX, lengthY } = useSwipe(swiperContainer, {
  passive: false,
  onSwipeStart() {
    if (disabled.value) return;
    stopAutoplay();
  },
  onSwipe(e: TouchEvent) {
    if (disabled.value) return;
    onTouchMove(e);
  },
  onSwipeEnd() {
    onTouchEnd();
  },
});

const onTouchMove = (event: TouchEvent) => {
  if (animating.value) return;
  event.preventDefault();
  const distanceX = lengthX.value;
  const distanceY = lengthY.value;

  animating.value = false;

  if (!isVertical.value) {
    setOffset(-distanceX);
  } else {
    setOffset(-distanceY, 'Y');
  }
};

const onTouchEnd = () => {
  const distanceX = lengthX.value;
  const distanceY = lengthY.value;

  if ((!isVertical.value && distanceX < -100) || (isVertical.value && distanceY < -100)) {
    move(-1);
  } else if ((!isVertical.value && distanceX > 100) || (isVertical.value && distanceY > 100)) {
    move(1);
  } else {
    move(current.value as number);
  }
  startAutoplay();
};

const addChild = (item: any) => {
  items.value.push(item);
};

const removeChild = (uid: number) => {
  const index = items.value.findIndex((item: any) => item.uid === uid);
  items.value.splice(index, 0);
};

const updateItemPosition = () => {
  items.value.forEach((item: any, index: number) => {
    item.calcTranslateStyle(index, current.value);
  });
};

const setContainerHeight = (height: number | string) =>
  (containerHeight.value = isNumber(height) ? `${height}px` : height);

const updateContainerHeight = () => {
  const target = items.value[current.value ?? 0];
  const rect = target?.proxy?.$el.getBoundingClientRect();

  if (props.height) {
    setContainerHeight(props.height);
  } else if (rect) {
    setContainerHeight(rect.height);
  }
};

watch(current, updateContainerHeight);

provide('parent', {
  loop: props.loop,
  root,
  items,
  isVertical,
  addChild,
  removeChild,
  setContainerHeight,
});

onMounted(() => {
  startAutoplay();
  updateItemPosition();
  updateContainerHeight();
});
</script>
