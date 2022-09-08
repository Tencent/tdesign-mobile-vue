<template>
  <div ref="containerWrapper" :class="`${name}__menu-wrapper`">
    <div
      :class="`${name}__menu-slider`"
      :style="wrapperStyle"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
    >
      <div v-for="(Items, i) in actionItems" :key="i" :class="`${name}__menu`">
        <t-grid :column="gridColumn">
          <t-grid-item
            v-for="(item, index) in Items"
            :key="index"
            :text="item.label"
            :image="item.icon"
            @click="handleSelected(i * count + index)"
          />
        </t-grid>
      </div>
    </div>
    <div v-if="pageNum > 1" :class="`${name}__indicator`">
      <div
        v-for="index in pageNum"
        :key="index"
        :class="{
          [`${name}__indicator-item`]: true,
          on: currentIndex === index - 1,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext, defineComponent, computed } from 'vue';
import config from '../config';
import { Grid as TGrid, GridItem as TGridItem } from '../grid';

const { prefix } = config;

const name = `${prefix}-action-sheet`;

export default defineComponent({
  components: { TGrid, TGridItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    count: {
      type: Number,
      default: 8,
    },
  },
  emits: ['selected'],
  setup(props, context: SetupContext) {
    const containerWrapper = ref<HTMLElement | null>(null);
    const moveOffset = ref(0);
    const currentIndex = ref(0);
    const useTransition = ref(true);
    let startX = 0;
    let startOffset = 0;
    let canMove = true;

    const wrapperStyle = computed(() => ({
      transform: `translate3d(${moveOffset.value}px, 0, 0)`,
      transition: useTransition.value ? 'transform 300ms' : 'all',
    }));
    const gridColumn = computed(() => Math.ceil(props.count / 2));
    const pageNum = computed(() => Math.ceil(props.items.length / props.count));
    // 分页数据处理
    const actionItems = computed(() => {
      const res: any = [];
      for (let i = 0; i < pageNum.value; i++) {
        const temp = props.items.slice(i * props.count, (i + 1) * props.count);
        res.push(temp);
      }
      return res;
    });

    const handleSelected = (index: number) => {
      context.emit('selected', index);
    };

    const moveByIndex = (index: number) => {
      useTransition.value = true;
      if (containerWrapper.value) {
        moveOffset.value = pageNum.value > 1 ? index * containerWrapper.value.offsetWidth * -1 : 0;
      }
    };

    // 滑动时的最大偏移
    const getMaxOffset = () => {
      if (!containerWrapper.value) return 0;

      return (pageNum.value - 1) * containerWrapper.value.offsetWidth;
    };

    const handleTouchstart = (e: TouchEvent) => {
      canMove = true;
      useTransition.value = false;
      startX = e.touches[0].clientX;
      startOffset = startX - moveOffset.value;
    };

    const handleTouchmove = (e: TouchEvent) => {
      const { clientX } = e.touches[0];
      const minOffset = 0;
      const maxOffset = getMaxOffset();

      if (Math.abs(clientX - startX) < 15) return;
      moveOffset.value = clientX - startOffset;

      // 滑动临界值判单
      if (moveOffset.value > minOffset) {
        moveOffset.value = minOffset;
        canMove = false;
      }
      if (Math.abs(moveOffset.value) >= maxOffset) {
        moveOffset.value = maxOffset * -1;
        canMove = false;
      }
    };
    const handleTouchend = (e: TouchEvent) => {
      if (!canMove) return;

      const distance = e.changedTouches[0].clientX - startX;
      const targetIndex = Math.abs(distance) > 50 ? currentIndex.value + (distance < 0 ? 1 : -1) : currentIndex.value;
      currentIndex.value = targetIndex;
      moveByIndex(targetIndex);
    };

    return {
      name: ref(name),
      gridColumn,
      pageNum,
      actionItems,
      currentIndex,
      containerWrapper,
      wrapperStyle,
      handleSelected,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
    };
  },
});
</script>
