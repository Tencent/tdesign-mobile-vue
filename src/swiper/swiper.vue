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
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <slot></slot>
    </div>
    <template v-if="navigation">
      <!-- 左右侧的按钮 -->
      <span v-if="direction === 'horizontal' && navigation.showSlideBtn">
        <span :class="`${name}__btn btn-prev`" @click="prev(1)">
          <chevron-left-icon size="20px" />
        </span>
        <span :class="`${name}__btn btn-next`" @click="next(1)">
          <chevron-right-icon size="20px" />
        </span>
      </span>
      <!-- 分页器 -->
      <span v-if="navigation.type" :class="`${name}__pagination ${name}__pagination-${navigation.type}`">
        <template v-if="['dots', 'dots-bar'].includes(navigation.type)">
          <span
            v-for="(item, index) in paginationList"
            :key="'page' + index"
            :class="{ [`${name}-dot`]: true, [`${name}-dot--active`]: index === state.activeIndex }"
          ></span>
        </template>
        <span v-if="navigation.type === 'fraction'">
          {{ showPageNum + '/' + state.itemLength }}
        </span>
      </span>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, onMounted, computed, watch, ref, SetupContext } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import SwiperProps from './props';
import config from '../config';
import { useDefault, useEmitEvent } from '../shared';
import { TdSwiperProps } from './type';

const { prefix } = config;
const name = `${prefix}-swiper`;
const setOffset = (element: HTMLDivElement, offset: number, direction = 'X'): void => {
  // eslint-disable-next-line no-param-reassign
  element.style.transform = `translate${direction}(${offset}px)`;
};
export default defineComponent({
  name,
  components: { ChevronLeftIcon, ChevronRightIcon },
  props: SwiperProps,
  emits: ['change', 'update:current', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const [swiperValue, setSwiperValue] = useDefault<Number, TdSwiperProps>(props, context.emit, 'current', 'change');
    const self = getCurrentInstance();
    const swiperContainer = ref(null);
    // const { height = 180, current = null } = props;
    const height = props.height || 180;
    const state: {
      activeIndex: number;
      itemLength: number;
      itemWidth: number;
      isControl: boolean;
      btnDisabled: boolean;
    } = reactive({
      activeIndex: 0,
      itemLength: 0,
      itemWidth: 0,
      isControl: false,
      btnDisabled: false,
    });
    // 分页数组--任意数组，用于循环分页点
    const paginationList = computed(() => new Array(state.itemLength).fill(1));
    // 限制的分页值（hike循环播放添加的节点数量）
    const showPageNum = computed(() => {
      const { activeIndex, itemLength } = state;
      if (activeIndex > itemLength - 1) return itemLength;
      if (activeIndex < 0) return 1;
      return activeIndex + 1;
    });
    // 获取容器节点（实时获取，才能获取到最新的节点）
    const getContainer = (): HTMLDivElement => self?.proxy?.$el.querySelector('.t-swiper__container');
    // const getContainer = (): HTMLDivElement => swiperContainer.value as any;
    // 初始化轮播图元素
    const initSwiper = () => {
      const _swiperContainer = getContainer();
      const items = _swiperContainer.querySelectorAll('.t-swiper-item');
      const first = items[0].cloneNode(true);
      const last = items[items.length - 1].cloneNode(true);
      // 把第一个元素复制到最后面，以供循环轮播使用
      _swiperContainer.appendChild(first);
      // 把最后一个元素复制到最前面
      _swiperContainer.insertBefore(last, items[0]);
      // 默认前移一格(因为前面增加了最后一个元素)
      move(0);
    };

    // 勾子函数初始化部分数据
    onMounted(() => {
      const _swiperContainer = getContainer();
      state.itemLength = _swiperContainer.children?.length || 0;
      const itemWidth = _swiperContainer.querySelector('.t-swiper-item')?.getBoundingClientRect().width || 0;
      state.itemWidth = itemWidth;
      initSwiper();
      startAutoplay();
      if (typeof props.current === 'number') {
        state.isControl = true;
        next(props.current);
      }
    });
    // eslint-disable-next-line no-undef
    let autoplayTimer: number | NodeJS.Timeout | null = null;
    let actionIsTrust = true;
    /**
     * 移动节点
     */
    const move = (targetIndex: number, isTrust = true) => {
      const _swiperContainer = getContainer();
      const moveDirection = props?.direction === 'horizontal' ? 'X' : 'Y';
      const moveLength: number = props?.direction === 'vertical' ? height : state.itemWidth;
      actionIsTrust = isTrust;
      _swiperContainer.dataset.isTrust = `${isTrust}`;
      _swiperContainer.style.transform = `translate${moveDirection}(-${moveLength * (targetIndex + 1)}px)`;
    };
    // 添加动画
    const addAnimation = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.style.transition = `transform ${props?.duration}ms`;
    };
    // 移除动画（轮播时用到）
    const removeAnimation = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.style.transition = 'none';
    };
    // 确认是否已经移动到最后一个元素，每次transitionend事件后即检查
    const handleAnimationEnd = () => {
      state.btnDisabled = false;
      removeAnimation();
      if (state.activeIndex >= state.itemLength) {
        // console.log('到了最后一个元素', state.activeIndex, state.itemLength);
        state.activeIndex = 0;
        move(0);
      }
      if (state.activeIndex <= -1) {
        // console.log('到了第一个元素', state.activeIndex, state.itemLength);
        state.activeIndex = state.itemLength - 1;
        move(state.itemLength - 1);
      }
      setTimeout(() => {
        actionIsTrust && emitCurrentChange(state.activeIndex);
      }, 0);
    };
    // 停止自动播放
    const stopAutoplay = () => {
      if (!autoplayTimer) return;
      clearInterval(autoplayTimer as number);
      autoplayTimer = null;
    };
    // 自动播放
    const startAutoplay = () => {
      // 如果是受控组件，永远不自动播放
      if (typeof props.current === 'number') return false;
      if (!props?.autoplay || autoplayTimer !== null) return false; // 防止多次创建定时器
      autoplayTimer = setInterval(() => {
        state.activeIndex += 1;
        addAnimation();
        move(state.activeIndex);
      }, props?.interval);
    };
    // 通知父组件更新页数（受控模式）
    const emitCurrentChange = (index: number) => {
      if (!state.isControl) return false;
      let resultIndex = index;
      if (index >= state.itemLength) resultIndex = 0;
      if (index < 0) resultIndex = state.itemLength - 1;
      emitEvent('change', resultIndex);
    };
    // 移动到上一个
    const prev = (step = 1) => {
      if (state.btnDisabled) return false;
      stopAutoplay();
      state.activeIndex -= step;
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
      state.btnDisabled = true;
    };
    // 移动到下一个
    const next = (step = 1) => {
      if (state.btnDisabled) return false;
      stopAutoplay();
      state.activeIndex += step;
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
      state.btnDisabled = true;
    };
    let touchStartX = 0;
    let touchStartY = 0;
    // 按下鼠标或屏幕开始滑动
    const onTouchStart = (event: TouchEvent) => {
      stopAutoplay();
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
    };
    // 滑动过程中位移容器
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const { activeIndex, itemWidth } = state;
      const endY = event.changedTouches[0].clientY;
      const endX = event.changedTouches[0].clientX;
      const distanceX = endX - touchStartX;
      const distanceY = endY - touchStartY;
      const _container = getContainer();
      removeAnimation();
      if (props?.direction === 'horizontal') {
        setOffset(_container, -((activeIndex + 1) * itemWidth - distanceX));
      } else {
        const { height = 180 } = props;
        setOffset(_container, -((activeIndex + 1) * height - distanceY), 'Y');
      }
    };
    // 放开手指或者鼠标，停止滑动，判断滑动量，如果不够回到原来的位置，否则按方向移动一个节点。
    const onTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0].clientY;
      const endX = event.changedTouches[0].clientX;
      const distanceX = endX - touchStartX;
      const distanceY = endY - touchStartY;
      addAnimation();
      if (
        (props?.direction === 'horizontal' && distanceX > 100) ||
        (props?.direction === 'vertical' && distanceY > 100)
      ) {
        prev(1);
      } else if (
        (props?.direction === 'horizontal' && distanceX < -100) ||
        (props?.direction === 'vertical' && distanceY < -100)
      ) {
        next(1);
      } else {
        move(state.activeIndex);
      }
      startAutoplay();
    };
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
      onTouchStart,
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
