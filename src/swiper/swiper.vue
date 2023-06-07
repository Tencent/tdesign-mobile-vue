<template>
  <div ref="root" :class="rootClass" :style="{ height: swiperHeight }">
    <div
      ref="swiperContainer"
      :class="`${name}__container`"
      :style="{
        flexDirection: !isVertical ? 'row' : 'column',
      }"
      @transitionend="handleAnimationEnd"
      @click="onItemClick"
    >
      <slot />
    </div>
    <!-- 导航器 -->
    <template v-if="navigation && state.showNavigation">
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
              { [`${navName}__${navigation.type}-item--active`]: index === state.activeIndex },
              `${navName}__${navigation.type}-item--${direction}`,
            ]"
          ></span>
        </template>
        <span v-if="navigation.type && navigation.type === 'fraction'">
          {{ (current ?? 0 + 1) + '/' + items.length }}
        </span>
      </span>
    </template>
    <template v-else-if="computedNavigation !== undefined">
      <t-node :content="computedNavigation" />
    </template>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  getCurrentInstance,
  onMounted,
  computed,
  watch,
  ref,
  nextTick,
  provide,
  ComponentPublicInstance,
  defineEmits,
  defineProps,
} from 'vue';
import { useSwipe } from '@vueuse/core';
import config from '../config';

import SwiperProps from './props';

import { renderTNode, TNode, useEmitEvent, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-swiper`;

export default {
  name,
};
</script>

<script lang="ts" setup>
const navName = `${prefix}-swiper-nav`;
const setOffset = (element: HTMLDivElement, offset: number, direction = 'X'): void => {
  // eslint-disable-next-line no-param-reassign
  element.style.transform = `translate${direction}(${offset}px)`;
};

const root = ref();
const items = ref<any>([]);
const props = defineProps(SwiperProps);
const emit = defineEmits(['change', 'update:current', 'update:modelValue']);

const emitEvent = useEmitEvent(props, emit);
const [current, setCurrent] = useVModel(
  ref(props.current),
  ref(props.modelValue),
  props.defaultCurrent,
  props.onChange,
);
const self = getCurrentInstance();
const swiperContainer = ref<HTMLElement | null>(null);
const computedNavigation = computed(() => renderTNode(self, 'navigation'));

const state = reactive({
  showNavigation: true,
  activeIndex: 0,
  itemLength: 0,
  itemWidth: 0,
  itemHeight: 0,
  btnDisabled: false,
  children: [] as ComponentPublicInstance[],
});

const isVertical = computed(() => props.direction === 'vertical');
const swiperHeight = computed(() => {
  if (isVertical.value && props.height) {
    return `${props.height}px`;
  }
  return '192px';
});

const rootClass = computed(() => {
  return [`${name}`, `${name}--${props.type}`];
});

const getContainer = (): HTMLDivElement => self?.proxy?.$el.querySelector(`.${name}__container`);

const initSwiper = () => {
  const _swiperContainer = getContainer();
  const items = _swiperContainer.querySelectorAll(`.${name}-item`);
  state.itemLength = _swiperContainer.children?.length || 0;
  const { width, height } = _swiperContainer.querySelector(`.${name}-item`)?.getBoundingClientRect() || {};
  state.itemWidth = width || 0;
  state.itemHeight = height || 0;
  if (items.length <= 0) return false;
  if (computedNavigation.value?.minShowNum && items.length < computedNavigation.value?.minShowNum) {
    state.showNavigation = false;
  }

  // move(0);
  startAutoplay();
};

onMounted(() => {
  initSwiper();
});

watch(
  () => state.children.length,
  () => {
    nextTick(() => {
      console.info('swiper mounted');
      initSwiper();
    });
  },
);

// eslint-disable-next-line no-undef
let autoplayTimer: number | NodeJS.Timeout | null = null;
let actionIsTrust = true;

const onItemClick = () => {
  emitEvent('click', state.activeIndex);
};

const move = (targetIndex: number, isTrust = true) => {
  const _swiperContainer = getContainer();
  const moveDirection = !isVertical.value ? 'X' : 'Y';
  const moveLength: number = props?.direction === 'vertical' ? state.itemHeight : state.itemWidth;
  actionIsTrust = isTrust;
  _swiperContainer.dataset.isTrust = `${isTrust}`;
  // do not translate one item if not loop
  console.log(`translate${moveDirection}(${-1 * moveLength * targetIndex}px)`);

  _swiperContainer.style.transform = `translate${moveDirection}(${-1 * moveLength * targetIndex}px)`;
};
const addAnimation = () => {
  const _swiperContainer = getContainer();
  _swiperContainer.style.transition = `transform ${props?.duration}ms`;
};
const removeAnimation = () => {
  const _swiperContainer = getContainer();
  _swiperContainer.style.transition = 'none';
};
const handleAnimationEnd = () => {
  state.btnDisabled = false;
  removeAnimation();
  // if (state.activeIndex >= state.itemLength) {
  //   state.activeIndex = 0;
  //   move(0);
  // }
  // if (state.activeIndex <= -1) {
  //   state.activeIndex = state.itemLength - 1;
  //   move(state.itemLength - 1);
  // }
  // setTimeout(() => {
  //   actionIsTrust && emitCurrentChange(state.activeIndex);
  // }, 0);
  updateItemPosition();
  const _swiperContainer = getContainer();
  _swiperContainer.style.transform = 'translateX(0)';
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
const emitCurrentChange = (index: number) => {
  let resultIndex = index;
  if (index >= state.itemLength) resultIndex = 0;
  if (index < 0) resultIndex = state.itemLength - 1;
  // emitEvent('change', resultIndex);
  setCurrent(resultIndex);
};

const goPrev = () => {
  processIndex((current.value as number) + 1);
};
const goNext = () => {
  processIndex((current.value as number) + 1);
};

const processIndex = (index: number) => {
  const max = items.value.length;

  if (index < 0) {
    setCurrent(props.loop ? max - 1 : 0);
  } else if (index >= max) {
    setCurrent(props.loop ? 0 : max - 1);
  } else {
    setCurrent(index);
  }
};

const { lengthX, lengthY } = useSwipe(swiperContainer, {
  passive: false,
  onSwipeStart(e: TouchEvent) {
    if (state.btnDisabled) return false;
    stopAutoplay();
  },
  onSwipe(e: TouchEvent) {
    if (state.btnDisabled) return false;
    onTouchMove(e);
  },
  onSwipeEnd() {
    onTouchEnd();
  },
});

const onTouchMove = (event: TouchEvent) => {
  event.preventDefault();
  const { activeIndex, itemWidth, itemHeight } = state;
  const distanceX = lengthX.value;
  const distanceY = lengthY.value;
  const _container = getContainer();
  removeAnimation();
  const toIndex = props?.loop ? activeIndex + 1 : activeIndex;
  if (!isVertical.value) {
    setOffset(_container, -distanceX);
  } else {
    setOffset(_container, -distanceY, 'Y');
  }
};

const onTouchEnd = () => {
  const distanceX = lengthX.value;
  const distanceY = lengthY.value;
  addAnimation();
  if ((!isVertical.value && distanceX < -100) || (isVertical.value && distanceY < -100)) {
    move(-1);
    goPrev();
  } else if ((!isVertical.value && distanceX > 100) || (isVertical.value && distanceY > 100)) {
    move(1);
    goNext();
  } else {
    move(state.activeIndex);
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
    item.calcTranslateStyle(index, current.value, items.value.length);
  });
};

provide('parent', {
  loop: props.loop,
  root,
  isVertical,
  addChild,
  removeChild,
});

onMounted(() => {
  updateItemPosition();
});
</script>
