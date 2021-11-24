<template>
  <div :class="classes">
    <div ref="navScroll" :class="navClasses">
      <div ref="navWrap" :class="`${name}__nav-wrap`">
        <div
          v-for="item in itemProps"
          :key="item.name"
          :class="{
            [`${name}__nav-item`]: true,
            [`${prefix}-is-active`]: item.name === currentName,
            [`${prefix}-is-disabled`]: item.disabled
          }" @click="(e) => tabClick(e, item)"
        >
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
import { computed, defineComponent, onMounted, provide, ref, nextTick, onBeforeUnmount, readonly, Fragment, watch } from 'vue';
import config from '../config';
import { TabsProps } from './tabs.interface';

const { prefix } = config;
const name = `${prefix}-tabs`;

export default defineComponent({
  name,
  props: TabsProps,
  emits: ['change'],
  setup(props, { emit, slots }) {
    const classes = computed(() => [`${name}`, { [`${name}--horizontal`]: props.direction === 'horizontal' }]);
    const navClasses = computed(() => [`${name}__nav`, { [`${name}__nav--scroll`]: props.scrollable }]);

    const currentName = ref(props.activeName);
    watch(() => props.activeName, (newValue) => {
      setCurrentName(newValue);
      nextTick(() => {
        moveToActiveTab();
      });
    });


    const { itemProps } = (() => {
      let children: any[] = (slots.default ? slots.default() : []);
      const res: any[] = [];
      children.forEach((child) => {
        if (child.type === Fragment) {
          res.push(...child.children);
        } else {
          res.push(child);
        }
      });
      children = res.filter((child: any) => child.type.name === `${prefix}-tab-panel`);
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
    const setCurrentName = (val: string | number)  => {
      emit('change', val);
      currentName.value = val;
    };
    const tabChange = (event: Event, name: string | number) => {
      setCurrentName(name);
    };
    const tabClick = (event: Event, item: Record<string, unknown>) => {
      const { name, disabled } = item as any;
      if (disabled || currentName.value === name) {
        return false;
      }
      tabChange(event, name);
      nextTick(() => {
        moveToActiveTab();
      });
    };
    provide('currentName', readonly(currentName));

    return {
      name,
      prefix,
      classes,
      navClasses,
      currentName,
      tabClick,
      itemProps,
      navScroll,
      navWrap,
      navLine,
      lineStyle,
    };
  },
});
</script>
