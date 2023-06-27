<template>
  <div ref="indexesRoot" :class="componentName" @scroll="handleRootScroll">
    <div :class="`${componentName}__sidebar`">
      <div
        v-for="item in indexList"
        :key="item"
        :class="[
          `${componentName}__sidebar-item`,
          activeSidebar === item ? `${componentName}__sidebar-item--active` : '',
        ]"
        :data-index="item"
        @click.prevent="handleSidebarItemClick(item)"
        @touchmove="handleSidebarTouchmove"
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
import {
  ref,
  reactive,
  defineComponent,
  onMounted,
  watchEffect,
  toRefs,
  onBeforeUnmount,
  provide,
  computed,
  ComponentInternalInstance,
  watch,
} from 'vue';
import _ from 'lodash';
import config from '../config';
import IndexesProps from './props';

const { prefix } = config;

interface Child extends ComponentInternalInstance {
  [key: string]: any;
}

interface State {
  showSidebarTip: boolean;
  activeSidebar: string | number;
  children: Child[];
}

interface GroupTop {
  height: number;
  top: number;
  anchor: string;
  totalHeight: number;
}

const componentName = `${prefix}-indexes`;

export default defineComponent({
  name: componentName,
  props: IndexesProps,
  emits: ['select', 'change'],
  setup(props) {
    let timeOut: number;
    const indexesRoot = ref<HTMLElement>();
    const parentRect = ref();
    const state: State = reactive({
      showSidebarTip: false,
      activeSidebar: '',
      children: [],
    });

    const groupTop: Array<GroupTop> = [];
    const indexList = computed(() => {
      if (!props.indexList) {
        const start = 'A'.charCodeAt(0);
        const alphabet = [];
        for (let i = start, end = start + 26; i < end; i += 1) {
          alphabet.push(String.fromCharCode(i));
        }
        return alphabet;
      }
      return props.indexList;
    });

    const setAnchorOnScroll = (scrollTop: number) => {
      if (!groupTop.length) return;
      const { sticky, stickyOffset } = props;
      const stickyTop = stickyOffset + parentRect.value.top;
      scrollTop += stickyTop;
      const curIndex = groupTop.findIndex(
        (group) => scrollTop >= group.top - group.height && scrollTop <= group.top + group.totalHeight - group.height,
      );
      state.activeSidebar = groupTop[0].anchor;
      if (curIndex === -1) return;
      state.activeSidebar = groupTop[curIndex].anchor;
      const curGroup = groupTop[curIndex];
      if (sticky) {
        const offset = curGroup.top - scrollTop;
        const betwixt = offset < curGroup.height && offset > 0 && scrollTop > stickyTop;
        state.children.forEach((child, index) => {
          const { $el } = child;
          const wrapperClass = `${componentName}-anchor__wrapper`;
          const headerClass = `${componentName}-anchor__header`;
          const wrapper = $el.querySelector(`.${wrapperClass}`);
          const header = $el.querySelector(`.${headerClass}`);
          if (index === curIndex) {
            if (scrollTop - parentRect.value.top > stickyOffset) {
              wrapper.classList.add(`${wrapperClass}--sticky`);
            } else {
              wrapper.classList.remove(`${wrapperClass}--sticky`);
            }
            wrapper.classList.add(`${wrapperClass}--active`);
            header.classList.add(`${headerClass}--active`);
            wrapper.style = `transform: translate3d(0, ${betwixt ? offset : 0}px, 0); top: ${stickyTop}px`;
          } else if (index + 1 === curIndex) {
            wrapper.classList.add(`${wrapperClass}--sticky`);
            wrapper.classList.add(`${wrapperClass}--active`);
            header.classList.add(`${headerClass}--active`);
            wrapper.style = `transform: translate3d(0, ${betwixt ? offset : 0}px, 0); top: ${stickyTop}px;`;
          } else {
            wrapper.classList.remove(`${wrapperClass}--sticky`);
            wrapper.classList.remove(`${wrapperClass}--active`);
            header.classList.remove(`${headerClass}--active`);
            wrapper.style = '';
          }
        });
      }
    };

    const scrollToByIndex = (index: number | string) => {
      const curGroup = groupTop.find((item) => item.anchor === index);
      if (indexesRoot.value) {
        indexesRoot.value?.scrollTo(0, curGroup?.top ?? 0);
      }
    };

    const setActiveSidebarAndTip = (index: string | number) => {
      state.activeSidebar = index;
      state.showSidebarTip = true;
    };

    const handleSidebarItemClick = (index: string | number) => {
      props.onSelect?.(index);
      setActiveSidebarAndTip(index);
      scrollToByIndex(index);
    };

    const handleRootScroll = _.throttle((e: UIEvent) => {
      const scrollTop = indexesRoot.value?.scrollTop ?? 0;
      setAnchorOnScroll(scrollTop);
    }, 1000 / 30);

    const clearSidebarTip = (): void => {
      if (state.showSidebarTip && state.activeSidebar) {
        timeOut && clearTimeout(timeOut);
        timeOut = window.setTimeout(() => {
          state.showSidebarTip = false;
        }, 1000);
      }
    };

    const getAnchorsRect = () => {
      return Promise.all(
        state.children.map((child) => {
          const { $el } = child;
          const { dataset } = $el;
          const { index } = dataset;
          const rect = $el.getBoundingClientRect();
          groupTop.push({
            height: rect.height,
            top: rect.top - parentRect.value.top,
            anchor: /^\d+$/.test(index) ? Number(index) : index,
            totalHeight: 0,
          });
          return child;
        }),
      );
    };

    const handleSidebarTouchmove = (event: TouchEvent) => {
      event.preventDefault();
      const { touches } = event;
      const { clientX, clientY } = touches[0];
      const target = document.elementFromPoint(clientX, clientY);
      if (target && target.className === `${componentName}__sidebar-item` && target instanceof HTMLElement) {
        const { index } = target.dataset;
        const curIndex = /^\d+$/.test(index ?? '') ? Number(index) : index;
        if (curIndex !== undefined && state.activeSidebar !== curIndex) {
          setActiveSidebarAndTip(curIndex);
          scrollToByIndex(curIndex);
        }
      }
    };

    const relation = (child: ComponentInternalInstance) => {
      child && state.children.push(child);
    };

    watchEffect(() => {
      if (state.showSidebarTip) {
        clearSidebarTip();
      }
    });

    watch(
      () => state.activeSidebar,
      (val, oldVal) => {
        if (val !== oldVal) {
          props.onChange?.(state.activeSidebar);
        }
      },
    );

    onMounted(() => {
      parentRect.value = indexesRoot.value?.getBoundingClientRect() || { top: 0 };
      getAnchorsRect().then(() => {
        groupTop.forEach((item, index) => {
          const next = groupTop[index + 1];
          item.totalHeight = (next?.top || Infinity) - item.top;
        });
        setAnchorOnScroll(0);
      });
    });

    onBeforeUnmount(() => {
      timeOut && clearTimeout(timeOut);
    });

    provide('indexesProvide', {
      relation,
    });

    return {
      ...toRefs(state),
      componentName,
      indexList,
      indexesRoot,
      handleSidebarItemClick,
      handleRootScroll,
      handleSidebarTouchmove,
    };
  },
});
</script>
