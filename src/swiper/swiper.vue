<template>
  <div ref="swiper" class="t-swiper">
    <div
      ref="swiperContainer"
      class="t-swiper-container"
      @transitionend='checkLast'
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <slot></slot>
    </div>
    <p>{{state.activeIndex}}</p>
    <span>
      <span @click="prev" class="swiperbtn btn-prev">
        <t-icon name="chevron-left" size="small"/>
      </span>
      <span @click="next" class="swiperbtn btn-next">
        <t-icon name="chevron-right" size="small"/>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ComponentInternalInstance, onMounted } from 'vue'
import SwiperProps from './props';
import { setOffset } from './tools';
export default defineComponent({
  name: 'Swiper',
  props: SwiperProps,
  setup(props, context) {
    const self = getCurrentInstance();
    
    const { autoplay, interval, duration } = props;
    const state: {
      activeIndex: number;
      itemLength: number;
      itemWidth: number;
    } = reactive({
      activeIndex: 0,
      itemLength: 0,
      itemWidth: 0,

    });
    // 获取容器节点（实时获取，才能获取到最新的节点）
    const getContainer = (): HTMLDivElement => {
      // return self?.refs.swiperContainer as HTMLDivElement;
      return self?.proxy?.$el.querySelector('.t-swiper-container');
    }
    // 初始化轮播图元素
    const initSwiper = () => {
      const _swiperContainer = getContainer();
      const items = _swiperContainer.querySelectorAll('.t-swiper-item');
      console.log(items);
      // 把第一个元素复制到最后面，以供循环轮播使用
      let first = items[0].cloneNode(true);
      _swiperContainer.appendChild(first);
    }
    
    // 勾子函数初始化部分数据
    onMounted(() => {
      console.log('组件实例', self);
      const _swiperContainer = getContainer();
      state.itemLength = _swiperContainer.children?.length || 0;
      state.itemWidth = document.querySelector('.t-swiper-item')?.getBoundingClientRect().width || 0;
      
      initSwiper();
      startAutoplay();
    })
    let autoplayTimer: NodeJS.Timeout | null = null;
    /**
     * 移动节点
     */
    const move = (targetIndex: number) => {
      const allItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.t-swiper-item') || [];
      const firstItem: HTMLDivElement = allItems[0];
      const _swiperContainer = getContainer();
      _swiperContainer.style.transform = `translateX(-${state.itemWidth * (targetIndex)}px)`;
    }
    // 添加动画
    const addAnimation = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.style.transition = `transform ${duration}ms`;
    }
    // 移除动画（轮播时用到）
    const removeAnimation = () => {
      const _swiperContainer = getContainer();
      _swiperContainer.style.transition = 'none'
    }
    //确认是否已经移动到最后一个元素，每次transitionend事件后即检查
    const checkLast = () => {
      if(state.activeIndex >= state.itemLength) {
        console.log('到了最后一个元素',state.activeIndex, state.itemLength);
        state.activeIndex = 0;
        removeAnimation();
        move(0);
      }
    }
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
        state.activeIndex ++;
        addAnimation();
        move(state.activeIndex);
      }, interval)
    }
    // 移动到上一个
    const prev = () => {
      stopAutoplay();
      state.activeIndex --;
      if(state.activeIndex < 0) {
        state.activeIndex = state.itemLength - 1;
      }
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
    }
    // 移动到下一个
    const next = () => {
      stopAutoplay();
      state.activeIndex ++;
      addAnimation();
      move(state.activeIndex);
      startAutoplay();
    }
    let touchStartX = 0;
    let touchStartY = 0;
    // 按下鼠标或屏幕开始滑动
    const onTouchStart = (event: TouchEvent) => {
      stopAutoplay();
      console.log('touch start', state?.itemLength);
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
    };
    // 滑动过程中位移容器
    const onTouchMove = (event: TouchEvent) => {
      console.log('touch move', );
      const { activeIndex, itemWidth } = state;
      const endY = event.changedTouches[0].clientY;
      const endX = event.changedTouches[0].clientX;
      const distanceX = endX - touchStartX;
      const _container = getContainer();
      removeAnimation();
      setOffset(_container, - activeIndex * itemWidth + distanceX);
    };
    // 放开手指或者鼠标，停止滑动，判断滑动量，如果不够回到原来的位置，否则按方向移动一个节点。
    const onTouchEnd = (event: TouchEvent) => {
      
      console.log('touch end', event);
      const endY = event.changedTouches[0].clientY;
      const endX = event.changedTouches[0].clientX;
      const distanceX = endX - touchStartX;
      addAnimation();
      if (distanceX > 100) {
        prev();
      } else if (distanceX < -100) {
        next();
      } else {
        move(state.activeIndex);
      }

      startAutoplay();
    };
    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      checkLast,
      state,
      prev,
      next,
    }
  },
  mounted() {

  }
})
</script>
<style lang="less" src="./swiper.less">
  
</style>