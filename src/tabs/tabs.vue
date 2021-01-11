<template>
  <div :class="classes">
    <div ref="navScroll" :class="navClasses">
      <div ref="navWrap" :class="`${name}__nav-wrap`">
        <div v-for="item in itemProps"
             :key="item.name"  :class="getItemClasses(item)" @click="(e) => tabClick(e, item)">
          {{item.label}}
        </div>
        <div ref="navLine" :class="`${name}__nav-line`"
             :style="lineStyle"></div>
      </div>
    </div>
    <div :class="`${name}__content`" >
      <slot />
    </div>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide, reactive, ref, nextTick, onBeforeUnmount } from 'vue';
import config from '../config';
import { TabsProps } from './tabs.interface';

const { prefix } = config;
const name = `${prefix}-tabs`;

export default defineComponent({
  props: TabsProps,
  emits: ['change'],
  setup(props, { emit, slots }) {
    const classes = computed(() => [`${name}`, { [`${name}--horizontal`]: props.direction === 'horizontal' }]);
    const navClasses = computed(() => [`${name}__nav`, { [`${name}__nav--scroll`]: props.scrollable }]);

    const state = reactive({
      currentName: String(props.activeName),
    });
    const getItemClasses = (item: { name: string; disabled: any; }) => {
      const itemClasses:Array<string> = [`${name}__nav-item`];
      if (item.name === state.currentName) {
        itemClasses.push(`${prefix}-is-active`);
      }
      if (item.disabled) {
        itemClasses.push(`${prefix}-is-disabled`);
      }
      console.log(itemClasses);
      return itemClasses;
    };

    const { itemProps } = (() => {
      const children = (slots.default ? slots.default() : [])
        .filter((child: any) => child.type.name === `${prefix}-tab-panel`);
      const itemProps = children.map((item: any) => ({
        ...item.props,
      }));
      return {
        itemProps,
      };
    })();

    const navScroll = ref<HTMLElement | null>(null);
    const navWrap = ref<HTMLElement | null>(null);
    const navLine = ref<HTMLElement | null>(null);
    const lineStyle = ref('');
    const moveToActiveTab = () => {
      if (navWrap.value && navLine.value) {
        const tab = navWrap.value.querySelector<HTMLElement>('.t-is-active');
        const line = navLine.value;
        if (props.direction === 'horizontal' && tab) {
          lineStyle.value = `transform: translateY(${tab.offsetTop}px)`
          ;
        } else if (tab) {
          lineStyle.value = `transform: translateX(${Number(tab.offsetLeft) + (Number(tab.offsetWidth) / 2) - (line.offsetWidth / 2)}px)`
          ;
        }
      }
    };
    onMounted(() => {
      moveToActiveTab();
      window.addEventListener('resize', moveToActiveTab, false);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', moveToActiveTab);
    });
    const setCurrentName = (val: string)  => {
      emit('change', val);
      state.currentName = val;
    };
    const tabChange = (event: Event, name: string) => {
      setCurrentName(name);
    };
    const tabClick = (event: Event, item: object) => {
      const { name, disabled } = item as any;
      if (disabled || state.currentName === name) {
        return false;
      }
      tabChange(event, name);
      nextTick(() => {
        moveToActiveTab();
      });
    };
    provide('getCurrentName', () => state.currentName);
    return {
      name,
      prefix,
      state,
      classes,
      navClasses,
      tabClick,
      itemProps,
      navScroll,
      navWrap,
      navLine,
      lineStyle,
      getItemClasses,
    };
  },
});
</script>
