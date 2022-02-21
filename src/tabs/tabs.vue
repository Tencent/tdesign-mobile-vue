<template>
  <div :class="classes">
    <div :class="navClasses">
      <div ref="navScroll" :class="`${name}__nav-container`">
        <div ref="navWrap" :class="`${name}__nav-wrap`">
          <tab-nav-item
            v-for="item in itemProps"
            :key="item.value"
            :label="item.label"
            :class="{
              [`${name}__nav-item`]: true,
              [activeClass]: item.value === currentValue,
              [disabledClass]: item.disabled,
            }"
            @click="(e) => tabClick(e, item)"
          />
          <div v-if="showBottomLine" ref="navLine" :class="`${name}__nav-line`" :style="lineStyle"></div>
        </div>
      </div>
    </div>

    <div :class="`${name}__content`">
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  ref,
  nextTick,
  onBeforeUnmount,
  readonly,
  Fragment,
  watch,
  getCurrentInstance,
} from 'vue';
import config from '../config';
import TabsProps from './props';
import TabNavItem from './tab-nav-item.vue';
import { renderContent, renderTNode, TNode } from '../shared';
import CLASSNAMES from '../shared/constants';

const { prefix } = config;
const name = `${prefix}-tabs`;

export default defineComponent({
  name,
  components: { TabNavItem },
  props: TabsProps,
  emits: ['onChange'],
  setup(props, { emit, slots }) {
    const placement = computed(() => props.placement);
    const showBottomLine = computed(() => props.showBottomLine);
    const activeClass = CLASSNAMES.STATUS.active;
    const disabledClass = CLASSNAMES.STATUS.disabled;
    const classes = computed(() => [
      `${name}`,
      `${prefix}-is-${placement.value}`,
      props.size ? CLASSNAMES.SIZE[props.size] : '',
    ]);
    const navClasses = ref([`${name}__nav`]);
    const isScroll = ref(false);
    const currentValue = ref(props.value ? props.value : props.defaultValue);
    watch(
      () => props.value,
      (newValue) => {
        newValue && setValue(newValue);
        nextTick(() => {
          moveToActiveTab();
        });
      },
    );

    const { itemProps } = (() => {
      if (props.list) {
        return {
          itemProps: props.list,
        };
      }
      let children: any[] = slots.default ? slots.default() : [];
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
      console.log(props.animation);
      if (navWrap.value && navLine.value && showBottomLine.value) {
        const tab = navWrap.value.querySelector<HTMLElement>(`.${activeClass}`);
        console.log(tab);
        if (!tab) return;
        const line = navLine.value;
        if (placement.value === 'left' || placement.value === 'top') {
          lineStyle.value = `transform: translateY(${tab.offsetTop}px);${
            props.animation ? `transition-duration:${props.animation.duration}ms` : ''
          }`;
        } else {
          lineStyle.value = `transform: translateX(${
            Number(tab.offsetLeft) + Number(tab.offsetWidth) / 2 - line.offsetWidth / 2
          }px);${props.animation ? `transition-duration:${props.animation.duration}ms` : ''}`;
        }
      }
    };

    onMounted(() => {
      isScroll.value = (navWrap.value?.offsetWidth || 0) > (navScroll.value?.offsetWidth || 0);
      isScroll.value && navClasses.value.push(`${prefix}-is-scrollable`);
      moveToActiveTab();
      window.addEventListener('resize', moveToActiveTab, false);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', moveToActiveTab);
    });
    const setValue = (val: string | number) => {
      emit('onChange', val);
      currentValue.value = val;
    };
    const tabChange = (event: Event, value: string | number) => {
      setValue(value);
    };
    const tabClick = (event: Event, item: Record<string, unknown>) => {
      const { value, disabled } = item as any;
      if (disabled || currentValue.value === value) {
        return false;
      }
      tabChange(event, value);
      nextTick(() => {
        moveToActiveTab();
      });
    };
    provide('currentValue', readonly(currentValue));

    return {
      name,
      prefix,
      classes,
      navClasses,
      activeClass,
      disabledClass,
      currentValue,
      showBottomLine,
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
