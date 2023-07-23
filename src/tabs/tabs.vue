<template>
  <div :class="classes">
    <t-sticky v-bind="stickyProps" @scroll="handlerScroll">
      <div :class="navClasses">
        <div ref="navScroll" :class="`${name}__scroll ${name}__scroll--top ${name}__scroll--${theme}`">
          <div ref="navWrap" :class="`${name}__wrapper ${name}__wrapper--${theme}`">
            <div
              v-for="(item, index) in itemProps"
              :key="item.value"
              :class="{
                [`${name}__item ${name}__item--top`]: true,
                [`${name}__item--evenly`]: spaceEvenly,
                [activeClass]: item.value === currentValue,
                [disabledClass]: item.disabled,
                [`${name}__item--${theme}`]: true,
              }"
              @click="(e) => tabClick(e, item)"
            >
              <t-badge v-bind="item['badge-props'] || item.badgeProps">
                <div
                  :class="{
                    [`${name}__item-inner ${name}__item-inner--${theme}`]: true,
                    [`${name}__item-inner--active`]: theme === 'tag' && item.value === currentValue,
                  }"
                >
                  <tab-nav-item :label="item.label"></tab-nav-item>
                </div>
              </t-badge>
              <div v-if="theme === 'card' && index === currentIndex - 1" :class="`${name}__item-prefix`"></div>
              <div v-if="theme === 'card' && index === currentIndex + 1" :class="`${name}__item-suffix`"></div>
            </div>
            <div
              v-if="theme === 'line' && showBottomLine"
              ref="navLine"
              :class="`${name}__track ${name}__track--top`"
              :style="lineStyle"
            ></div>
          </div>
        </div>
      </div>
    </t-sticky>
    <div :class="`${name}__content`" @touchstart="moveStart" @touchmove="onMove" @touchend="moveEnd">
      <slot></slot>
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
  toRefs,
  nextTick,
  onBeforeUnmount,
  readonly,
  Fragment,
  watch,
  CSSProperties,
} from 'vue';
import config from '../config';
import TabsProps from './props';
import TabNavItem from './tab-nav-item.vue';
import { useVModel } from '../shared';
import { preventDefault } from '../shared/dom';
import CLASSNAMES from '../shared/constants';
import TSticky from '../sticky';

const { prefix } = config;
const name = `${prefix}-tabs`;

export default defineComponent({
  name,
  components: { TabNavItem, TSticky },
  props: TabsProps,
  emits: ['update:value', 'update:modelValue'],
  setup(props, context) {
    const theme = computed(() => props.theme);
    const spaceEvenly = computed(() => props.spaceEvenly);
    const showBottomLine = computed(() => props.showBottomLine);
    const swipeable = computed(() => props.swipeable);
    const stickyProps = computed(() => ({ ...props.stickyProps, disabled: !props.sticky }));
    const activeClass = `${name}__item--active`;
    const disabledClass = `${name}__item--disabled`;
    const classes = computed(() => [`${name}`, props.size && CLASSNAMES.SIZE[props.size]]);
    const navClasses = ref([`${name}__nav`]);
    const startX = ref(0);
    const startY = ref(0);
    const endX = ref(0);
    const endY = ref(0);
    const canMove = ref(true);
    const tabIndex = computed(() => {
      let index = 0;
      for (let i = 0; i < itemProps.value.length; i++) {
        if (itemProps.value[i].value === currentValue.value) {
          index = i;
          break;
        }
      }
      return index;
    });

    const { value, modelValue } = toRefs(props);
    const [currentValue, setCurrentValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const itemProps = computed(() => {
      if (props.list) {
        return props.list;
      }
      let children: any[] = context.slots.default ? context.slots.default() : [];

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

    const valueList = computed(() => itemProps.value.map((v) => v.value));
    const currentIndex = computed(() => valueList.value.indexOf(currentValue.value));

    const navScroll = ref<HTMLElement | null>(null);
    const navWrap = ref<HTMLElement | null>(null);
    const navLine = ref<HTMLElement | null>(null);
    const lineStyle = ref();
    const moveToActiveTab = () => {
      if (navWrap.value && navLine.value && showBottomLine.value) {
        const tab = navWrap.value.querySelector<HTMLElement>(`.${activeClass}`);
        if (!tab) return;
        const line = navLine.value;
        const tabInner = tab.querySelector<HTMLElement>(`.${prefix}-badge`);
        const style: CSSProperties = {};
        if (props.bottomLineMode === 'auto') {
          style.width = `${Number(tabInner?.offsetWidth)}px`;
          style.transform = `translateX(${Number(tab?.offsetLeft) + Number(tabInner?.offsetLeft)}px)`;
        } else if (props.bottomLineMode === 'full') {
          style.width = `${Number(tab?.offsetWidth)}px`;
          style.transform = `translateX(${Number(tab?.offsetLeft)}px)`;
        } else {
          style.transform = `translateX(${
            Number(tab?.offsetLeft) + (Number(tab?.offsetWidth) - Number(line?.offsetWidth)) / 2
          }px)`;
        }

        if (props.animation) {
          style.transitionDuration = `${props.animation.duration}ms`;
        }

        lineStyle.value = style;
      }
    };

    onMounted(() => {
      window.addEventListener('resize', moveToActiveTab, false);
      setTimeout(() => {
        moveToActiveTab();
      }, 300);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', moveToActiveTab);
    });

    watch(value, () => {
      nextTick(() => {
        moveToActiveTab();
      });
    });

    const tabClick = (event: Event, item: Record<string, unknown>) => {
      const { value, disabled, label } = item as any;
      if (disabled || currentValue.value === value) {
        return false;
      }
      setCurrentValue(value, typeof label === 'function' ? label() : label);
      props.onClick?.(value, typeof label === 'function' ? label() : label);
      nextTick(() => {
        moveToActiveTab();
      });
    };

    const handlerScroll = (context: { scrollTop: number; isFixed: boolean }) => {
      const { scrollTop, isFixed } = context;
      if (props.stickyProps) {
        props.onScroll?.(scrollTop, isFixed);
      }
    };

    // 手势滑动开始
    const moveStart = (e: any) => {
      if (!swipeable.value) return;
      startX.value = e.targetTouches[0].clientX;
      startY.value = e.targetTouches[0].clientY;
    };

    const onMove = (e: any) => {
      if (!swipeable.value) return;
      if (!canMove.value) return;
      endX.value = e.targetTouches[0].clientX;
      endY.value = e.targetTouches[0].clientY;
      const dValueX = Math.abs(startX.value - endX.value);
      const dValueY = Math.abs(startY.value - endY.value);
      if (tabIndex.value >= 0 && tabIndex.value < itemProps.value.length) {
        if (dValueX > dValueY) {
          // 水平滑动长度大于纵向滑动长度，那么选择水平滑动，阻止浏览器默认左右滑动事件
          preventDefault(e, false);
          if (dValueX <= 40) return;
          if (startX.value > endX.value) {
            // 向左划
            if (tabIndex.value >= itemProps.value.length - 1) return;
            canMove.value = false;
            tabClick(e, itemProps.value[tabIndex.value + 1]);
          } else if (startX.value < endX.value) {
            // 向右划
            if (tabIndex.value <= 0) return;
            canMove.value = false;
            tabClick(e, itemProps.value[tabIndex.value - 1]);
          }
        }
      }
    };

    // 手势滑动结束
    const moveEnd = () => {
      if (!swipeable.value) return;
      canMove.value = true;
      startX.value = 0;
      endX.value = 0;
      startY.value = 0;
      endY.value = 0;
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
      currentIndex,
      tabClick,
      showBottomLine,
      itemProps,
      navScroll,
      navWrap,
      navLine,
      lineStyle,
      moveToActiveTab,
      stickyProps,
      theme,
      spaceEvenly,
      moveStart,
      onMove,
      moveEnd,
      handlerScroll,
    };
  },
});
</script>
