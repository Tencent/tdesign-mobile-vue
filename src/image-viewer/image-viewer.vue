<template>
  <div v-show="showViewer" :class="`${prefix}-image-viewer`">
    <div :class="`${prefix}-image-mask`" :style="{ background: backgroundColor }"></div>
    <div class="image-viewer-container">
      <div
        :ref="myRef"
        :class="classes"
        @touchstart="onTouchstart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <div :class="`${prefix}-swiper-box`">
          <div :class="`${prefix}-swiper-container`">
            <div
              v-for="(item, itemIndex) in images"
              :key="itemIndex"
              :class="`${prefix}-swiper-item image-viewer-item-wrap`"
            >
              <div class="item">
                <img :src="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showIndex" class="image-viewer-index">{{ index }}/{{ count > 2 ? count - 2 : count }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, defineComponent, reactive, watch, nextTick, PropType } from 'vue';
import config from '../config';
import { DragState } from './image-viewer.interface';

const { prefix } = config;
const name = `${prefix}-image-viewer`;

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6)',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const classes = computed(() => [`${name}`]);
    const dragState: DragState = reactive({
      startTime: new Date().getTime(),
      startLeft: -1,
      startTop: -1,
      itemWidth: -1,
      itemHeight: -1,
      currentLeft: -1,
      currentTop: -1,
    });

    let eleSwiper: HTMLDivElement;
    const images = ref(props.images);
    const index = ref(Math.min(props.initialIndex, images.value.length - 1) + 1);
    const count = ref(images.value.length);
    const PAGING_DURATION = 300;
    const PAGING_SCALE = 0.5;

    let element: HTMLDivElement;

    const myRef = (el: any) => {
      element = el;
    };
    const showViewer = computed(() => props.modelValue || props.visible);
    watch([() => props.images, () => props.initialIndex], () => {
      images.value = props.images;
      index.value = Math.min(props.initialIndex, images.value.length - 1) + 1;
      if (!showViewer.value) {
        return;
      }
      nextTick(() => {
        eleSwiper = element.querySelector(`.${prefix}-swiper-container`) as HTMLDivElement;
        initNode();
      });
    });
    function initNode() {
      const clientWidth = `${element.clientWidth}px`;
      const container = element.querySelector(`.${prefix}-swiper-container`) as HTMLDivElement;
      const children = container.querySelectorAll(`.${prefix}-swiper-item`) as NodeListOf<HTMLDivElement>;
      children.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.style.width = clientWidth;
      });
      if (children.length >= 1) {
        const firstNodeCopy = container.querySelector(`.${prefix}-swiper-item-first-copy`);
        const lastNodeCopy = container.querySelector(`.${prefix}-swiper-item-last-copy`);
        if (firstNodeCopy && container.lastElementChild === firstNodeCopy) {
          container.removeChild(firstNodeCopy);
        }
        if (lastNodeCopy && container.firstElementChild === lastNodeCopy) {
          container.removeChild(lastNodeCopy);
        }
        let firstNode = container.firstElementChild as HTMLDivElement;
        firstNode = firstNode.cloneNode(true) as HTMLDivElement;
        let lastNode = container.lastElementChild as HTMLDivElement;
        lastNode = lastNode.cloneNode(true) as HTMLDivElement;
        firstNode.classList.add(`${prefix}-swiper-item-first-copy`);
        lastNode.classList.add(`${prefix}-swiper-item-last-copy`);
        firstNode.style.width = clientWidth;
        lastNode.style.width = clientWidth;
        container.appendChild(firstNode);
        container.insertBefore(lastNode, container.firstElementChild);
        count.value = images.value.length + 2;
        setTransform(-element.clientWidth * index.value);
      }
    }
    function setTransform(left: number) {
      eleSwiper.style.transform = `translate3d(${left}px, 0px, 0px) scale(1)`;
    }
    function getPoint(event: TouchEvent) {
      const point: Touch = (event as TouchEvent).changedTouches[0];
      return point;
    }
    let moveLock = true;
    const onTouchstart = (event: TouchEvent) => {
      const point = getPoint(event);
      dragState.startTime = new Date().getTime();
      dragState.startLeft = point.pageX;
      dragState.startTop = point.pageY;
      dragState.itemWidth = element.offsetWidth;
      dragState.itemHeight = element.offsetHeight;
      if (count.value <= 1) {
        return;
      }
      moveLock = false;
      eleSwiper.style.transition = 'none';
    };
    const onTouchMove = (event: TouchEvent) => {
      if (count.value <= 3 || moveLock) {
        return;
      }
      const point = getPoint(event);
      dragState.currentLeft = point.pageX;
      dragState.currentTop = point.pageY;
      const offsetLeft = dragState.currentLeft - dragState.startLeft;
      const offsetTop = dragState.currentTop - dragState.startTop;
      event.preventDefault();
      const isVertical = false;
      const newOffsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1);
      const newOffsetTop = Math.min(Math.max(-dragState.itemHeight + 1, offsetTop), dragState.itemHeight - 1);
      const offset = isVertical
        ? newOffsetTop - dragState.itemHeight * index.value
        : newOffsetLeft - dragState.itemWidth * index.value;
      setTransform(offset);
    };
    const onTouchEnd = (event: TouchEvent) => {
      const point = getPoint(event);
      if (dragState.startLeft === point.pageX) {
        moveLock = true;
        context.emit('update:modelValue', false);
        return;
      }
      if (count.value <= 3 || moveLock) {
        return;
      }
      moveLock = true;
      const dragDuration = Math.min(new Date().getTime() - dragState.startTime, 500);
      const offsetLeft = dragState.currentLeft - dragState.startLeft;
      const { itemWidth } = dragState;
      const isFastDrag = dragDuration < PAGING_DURATION;
      let action = '';
      if (isFastDrag && dragState.currentLeft === -1) {
        return;
      }
      if (Math.abs(offsetLeft) > itemWidth * PAGING_SCALE || isFastDrag) {
        if (offsetLeft < 0) {
          setTransform(-element.clientWidth * (index.value + 1));
          // index.value += 1;
          action = 'next';
        } else {
          setTransform(-element.clientWidth * (index.value - 1));
          // index.value -= 1;
          action = 'prev';
        }
      } else {
        setTransform(-element.clientWidth * index.value);
      }
      eleSwiper.style.transition = `${dragDuration / 1000}s`;

      setTimeout(() => {
        if (action) {
          action === 'next' ? (index.value += 1) : (index.value -= 1);
        }
        // 翻到最后一个
        if (index.value === count.value - 1) {
          index.value = 1;
          // 翻到第一个
        } else if (index.value === 0) {
          index.value = count.value - 2;
        }
        context.emit('change', index.value - 1);
        setTransform(-element.clientWidth * index.value);
        eleSwiper.style.transition = 'none';
      }, dragDuration);
      Object.assign(dragState, {
        startTime: new Date().getTime(),
        startLeft: 0,
        startTop: 0,
        itemWidth: 0,
        itemHeight: 0,
        currentLeft: 0,
        currentTop: 0,
      });
    };
    return {
      prefix,
      showViewer,
      index,
      count,
      myRef,
      classes,
      ...toRefs(props),
      onTouchstart,
      onTouchMove,
      onTouchEnd,
    };
  },
});
</script>
