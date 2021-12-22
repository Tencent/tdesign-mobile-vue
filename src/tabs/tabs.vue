<template>
  <div :class="classes">
    <div ref="navScroll" :class="navClasses">
      <div ref="navWrap" :class="`${name}__nav-wrap`">
        <div
          v-for="item in itemProps"
          :key="item.value"
          :class="{
            [`${name}__nav-item`]: true,
            [`${prefix}-is-active`]: item.value === currentValue,
            [`${prefix}-is-disabled`]: item.disabled,
          }"
          @click="(e) => tabClick(e, item)"
        >
          <!-- <t-node :content="item.labelContent"></t-node> -->
        </div>
        <div v-if="showBottomLine" ref="navLine" :class="`${name}__nav-line`" :style="lineStyle"></div>
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

const { prefix } = config;
const name = `${prefix}-tabs`;

export default defineComponent({
  name,
  props: TabsProps,
  emits: ['onChange'],
  setup(props, { emit, slots }) {
    const placement = computed(() => props.placement);
    const showBottomLine = computed(() => props.showBottomLine);
    const classes = computed(() => [`${name}`, `${name}--${placement.value}`]);
    const navClasses = ref([`${name}__nav`]);
    const isScroll = ref(false);
    const currentValue = ref(props.value ? props.value : props.defaultValue);
    watch(
      () => props.value,
      (newValue) => {
        setValue(newValue);
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
      const internalInstance = getCurrentInstance();
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
      if (navWrap.value && navLine.value && !showBottomLine.value) {
        const tab = navWrap.value.querySelector<HTMLElement>('.t-is-active');
        if (!tab) return;
        const line = navLine.value;
        if (placement.value === 'left' || placement.value === 'right') {
          lineStyle.value = `transform: translateY(${tab.offsetTop}px)`;
        } else {
          lineStyle.value = `transform: translateX(${
            Number(tab.offsetLeft) + Number(tab.offsetWidth) / 2 - line.offsetWidth / 2
          }px)`;
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
        isScroll.value = navWrap.value.offsetWidth > navScroll.value.offsetWidth;
        navClasses.value = computed(() => [`${name}__nav`, { 't-is-scrollable': isScroll.value }]);
      });
    };
    provide('currentValue', readonly(currentValue));

    return {
      name,
      prefix,
      classes,
      navClasses,
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
