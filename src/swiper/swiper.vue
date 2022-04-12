<template>
  <div :style="{ height: `${height}px`, overflow: 'hidden' }" :class="`${name}`">
    <div
      ref="swiperContainer"
      :class="`${name}__container`"
      :style="{
        height: `${height}px`,
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
      }"
      @transitionend="handleAnimationEnd"
    >
      <slot></slot>
    </div>
    <template v-if="navigation">
      <span v-if="direction === 'horizontal' && 'showSlideBtn' in navigation && navigation.showSlideBtn">
        <span :class="`${name}__btn btn-prev`" @click="prev(1)">
          <chevron-left-icon size="20px" />
        </span>
        <span :class="`${name}__btn btn-next`" @click="next(1)">
          <chevron-right-icon size="20px" />
        </span>
      </span>
      <span v-if="'type' in navigation" :class="`${name}__pagination ${name}__pagination-${navigation.type || ''}`">
        <template v-if="['dots', 'dots-bar'].includes(navigation.type || '')">
          <span
            v-for="(item, index) in state.children.length"
            :key="'page' + index"
            :class="{ [`${name}-dot`]: true, [`${name}-dot--active`]: index === state.activeIndex }"
          ></span>
        </template>
        <span v-if="navigation.type && navigation.type === 'fraction'">
          {{ showPageNum + '/' + state.children.length }}
        </span>
      </span>
    </template>
    <template v-if="computedNavigation !== undefined">
      <t-node :content="computedNavigation" :style="{}"></t-node>
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
  SetupContext,
  nextTick,
  provide,
  ComponentInternalInstance,
  ComponentPublicInstance,
} from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import { SwipeDirection, useSwipe } from '@vueuse/core';
import SwiperProps from './props';
import config from '../config';
import { renderTNode, useDefault, TNode } from '../shared';
import { TdSwiperProps } from './type';

const { prefix } = config;
const name = `${prefix}-swiper`;
const setOffset = (element: HTMLDivElement, offset: number, direction = 'X'): void => {
  // eslint-disable-next-line no-param-reassign
  element.style.transform = `translate${direction}(${offset}px)`;
};
export default defineComponent({
  name,
  components: { ChevronLeftIcon, ChevronRightIcon, TNode },
  props: SwiperProps,
  emits: ['change', 'update:current', 'update:modelValue'],
  setup(props, context: SetupContext) {
    // const emitEvent = useEmitEvent(props, context.emit);
    const [swiperValue, setSwiperValue] = useDefault<Number, TdSwiperProps>(props, context.emit, 'current', 'change');
    const self = getCurrentInstance();
    const swiperContainer = ref<HTMLElement | null>(null);
    const computedNavigation = computed(() => renderTNode(self, 'navigation'));
    // const { height = 180, current = null } = props;
    const height = props.height || 180;
    const state: {
      activeIndex: number;
      itemLength: number;
      itemWidth: number;
      isControl: boolean;
      btnDisabled: boolean;
      children: ComponentPublicInstance[];
    } = reactive({
      activeIndex: 0,
      itemLength: 0,
      itemWidth: 0,
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
    const childCount = computed(() => state.children.length);
    const getContainer = (): HTMLDivElement => self?.proxy?.$el.querySelector('.t-swiper__container');
    // const getContainer = (): HTMLDivElement => swiperContainer.value as any;
    const initSwiper = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.querySelectorAll('.copy-item').forEach((ele) => {
        _swiperContainer.removeChild(ele);
      });
      const items = _swiperContainer.querySelectorAll('.t-swiper-item');
      state.itemLength = _swiperContainer.children?.length || 0;
      const itemWidth = _swiperContainer.querySelector('.t-swiper-item')?.getBoundingClientRect().width || 0;
      state.itemWidth = itemWidth;
      if (items.length <= 0) return false;
      const first = items[0].cloneNode(true) as HTMLDivElement;
      first.classList.add('copy-item');
      const last = items[items.length - 1].cloneNode(true) as HTMLDivElement;
      last.classList.add('copy-item');
      _swiperContainer.appendChild(first);
      _swiperContainer.insertBefore(last, items[0]);
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
    /**
     * move item
     */
    const move = (targetIndex: number, isTrust = true) => {
      const _swiperContainer = getContainer();
      const moveDirection = props?.direction === 'horizontal' ? 'X' : 'Y';
      const moveLength: number = props?.direction === 'vertical' ? height : state.itemWidth;
      actionIsTrust = isTrust;
      _swiperContainer.dataset.isTrust = `${isTrust}`;
      _swiperContainer.style.transform = `translate${moveDirection}(-${moveLength * (targetIndex + 1)}px)`;
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
        addAnimation();
        move(state.activeIndex);
      }, props?.interval);
    };
    const emitCurrentChange = (index: number) => {
      if (!state.isControl) return false;
      let resultIndex = index;
      if (index >= state.itemLength) resultIndex = 0;
      if (index < 0) resultIndex = state.itemLength - 1;
      // emitEvent('change', resultIndex);
      setSwiperValue(resultIndex);
    };
    const prev = (step = 1) => {
      if (state.btnDisabled) return false;
      stopAutoplay();
      state.activeIndex -= step;
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
      state.btnDisabled = true;
    };
    const next = (step = 1) => {
      if (state.btnDisabled) return false;
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
      const { activeIndex, itemWidth } = state;
      const distanceX = lengthX.value;
      const distanceY = lengthY.value;
      const _container = getContainer();
      removeAnimation();
      if (props?.direction === 'horizontal') {
        setOffset(_container, -((activeIndex + 1) * itemWidth + distanceX));
      } else {
        const { height = 180 } = props;
        setOffset(_container, -((activeIndex + 1) * height + distanceY), 'Y');
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
      swiperContainer,
      name,
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
