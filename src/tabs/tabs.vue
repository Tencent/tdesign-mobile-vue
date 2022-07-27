<template>
  <div :class="classes">
    <t-sticky v-bind="stickyProps">
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
            >
            </tab-nav-item>
            <div v-if="showBottomLine" ref="navLine" :class="`${name}__nav-line`" :style="lineStyle"></div>
          </div>
        </div>
      </div>
    </t-sticky>
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
import TSticky from '../sticky';

const { prefix } = config;
const name = `${prefix}-tabs`;

export default defineComponent({
  name,
  components: { TabNavItem, TSticky },
  props: TabsProps,
  emits: ['onChange'],
  setup(props, { emit, slots }) {
    const placement = computed(() => props.placement);
    const showBottomLine = computed(() => props.showBottomLine);
    const stickyProps = computed(() => ({ disabled: true, ...props.stickyProps }));
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
        newValue && newValue !== currentValue.value && setValue(newValue);
        nextTick(() => {
          moveToActiveTab();
        });
      },
    );
    const itemProps = computed(() => {
      if (props.list) {
        return props.list;
      }
      let children: any[] = slots.default ? slots.default() : [];

      const res: any[] = [];
      const label: any[] = [];
      children.forEach((child) => {
        if (child.type === Fragment) {
          res.push(...child.children);
        } else {
          res.push(child);
        }
        if (child.children?.label) {
          label.push(child.children.label()[0] || null);
        }
      });

      children = res.filter((child: any) => child.type.name === `${prefix}-tab-panel`);
      return children.map((item: any, index: number) => ({
        ...item.props,
        label: () => label[index] || item.props.label,
      }));
    });
    const navScroll = ref<HTMLElement | null>(null);
    const navWrap = ref<HTMLElement | null>(null);
    const navLine = ref<HTMLElement | null>(null);
    const lineStyle = ref('');
    const moveToActiveTab = () => {
      if (navWrap.value && navLine.value && showBottomLine.value) {
        const tab = navWrap.value.querySelector<HTMLElement>(`.${activeClass}`);
        if (!tab) return;
        const line = navLine.value;
        if (placement.value === 'left') {
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
      window.addEventListener('resize', moveToActiveTab, false);
      setTimeout(() => {
        moveToActiveTab();
      }, 300);
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
      tabClick,
      showBottomLine,
      itemProps,
      navScroll,
      navWrap,
      navLine,
      lineStyle,
      moveToActiveTab,
      stickyProps,
    };
  },
});
</script>
