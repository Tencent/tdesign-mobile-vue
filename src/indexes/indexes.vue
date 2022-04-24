<template>
  <div ref="indexesRoot" :style="{ height: height + 'px' }" :class="state.componentName" @scroll="handleRootScroll">
    <div
      v-if="state.list.length > 0"
      :class="`${state.componentName}__sidebar`"
      @touchstart="handleSidebarTouchstart"
      @touchmove="handleSidebarTouchmove"
    >
      <div
        v-for="item in state.list"
        :key="item.index"
        :class="[
          `${state.componentName}__sidebar-item`,
          state.activeSidebar === item.index ? `${state.componentName}__sidebar-item--active` : '',
        ]"
        :data-index="item.index"
        @click.prevent="handleSidebarItemClick(item.index)"
      >
        {{ item.index }}
        <div
          v-if="state.showSidebarTip && state.activeSidebar === item.index"
          :class="`${state.componentName}__sidebar-tip`"
        >
          <span :class="`${state.componentName}__sidebar-tip-text`">
            {{ state.activeSidebar }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-for="(item, index) in state.list"
      :ref="(el) => (anchor[index] = el)"
      :key="item.index"
      :data-index="item.index"
    >
      <div :class="[`${state.componentName}__anchor`]">
        {{ item.title ?? item.index }}
      </div>
      <div :class="[`${state.componentName}__group`]">
        <t-indexes-cell
          v-for="(child, childrenIndex) in item.children"
          :key="child.title"
          :value="String(child.title)"
          :title="child.title"
          :link="true"
          :bordered="false"
          @click="handleCellClick({ groupIndex: item.index, childrenIndex: childrenIndex })"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, PropType, onMounted, watchEffect } from 'vue';
import config from '../config';
import { ListItem } from './type';
import IndexesProps from './props';

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
  list: ListItem[];
  showSidebarTip: boolean;
  activeSidebar: string;
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
    let timeOut: number;
    const indexesRoot = ref<null | HTMLElement>(null);
    const state: State = reactive({
      componentName,
      list: props.list,
      showSidebarTip: false,
      activeSidebar: '',
    });
    const anchor = ref<HTMLElement[]>([]);

    const scrollToView = (): void => {
      const children = anchor.value;
      const targets = children.filter((ele: HTMLElement) => {
        const { dataset } = ele;
        return dataset && dataset.index === state.activeSidebar;
      });
      targets[0]?.scrollIntoView();
    };

    const calcChildPosition = (scrollTop: number) => {
      const children = anchor.value;
      let currentIndex = '';
      for (let i = 0; i < children.length - 1; i++) {
        if (scrollTop < children[i + 1].offsetTop) {
          currentIndex = children[i].dataset.index ?? '';
          break;
        }
      }
      if (scrollTop >= children[children.length - 1].offsetTop) {
        currentIndex = children[children.length - 1].dataset.index ?? '';
      }
      state.activeSidebar = currentIndex;
    };

    const setActiveSidebarAndTip = (index: string) => {
      state.activeSidebar = index;
      state.showSidebarTip = true;
    };

    watchEffect(() => {
      if (state.showSidebarTip) {
        clearSidebarTip();
      }
    });

    onMounted(() => {
      const children = anchor.value;
      if (children.length > 0) {
        const { index } = children[0].dataset;
        if (index !== undefined) {
          state.activeSidebar = index;
        }
      }
    });

    const handleSidebarItemClick = (index: string) => {
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

    const handleRootScroll = (event: UIEvent) => {
      if (indexesRoot.value) {
        calcChildPosition(indexesRoot.value.scrollTop);
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
      context.emit('select', indexes);
    };

    return {
      state,
      indexesRoot,
      anchor,
      handleSidebarItemClick,
      handleSidebarTouchmove,
      handleSidebarTouchstart,
      handleRootScroll,
      handleCellClick,
    };
  },
});
</script>
