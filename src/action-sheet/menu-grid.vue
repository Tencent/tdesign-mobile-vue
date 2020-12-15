<template>
  <div :class="`${name}__menu-wrapper`" ref="containerWrapper">
    <div
      :class="`${name}__menu-slider`"
      :style="wrapperStyle"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
    >
      <div :class="`${name}__menu`" v-for="(items, i) in actionItems" :key="i">
        <div>
          <button
            v-for="(item, index) in items"
            :key="index"
            :class="`${name}__cell`"
            :disabled="item.disabled"
            @click="handleSelect(index)"
          >
            <slot name="cell" :item="item">
              <div
                v-if="item.icon"
                :class="`${name}__cell-icon`"
                :style="{backgroundImage: `url(${item.icon})`}"
              />
              <div :class="`${name}__cell-text`" :style="{color: item.color}">{{ item.label }}</div>
            </slot>
          </button>
        </div>
      </div>

    </div>
    <div :class="`${name}__indicator`" v-if="pageNum > 1">
      <div :class="{
        [`${name}__indicator-item`]: true,
        on: currentIndex === index -1,
      }" v-for="index in pageNum" :key="index"></div>
    </div>

  </div>
</template>

<script lang="ts">
import { ref, SetupContext, defineComponent, computed } from 'vue';
import config from '../config';

const { prefix } = config;

const name = `${prefix}-action-sheet`;

export default defineComponent({
  props: ['items', 'count'],
  setup(props, context: SetupContext) {
    const containerWrapper = ref<HTMLElement | null>(null);
    const moveOffset = ref(0);
    const currentIndex = ref(0);
    const useTransition = ref(true);
    let startX = 0;
    let startOffset = 0;
    let canMove = true;

    const currentVisible = computed(() => props.modelValue || props.visible);
    const wrapperStyle = computed(() => ({
      transform: `translate3d(${moveOffset.value}px, 0, 0)`,
      transition: useTransition.value ? 'transform 300ms' : null,
    }));
    const pageNum = computed(() => Math.ceil(props.items.length / props.count));
    const actionItems = computed(() => {
      const res = [];
      for (let i = 0; i < pageNum.value; i++) {
        const temp = props.items.slice(i * props.count, (i + 1) * props.count);
        res.push(temp);
      }

      return res;
    });

    const handleSelect = (index) => {
      context.emit('select', index);
    };

    const moveByIndex = (index) => {
      useTransition.value = true;
      moveOffset.value = pageNum.value > 1 ? index * containerWrapper.value.offsetWidth * -1 : 0;
    };

    const getMaxOffset = () => (pageNum.value - 1) * containerWrapper.value.offsetWidth;

    const handleTouchstart = (e: TouchEvent) => {
      canMove = true;
      useTransition.value = false;
      startX = e.touches[0].clientX;
      startOffset = startX - moveOffset.value;
    };

    const handleTouchmove = (e: TouchEvent) => {
      const { clientX } = e.touches[0];
      if (Math.abs(clientX - startX) < 15) return;
      moveOffset.value = clientX - startOffset;

      // 滑动临界值判单
      if (moveOffset.value > 0) {
        moveOffset.value = 0;
        canMove = false;
      }
      if (Math.abs(moveOffset.value) >= getMaxOffset()) {
        moveOffset.value = getMaxOffset() * -1;
        canMove = false;
      }
    };
    const handleTouchend = (e: TouchEvent) => {
      if (!canMove) return;

      const distance = e.changedTouches[0].clientX - startX;
      const targetIndex = Math.abs(distance) > 50
        ? currentIndex.value + (distance < 0 ? 1 : -1)
        : currentIndex.value;
      currentIndex.value = targetIndex;
      moveByIndex(targetIndex);
    };

    return {
      name: ref(name),
      pageNum,
      actionItems,
      currentIndex,
      containerWrapper,
      currentVisible,
      wrapperStyle,
      handleSelect,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
    };
  },
});
</script>
