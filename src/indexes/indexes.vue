<template>
  <div
    ref="indexesRoot"
    :class="state.componentName"
    @touchstart="handleRootTouchstart"
    @touchend="handleRootTouchend"
    @scroll="handleRootScroll"
  >
    <div
      v-if="state.indexList.length > 0"
      :class="`${state.componentName}__sidebar`"
      @touchstart="handleSidebarTouchstart"
      @touchmove="handleSidebarTouchmove"
    >
      <div
        v-for="item in state.indexList"
        :key="item"
        :class="[
          `${state.componentName}__sidebar-item`,
          state.currentSidebar === item ? `${state.componentName}__sidebar-item--active` : '',
        ]"
        :data-index="item"
        @click.prevent="handleSidebarItemClick(item)"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="state.showCurrentSidebar" :class="`${state.componentName}__current`">
      {{ state.currentSidebar }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, PropType, onMounted, watchEffect } from 'vue';
import config from '../config';
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
  indexList: Array<string>;
  children: Array<Record<string, unknown>>;
  showCurrentSidebar: boolean;
  currentSidebar: string;
}

const touch: Touch = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
};

let children: Array<HTMLElement> = [];
const componentName = `${prefix}-indexes`;

export default defineComponent({
  props: {
    indexList: {
      type: Array as PropType<Array<string>>,
      default: [],
    },
  },
  setup(props) {
    let timeOut: number;
    let cacheTimer: number;
    let rootScrollMask = false;
    const indexesRoot = ref<null | HTMLElement>(null);
    const state: State = reactive({
      componentName,
      indexList: props.indexList,
      showCurrentSidebar: false,
      currentSidebar: '',
      children: [],
    });

    const inertiaScroll = () => {
      const target: null | HTMLElement = indexesRoot?.value
      const { scrollTop } = target || { scrollTop: 0 }
      cacheTimer && clearTimeout(cacheTimer)
      cacheTimer = window.setTimeout(() => {
        const currentTarget = indexesRoot?.value
        const { scrollTop: currentScrollTop } = currentTarget || { scrollTop: 0 }
        if(scrollTop === currentScrollTop){
          // 停止滚动
        } else {
          // 继续滚动
          inertiaScroll()
          calcChildPosition(scrollTop)
        }
      }, 100)
    }

    const scrollToView = (): void => {
      const targets = children.filter((ele: HTMLElement) => {
        const { dataset } = ele;
        return dataset && dataset.index === state.currentSidebar;
      });
      targets?.[0].scrollIntoView();
    };

    const calcChildPosition = (scrollTop: number) => {
      const children = getTitleNode();
      let currentTarget = '';
      children.forEach((ele) => {
        const { offsetTop, clientHeight } = ele;
        const targetClientVertical = offsetTop - clientHeight;
        if (currentTarget === '' && targetClientVertical > 0) {
          currentTarget = children[0].dataset.index ?? '';
        } else if (targetClientVertical < scrollTop) {
          currentTarget = ele.dataset.index ?? '';
        }
      });

      setCurrentSidebar(currentTarget);
    }

    const getTitleNode = () =>
      Array.from(document.getElementsByClassName(`${componentName}__anchor`)).filter(
        (x): x is HTMLElement => x instanceof HTMLElement,
      );

    const setCurrentSidebar = (index: string) => {
      state.currentSidebar = index;
      state.showCurrentSidebar = true;
    };

    watchEffect(() => {
      if (state.showCurrentSidebar) {
        clearCurrentSidebarToast();
      }
    });

    onMounted(() => {
      children = getTitleNode();
      if (children) {
        const { index } = children[0].dataset;
        if (index !== undefined) {
          state.currentSidebar = index;
        }
      }
    });

    const handleSidebarItemClick = (index: string) => {
      setCurrentSidebar(index);
      scrollToView();
    };

    const handleSidebarTouchstart = (event: TouchEvent): void => {
      const { touches } = event;
      touch.startX = touches[0].clientX;
      touch.startY = touches[0].clientX;
    };

    const handleSidebarTouchmove = (event: TouchEvent): void => {
      const { touches } = event;
      const { clientX, clientY } = touches[0];

      const target = document.elementFromPoint(clientX, clientY);
      if (target && target.className === `${componentName}__sidebar-item` && target instanceof HTMLElement) {
        const { index } = target.dataset;
        if (index !== undefined && state.currentSidebar !== index) {
          setCurrentSidebar(index);
          scrollToView();
        }
      }
    };

    const handleRootScroll = (event: Event & { target: HTMLElement }) => {
      if (!rootScrollMask) {
        return;
      }

      const { scrollTop } = event.target;
      calcChildPosition(scrollTop)
    };

    const handleRootTouchstart = () => {
      rootScrollMask = true;
    };
    const handleRootTouchend = () => {
      rootScrollMask = false;
      inertiaScroll();
    };

    const clearCurrentSidebarToast = (): void => {
      if (state.showCurrentSidebar && state.currentSidebar) {
        timeOut && clearTimeout(timeOut);
        timeOut = window.setTimeout(() => {
          state.showCurrentSidebar = false;
        }, 2000);
      }
    };

    return {
      state,
      indexesRoot,
      handleRootTouchend,
      handleRootTouchstart,
      handleSidebarItemClick,
      handleSidebarTouchmove,
      handleSidebarTouchstart,
      handleRootScroll,
    };
  },
});
</script>
