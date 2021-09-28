<template>
  <div ref="swiper" :style="{height: height, overflow: 'hidden'}" :class="`${name}`">
    <div
      ref="swiperContainer"
      :class="`${name}-container`"
      :style="{
        height: height,
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        height: '180px'
      }"
      @transitionend='handleAnimationEnd'
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <slot></slot>
    </div>
    <!-- 左右侧的按钮 -->
    <span v-if="direction === 'horizontal' && navigation?.showSlideBtn">
      <span @click="prev" class="t-swiper-btn btn-prev">
        <t-icon size="12px" name="chevron-left" />
      </span>
      <span @click="next" class="t-swiper-btn btn-next">
        <t-icon size="12px" name="chevron-right" />
      </span>
    </span>
    <!-- 分页器 -->
    <span v-if="navigation.type" :class="`${name}-pagination ${name}-pagination--${navigation.type}`">
      <template v-if="navigation.type === 'bullets'">
        <span
          :class="{[`${name}-pagination-dot`]: true, active: index === state.activeIndex}"
          v-for="(item, index) in paginationList"
          :key="'page' + index"></span>
      </template>
      <span v-if="navigation.type === 'fraction'">
        {{showPageNum +  '/' + state.itemLength}}
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, onMounted, computed } from 'vue';
import SwiperProps from './props';
import { setOffset } from './tools';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-swiper`;
export default defineComponent({
  name,
  props: SwiperProps,
  setup(props, context) {
    const self = getCurrentInstance();
    const { autoplay, interval, duration, direction = 'horizontal', height = 180 } = props;
    const state: {
      activeIndex: number;
      itemLength: number;
      itemWidth: number;
    } = reactive({
      activeIndex: 0,
      itemLength: 0,
      itemWidth: 0,

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
    const getContainer = (): HTMLDivElement => self?.proxy?.$el.querySelector('.t-swiper-container');
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
      // console.log('组件实例', self);
      const _swiperContainer = getContainer();
      state.itemLength = _swiperContainer.children?.length || 0;
      const itemWidth = document.querySelector('.t-swiper-item')?.getBoundingClientRect().width || 0;
      state.itemWidth = itemWidth;

      initSwiper();
      startAutoplay();
    });
    let autoplayTimer: NodeJS.Timeout | null = null;
    /**
     * 移动节点
     */
    const move = (targetIndex: number) => {
      // const allItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.t-swiper-item') || [];
      // const firstItem: HTMLDivElement = allItems[0];
      const _swiperContainer = getContainer();
      const moveDirection = direction === 'horizontal' ? 'X' : 'Y';
      const moveLength = direction === 'vertical' ? height : state.itemWidth;
      _swiperContainer.style.transform = `translate${moveDirection}(-${moveLength * (targetIndex + 1)}px)`;
    };
    // 添加动画
    const addAnimation = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.style.transition = `transform ${duration}ms`;
    };
    // 移除动画（轮播时用到）
    const removeAnimation = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.style.transition = 'none';
    };
    // 确认是否已经移动到最后一个元素，每次transitionend事件后即检查
    const handleAnimationEnd = () => {
      if (state.activeIndex >= state.itemLength) {
        // console.log('到了最后一个元素', state.activeIndex, state.itemLength);
        state.activeIndex = 0;
        removeAnimation();
        move(0);
      }
      if (state.activeIndex <= -1) {
        // console.log('到了第一个元素', state.activeIndex, state.itemLength);
        state.activeIndex = state.itemLength - 1;
        removeAnimation();
        move(state.itemLength - 1);
      }
      context.emit('change', state.activeIndex);
    };
    // 停止自动播放
    const stopAutoplay = () => {
      if (!autoplayTimer) return;
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    };
    // 自动播放
    const startAutoplay = () => {
      if (!autoplay || autoplayTimer !== null) return false; // 防止多次创建定时器
      autoplayTimer = setInterval(() => {
        state.activeIndex += 1;
        addAnimation();
        move(state.activeIndex);
      }, interval);
    };
    // 移动到上一个
    const prev = () => {
      stopAutoplay();
      state.activeIndex -= 1;
      // if (state.activeIndex < 0) {
      //   state.activeIndex = state.itemLength - 1;
      // }
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
    };
    // 移动到下一个
    const next = () => {
      stopAutoplay();
      state.activeIndex += 1;
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
    };
    let touchStartX = 0;
    let touchStartY = 0;
    // 按下鼠标或屏幕开始滑动
    const onTouchStart = (event: TouchEvent) => {
      stopAutoplay();
      // console.log('touch start', state?.itemLength);
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
    };
    // 滑动过程中位移容器
    const onTouchMove = (event: TouchEvent) => {
      // console.log('touch move');
      const { activeIndex, itemWidth } = state;
      const endY = event.changedTouches[0].clientY;
      const endX = event.changedTouches[0].clientX;
      const distanceX = endX - touchStartX;
      const distanceY = endY - touchStartY;
      const _container = getContainer();
      removeAnimation();
      if (direction === 'horizontal') {
        setOffset(_container, -((activeIndex + 1) * itemWidth - distanceX));
      } else {
        setOffset(_container, -((activeIndex + 1) * height - distanceY), 'Y');
      }
    };
    // 放开手指或者鼠标，停止滑动，判断滑动量，如果不够回到原来的位置，否则按方向移动一个节点。
    const onTouchEnd = (event: TouchEvent) => {
      // console.log('touch end', event);
      const endY = event.changedTouches[0].clientY;
      const endX = event.changedTouches[0].clientX;
      const distanceX = endX - touchStartX;
      const distanceY = endY - touchStartY;
      addAnimation();
      if ((direction === 'horizontal' && distanceX > 100) || (direction === 'vertical' && distanceY > 100)) {
        prev();
      } else if ((direction === 'horizontal' && distanceX < -100) || (direction === 'vertical' && distanceY < -100)) {
        next();
      } else {
        move(state.activeIndex);
      }
      startAutoplay();
    };
    return {
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
