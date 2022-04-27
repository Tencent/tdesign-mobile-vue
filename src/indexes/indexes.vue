<template>
  <div ref="indexesRoot" :style="indexesRootStyle" :class="componentName" @scroll="handleRootScroll">
    <div
      v-if="list.length > 0"
      :class="`${componentName}__sidebar`"
      @touchstart="handleSidebarTouchstart"
      @touchmove="handleSidebarTouchmove"
    >
      <div
        v-for="item in list"
        :key="item.index"
        :class="[
          `${componentName}__sidebar-item`,
          activeSidebar === item.index ? `${componentName}__sidebar-item--active` : '',
        ]"
        :data-index="item.index"
        @click.prevent="handleSidebarItemClick(item.index)"
      >
        {{ item.index }}
        <div v-if="showSidebarTip && activeSidebar === item.index" :class="`${componentName}__sidebar-tip`">
          <span :class="`${componentName}__sidebar-tip-text`">
            {{ activeSidebar }}
          </span>
        </div>
      </div>
    </div>

    <div v-for="(item, index) in list" :ref="setAnchorRefs(index)" :key="item.index" :data-index="item.index">
      <div :class="[`${componentName}__anchor`]">
        {{ item.title ?? item.index }}
      </div>
      <div :class="[`${componentName}__group`]">
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
import {
  ref,
  reactive,
  defineComponent,
  PropType,
  onMounted,
  watchEffect,
  computed,
  onBeforeUnmount,
  toRefs,
  SetupContext,
} from 'vue';
import config from '../config';
import { ListItem } from './type';
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
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    let timeOut: number;
    const indexesRoot = ref<null | HTMLElement>(null);
    const state: State = reactive({
      componentName,
      list: props.list,
      showSidebarTip: false,
      activeSidebar: '',
    });
    const anchor = ref<HTMLElement[]>([]);

    const setAnchorRefs = (index: number) => {
      return (el: any) => {
        anchor.value[index] = el as HTMLElement;
      };
    };

    const indexesRootStyle = computed(() => {
      if (typeof props.height !== 'number') {
        return {};
      }
      const height = Number(props.height);
      return { height: height === 0 ? 0 : `${height}px` };
    });

    const scrollToView = (): void => {
      const children = anchor.value;
      const targets = children.filter((ele) => {
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
      emitEvent('select', indexes);
    };

    onMounted(() => {
      const children = anchor.value;
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

    return {
      ...toRefs(state),
      indexesRoot,
      indexesRootStyle,
      anchor,
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
