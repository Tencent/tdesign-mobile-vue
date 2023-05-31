<template>
  <div :class="rootName" :style="{ height: swiperHight }">
    <div
      ref="swiperContainer"
      :class="`${name}__container`"
      :style="{
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
      }"
      @transitionend="handleAnimationEnd"
      @click="onItemClick"
    >
      <slot></slot>
    </div>
    <!-- 导航器 -->
    <template v-if="navigation && state.showNavigation">
      <span
        v-if="direction === 'horizontal' && 'showControls' in navigation && navigation.showControls"
        :class="`${navName}__btn`"
      >
        <span :class="`${navName}__btn--prev`" @click="prev(1)" />
        <span :class="`${navName}__btn--next`" @click="next(1)" />
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
            v-for="(_, index) in state.children.length"
            :key="'page' + index"
            :class="[
              `${navName}__${navigation.type}-item`,
              { [`${navName}__${navigation.type}-item--active`]: index === state.activeIndex },
              `${navName}__${navigation.type}-item--${direction}`,
            ]"
          ></span>
        </template>
        <span v-if="navigation.type && navigation.type === 'fraction'">
          {{ showPageNum + '/' + state.children.length }}
        </span>
      </span>
    </template>
    <template v-else-if="computedNavigation !== undefined">
      <t-node :content="computedNavigation"></t-node>
    </template>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  onMounted,
  computed,
  watch,
  ref,
  nextTick,
  provide,
  ComponentInternalInstance,
  ComponentPublicInstance,
} from 'vue';
import { useSwipe } from '@vueuse/core';
import SwiperProps from './props';
import config from '../config';
import { renderTNode, useDefault, TNode, useEmitEvent } from '../shared';
import { SwiperNavigation, TdSwiperProps } from './type';

const { prefix } = config;
const name = `${prefix}-swiper`;
const navName = `${prefix}-swiper-nav`;
const setOffset = (element: HTMLDivElement, offset: number, direction = 'X'): void => {
  // eslint-disable-next-line no-param-reassign
  element.style.transform = `translate${direction}(${offset}px)`;
};
export default defineComponent({
  name,
  components: { TNode },
  props: SwiperProps,
  emits: ['change', 'update:current', 'update:modelValue'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const [swiperValue, setSwiperValue] = useDefault<Number, TdSwiperProps>(props, context.emit, 'current', 'change');
    const self = getCurrentInstance();
    const swiperContainer = ref<HTMLElement | null>(null);
    const computedNavigation = computed(() => renderTNode(self, 'navigation'));

    const state: {
      showNavigation: boolean;
      activeIndex: number;
      itemLength: number;
      itemWidth: number;
      itemHight: number;
      isControl: boolean;
      btnDisabled: boolean;
      children: ComponentPublicInstance[];
    } = reactive({
      showNavigation: true,
      activeIndex: 0,
      itemLength: 0,
      itemWidth: 0,
      itemHight: 0,
      isControl: false,
      btnDisabled: false,
      children: [] as ComponentPublicInstance[],
    });
    const paginationList = computed(() => new Array(state.itemLength).fill(1));
    const showPageNum = computed(() => {
      const { activeIndex, itemLength } = state;
      if (activeIndex > itemLength - 1) return itemLength;
      if (activeIndex < 0) return 1;
      return activeIndex + 1;
    });
    const swiperHight = computed(() => {
      const { itemHight } = state;
      const { placement = 'inside' } = props.navigation as SwiperNavigation;
      if (placement === 'outside') {
        return `${itemHight + 36}px`;
      }
      return `${itemHight}px`;
    });

    const rootName = computed(() => {
      return [`${name}`];
    });

    const getContainer = (): HTMLDivElement => self?.proxy?.$el.querySelector(`.${name}__container`);
    const initSwiper = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.querySelectorAll('.copy-item').forEach((ele) => {
        _swiperContainer.removeChild(ele);
      });
      const items = _swiperContainer.querySelectorAll(`.${name}-item`);
      state.itemLength = _swiperContainer.children?.length || 0;
      const { width, height } = _swiperContainer.querySelector(`.${name}-item`)?.getBoundingClientRect() || {};
      state.itemWidth = width || 0;
      state.itemHight = height || 0;
      if (items.length <= 0) return false;
      if (
        computedNavigation.value &&
        'minShowNum' in computedNavigation.value &&
        items.length < computedNavigation.value.minShowNum
      ) {
        state.showNavigation = false;
      }
      if (props?.loop) {
        const first = items[0].cloneNode(true) as HTMLDivElement;
        first.classList.add('copy-item');
        const last = items[items.length - 1].cloneNode(true) as HTMLDivElement;
        last.classList.add('copy-item');
        _swiperContainer.appendChild(first);
        _swiperContainer.insertBefore(last, items[0]);
      }
      move(0);
      startAutoplay();
      if (typeof props.current === 'number') {
        state.isControl = true;
        next(props.current);
      }
    };
    onMounted(() => {
      nextTick(() => {
        console.info('swiper mounted');
        initSwiper();
      });
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
    /**
     * move item
     */
    const move = (targetIndex: number, isTrust = true) => {
      const _swiperContainer = getContainer();
      const moveDirection = props?.direction === 'horizontal' ? 'X' : 'Y';
      const moveLength: number = props?.direction === 'vertical' ? state.itemHight : state.itemWidth;
      actionIsTrust = isTrust;
      _swiperContainer.dataset.isTrust = `${isTrust}`;
      // do not translate one item if not loop
      const toIndex = props?.loop ? targetIndex + 1 : targetIndex;
      _swiperContainer.style.transform = `translate${moveDirection}(-${moveLength * toIndex}px)`;
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
      if (state.activeIndex >= state.itemLength) {
        state.activeIndex = 0;
        move(0);
      }
      if (state.activeIndex <= -1) {
        state.activeIndex = state.itemLength - 1;
        move(state.itemLength - 1);
      }
      setTimeout(() => {
        actionIsTrust && emitCurrentChange(state.activeIndex);
      }, 0);
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
        state.activeIndex += 1;
        if (!props?.loop && state.activeIndex >= state.children.length - 1) {
          state.activeIndex = 0;
        }
        if (!props?.loop && state.activeIndex <= 0) {
          state.activeIndex = state.children.length - 1;
        }
        addAnimation();
        move(state.activeIndex);
      }, props?.interval);
    };
    const emitCurrentChange = (index: number) => {
      // if (!state.isControl) return false;
      let resultIndex = index;
      if (index >= state.itemLength) resultIndex = 0;
      if (index < 0) resultIndex = state.itemLength - 1;
      // emitEvent('change', resultIndex);
      setSwiperValue(resultIndex);
    };
    const prev = (step = 1) => {
      const cannotMovePrev = !props?.loop && state.activeIndex === 0;
      if (state.btnDisabled || cannotMovePrev) {
        move(state.activeIndex);
        return false;
      }
      stopAutoplay();
      state.activeIndex -= step;
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
      state.btnDisabled = true;
    };
    const next = (step = 1) => {
      const cannotMoveLast = !props?.loop && state.activeIndex === state.itemLength - 1;
      if (state.btnDisabled || cannotMoveLast) {
        move(state.activeIndex);
        return false;
      }
      stopAutoplay();
      state.activeIndex += step;
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
      state.btnDisabled = true;
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
      const { activeIndex, itemWidth, itemHight } = state;
      const distanceX = lengthX.value;
      const distanceY = lengthY.value;
      const _container = getContainer();
      removeAnimation();
      const toIndex = props?.loop ? activeIndex + 1 : activeIndex;
      if (props?.direction === 'horizontal') {
        setOffset(_container, -(toIndex * itemWidth + distanceX));
      } else {
        setOffset(_container, -(toIndex * itemHight + distanceY), 'Y');
      }
    };
    const onTouchEnd = () => {
      const distanceX = lengthX.value;
      const distanceY = lengthY.value;
      addAnimation();
      if (
        (props?.direction === 'horizontal' && distanceX < -100) ||
        (props?.direction === 'vertical' && distanceY < -100)
      ) {
        prev(1);
      } else if (
        (props?.direction === 'horizontal' && distanceX > 100) ||
        (props?.direction === 'vertical' && distanceY > 100)
      ) {
        next(1);
      } else {
        move(state.activeIndex);
      }
      startAutoplay();
    };
    const relation = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        state.children.push(child.proxy);
      }
    };
    provide('parent', {
      props,
      relation,
    });
    watch(
      () => props.current,
      (newPage, oldPage) => {
        if (state.isControl) {
          state.activeIndex = newPage || 0;
          addAnimation();
          move(state.activeIndex, false);
        }
      },
    );
    return {
      rootName,
      swiperHight,
      onItemClick,
      swiperContainer,
      name,
      navName,
      computedNavigation,
      onTouchMove,
      onTouchEnd,
      handleAnimationEnd,
      state,
      paginationList,
      showPageNum,
      prev,
      next,
    };
  },
});
</script>
