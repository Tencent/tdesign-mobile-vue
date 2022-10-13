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

    <div v-for="(item, index) in list" :ref="setAnchorGroupRefs(index)" :key="item.index" :data-index="item.index">
      <indexes-anchor :ref="setAnchorRefs(index)" :anchor-style="anchorStyle[index]">
        {{ item.title ?? item.index }}
      </indexes-anchor>
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
import indexesAnchor from './indexes-anchor.vue';
import TIndexesCell from './indexes-cell.vue';

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
  components: { indexesAnchor, TIndexesCell },
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

    const indexesRootStyle = computed(() => {
      if (typeof props.height !== 'number') {
        return {};
      }
      const height = Number(props.height);
      return { height: height === 0 ? 0 : `${height}px` };
    });

    const scrollToView = (): void => {
      const children = anchorGroup.value;
      const targets = children.filter((ele) => {
        const { dataset } = ele;
        return dataset && dataset.index === state.activeSidebar;
      });
      targets[0]?.scrollIntoView();
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

    return {
      ...toRefs(state),
      indexesRoot,
      indexesRootStyle,
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
