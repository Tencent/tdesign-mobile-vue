<template>
  <div ref="indexesRoot" :class="componentName" @scroll="handleRootScroll">
    <div :class="`${componentName}__sidebar`" @touchstart="handleSidebarTouchstart" @touchmove="handleSidebarTouchmove">
      <div
        v-for="item in indexList"
        :key="item"
        :class="[
          `${componentName}__sidebar-item`,
          activeSidebar === item ? `${componentName}__sidebar-item--active` : '',
        ]"
        :data-index="item"
        @click.prevent="handleSidebarItemClick(item)"
      >
        {{ item }}
        <div v-if="showSidebarTip && activeSidebar === item" :class="`${componentName}__sidebar-tips`">
          {{ activeSidebar }}
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted, watchEffect, toRefs, onBeforeUnmount, provide } from 'vue';
import config from '../config';
import IndexesProps from './props';
import { useEmitEvent } from '../shared';

const { prefix } = config;

interface Touch {
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  offsetX: number;
  offsetY: number;
}
interface State {
  componentName: string;
  showSidebarTip: boolean;
  activeSidebar: string | number;
  activeIndex: number;
}

const touch: Touch = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
};

const componentName = `${prefix}-indexes`;

export default defineComponent({
  name: componentName,
  props: IndexesProps,
  emits: ['select'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    let timeOut: number;
    const indexesRoot = ref<HTMLElement>();
    const state: State = reactive({
      componentName,
      showSidebarTip: false,
      activeSidebar: '',
      activeIndex: -1,
    });

    const anchorGroup = ref<HTMLElement[]>([]);
    const setAnchorGroupRefs = (index: number) => {
      return (el: any) => {
        anchorGroup.value[index] = el as HTMLElement;
      };
    };

    const anchor = ref<any[]>([]);
    const anchorStyle = reactive<string[]>([]);
    const setAnchorRefs = (index: number) => {
      return (el: any) => {
        anchor.value[index] = el as HTMLElement;
      };
    };

    const scrollToView = (): void => {
      const children = anchorGroup.value;
      const targets = children.filter((ele) => {
        const { dataset } = ele;
        return dataset && dataset.index === state.activeSidebar;
      });
      targets[0]?.scrollIntoView?.();
    };

    const calcSticky = (indexesRootTop: number) => {
      const children = anchorGroup.value;
      for (let i = 0; i < children.length; i++) {
        const { top: childTop, width } = children[i].getBoundingClientRect();
        anchorStyle[i] = `z-index: ${i + 1};`;
        if (childTop < indexesRootTop && i === state.activeIndex) {
          anchorStyle[i] += `position:fixed;top:${indexesRootTop}px;width: ${width}px;`;
        } else {
          anchorStyle[i] += '';
        }
        const anchorHeight = anchor.value[i - 1]?.$el.getBoundingClientRect()?.height;
        const diff = childTop - indexesRootTop - anchorHeight;
        if (i - 1 === state.activeIndex && diff < 0) {
          anchorStyle[i - 1] += `transform: translateY(${diff}px)`;
        }
      }
    };

    const calcChildPosition = (scrollTop: number) => {
      const children = anchorGroup.value;
      let currentIndex = -1;
      for (let i = 0; i < children.length - 1; i++) {
        if (scrollTop < children[i + 1].offsetTop) {
          currentIndex = i;
          break;
        }
      }
      if (scrollTop >= children[children.length - 1].offsetTop) {
        currentIndex = children.length - 1;
      }
      state.activeIndex = currentIndex;
      state.activeSidebar = children[currentIndex].dataset.index ?? '';
    };

    const setActiveSidebarAndTip = (index: string | number) => {
      state.activeSidebar = index;
      state.showSidebarTip = true;
    };

    watchEffect(() => {
      if (state.showSidebarTip) {
        clearSidebarTip();
      }
    });

    const handleSidebarItemClick = (index: string | number) => {
      setActiveSidebarAndTip(index);
      scrollToView();
    };

    const handleSidebarTouchstart = (event: TouchEvent): void => {
      event.stopPropagation();
      const { touches } = event;
      touch.startX = touches[0].clientX;
      touch.startY = touches[0].clientX;
    };

    const handleSidebarTouchmove = (event: TouchEvent): void => {
      event.preventDefault();
      const { touches } = event;
      const { clientX, clientY } = touches[0];

      const target = document.elementFromPoint(clientX, clientY);
      if (target && target.className === `${componentName}__sidebar-item` && target instanceof HTMLElement) {
        const { index } = target.dataset;
        if (index !== undefined && state.activeSidebar !== index) {
          setActiveSidebarAndTip(index);
          scrollToView();
        }
      }
    };

    const handleRootScroll = (e: UIEvent) => {
      if (indexesRoot.value) {
        calcChildPosition(indexesRoot.value.scrollTop);
        if (props.sticky) {
          const indexesRootTop = indexesRoot.value?.getBoundingClientRect()?.top ?? 0;
          calcSticky(indexesRootTop);
        }
      }
    };

    const clearSidebarTip = (): void => {
      if (state.showSidebarTip && state.activeSidebar) {
        timeOut && clearTimeout(timeOut);
        timeOut = window.setTimeout(() => {
          state.showSidebarTip = false;
        }, 1000);
      }
    };

    const handleCellClick = (indexes: { groupIndex: string; childrenIndex: number }) => {
      emitEvent('select', indexes);
    };

    onMounted(() => {
      const children = anchorGroup.value;
      if (children.length > 0) {
        const { index } = children[0].dataset;
        if (index !== undefined) {
          state.activeSidebar = index;
        }
      }
    });

    onBeforeUnmount(() => {
      timeOut && clearTimeout(timeOut);
    });

    provide('indexesProvide', {
      ...props,
    });

    return {
      ...toRefs(state),
      indexesRoot,
      anchorGroup,
      anchorStyle,
      setAnchorGroupRefs,
      setAnchorRefs,
      handleSidebarItemClick,
      handleSidebarTouchmove,
      handleSidebarTouchstart,
      handleRootScroll,
      handleCellClick,
    };
  },
});
</script>
