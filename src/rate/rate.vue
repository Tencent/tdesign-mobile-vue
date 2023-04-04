<template>
  <div :class="`${name}`">
    <ul
      ref="rateWrapper"
      :class="`${name}--list`"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchEnd"
    >
      <li v-for="n in count" :key="n" :class="classes(n)" :style="{ marginRight: `${count > n ? gap : 0}px` }">
        <span :class="`${name}--placeholder`">
          <slot name="icon">
            <component :is="startComponent" :size="size" :style="{ color: colors[1] }" />
          </slot>
        </span>
        <template v-if="allowHalf">
          <span :class="`${name}--icon-left`" @click="onClick(n - 0.5)">
            <slot name="icon">
              <star-filled-icon :size="size" :style="iconHalfStyle(n)" />
            </slot>
          </span>
          <span :class="`${name}--icon-right`" @click="onClick(n)">
            <slot name="icon">
              <star-filled-icon :size="size" :style="iconFullStyle(n)" />
            </slot>
          </span>
        </template>
        <span v-else :class="`${name}--icon`" @click="onClick(n)">
          <slot name="icon">
            <star-filled-icon :size="size" :style="iconFullStyle(n)" />
          </slot>
        </span>
      </li>
    </ul>
    <span v-if="showText" :class="`${name}--text`">{{ rateText }}</span>
    <div
      v-show="ratePopoverLength > 0"
      ref="ratePopoverRef"
      :class="`${name}--popover`"
      :style="{ ...ratePopover.position }"
    >
      <ul :class="`${name}--list`">
        <li v-for="n in ratePopover.value" :key="n" :class="detailClasses(n)" @click="onClickInPopover(n)">
          <div :class="`${name}--popover-item-content`">
            <span :class="`${name}--placeholder`">
              <slot name="icon">
                <component :is="startComponent" :size="size" :style="{ color: colors[1] }" />
              </slot>
            </span>
            <template v-if="isHalf(n)">
              <span :class="`${name}--icon-left`">
                <slot name="icon">
                  <star-filled-icon :size="size" :style="{ color: colors[0] }" />
                </slot>
              </span>
              <span :class="`${name}--icon-right`">
                <slot name="icon">
                  <star-filled-icon :size="size" :style="{ color: colors[1] }" />
                </slot>
              </span>
            </template>
            <span v-else :class="`${name}--icon`">
              <slot name="icon">
                <star-filled-icon :size="size" :style="{ color: colors[0] }" />
              </slot>
            </span>
          </div>
          <span :class="`${name}--popover-item-text`">{{ n }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, ExtractPropTypes, PropType, ComputedRef, reactive } from 'vue';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-vue-next';
import { onClickOutside } from '@vueuse/core';
import rateProps from './props';
import config from '../config';
import { TdRateProps } from './type';
import { useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-rate`;

interface RangeTypes {
  score: number;
  left: number;
}

export default defineComponent({
  name,
  components: { StarFilledIcon, StarIcon },
  props: rateProps,
  emits: ['change', 'update:value', 'update:modelValue'],
  setup(props, context) {
    const rateWrapper = ref<HTMLElement | null>(null);
    const [actualVal] = useDefault<number, TdRateProps>(props, context.emit, 'value', 'change');
    const rateText = computed(() => {
      if (Array.isArray(props.texts) && props.texts.length > 0) {
        return props.texts[actualVal.value - 1];
      }

      return actualVal.value > 0 ? `${actualVal.value} 分` : '';
    });
    const colors = computed(() => {
      if (Array.isArray(props.color)) return props.color;

      return [props.color, undefined];
    });

    const iconHalfStyle = (n: number) => ({
      color: actualVal.value + 0.5 === n || actualVal.value >= n ? colors.value[0] : 'transparent',
    });
    const iconFullStyle = (n: number) => ({
      color: actualVal.value >= n ? colors.value[0] : 'transparent',
    });

    const startComponent = props.variant === 'filled' ? StarFilledIcon : StarIcon;

    const classes = (n: number) => ({
      [`${name}--item`]: true,
      [`${name}-full`]: actualVal.value >= n,
      [`${name}-half`]: actualVal.value + 0.5 === n,
    });

    const ratePopoverRef = ref<HTMLElement>();
    const ratePopover = reactive<{
      value: number[];
      position: Record<string, string>;
      autoClose: boolean;
      touchTime: number;
    }>({
      value: [],
      position: {},
      autoClose: true,
      touchTime: 0,
    });
    const timer = ref<any>(null);
    const ratePopoverLength = computed(() => {
      return ratePopover.value.length;
    });
    const isHalf = (n: number) => {
      return n % 1 === 0.5;
    };
    const detailClasses = (n: number) => ({
      [`${name}--popover-item`]: true,
      [`${name}--popover-item-is-active`]: ratePopoverLength.value > 1 && actualVal.value === n,
      [`${name}-full`]: !isHalf(n),
      [`${name}-half`]: isHalf(n),
    });
    function onClickInPopover(current: number) {
      actualVal.value = current;
      clearPopover();
    }
    onClickOutside(ratePopoverRef, (event) => {
      if (ratePopover.touchTime < 200) {
        clearPopover();
      } else {
        ratePopover.touchTime = 0;
      }
    });

    function showPopover(current: number, showHalf = false) {
      if (timer.value) {
        clearTimeout(timer.value);
      }
      const detail = showHalf ? [Math.ceil(current) - 0.5, Math.ceil(current)] : [current];
      ratePopover.value = detail;
      calcPopoverPosition(current);
      clearPopover(true);
    }

    function clearPopover(delay = false) {
      if (delay) {
        timer.value = setTimeout(() => {
          if (ratePopover.autoClose) {
            ratePopover.value = [];
            clearTimeout(timer.value);
          }
        }, 3000);
      } else {
        ratePopover.value = [];
        if (timer.value) {
          clearTimeout(timer.value);
        }
      }
    }

    function calcPopoverPosition(current: number) {
      const n = Math.ceil(current);
      if (rateWrapper.value) {
        const items = rateWrapper.value.children;
        const curItem = items[n - 1] || items[0]; // Fix: current is 0
        const { width } = curItem.getBoundingClientRect();
        const { offsetLeft, offsetTop } = curItem as any;
        ratePopover.position = {
          left: `${offsetLeft + width / 2}px`,
          top: `${offsetTop - 6}px`,
        };
      }
    }

    function onClick(current: number) {
      if (props.disabled) return;
      // actualVal.value = props.clearable && actualVal.value === current ? 0 : current;
      if (props.clearable && actualVal.value === current) {
        actualVal.value = 0;
        clearPopover();
        return;
      }
      if (props.allowHalf) {
        showPopover(current, true);
      } else {
        actualVal.value = current;
        showPopover(current);
      }
    }

    let ranges: Array<RangeTypes> = [];
    function onTouchstart() {
      ratePopover.autoClose = false;
      ratePopover.touchTime = Date.now();
      ranges = [];

      if (rateWrapper.value) {
        const items = rateWrapper.value.children;
        Array.from(items).forEach((node, index) => {
          const { left, width } = node.getBoundingClientRect();
          if (props.allowHalf) {
            ranges.push({ score: index + 0.5, left }, { score: index + 1, left: left + width / 2 });
          } else {
            ranges.push({ score: index + 1, left });
          }
        });
      }
    }

    function onTouchmove(e: TouchEvent) {
      if (props.disabled) return;

      const { clientX } = e.touches[0];

      let score: number = props.allowHalf ? 0.5 : 1;

      for (let i = ranges.length - 1; i >= 0; i--) {
        if (clientX > ranges[i].left) {
          score = ranges[i].score;
          break;
        } else {
          score = 0;
        }
      }
      actualVal.value = score;
      showPopover(score);
    }

    function onTouchEnd(e: TouchEvent) {
      ratePopover.touchTime = Date.now() - ratePopover.touchTime;
      ratePopover.autoClose = true;
    }

    return {
      name: ref(name),
      classes,
      rateWrapper,
      actualVal,
      iconHalfStyle,
      iconFullStyle,
      colors,
      startComponent,
      rateText,
      onClick,
      onTouchstart,
      onTouchmove,
      onTouchEnd,
      ratePopover,
      ratePopoverLength,
      ratePopoverRef,
      isHalf,
      detailClasses,
      onClickInPopover,
    };
  },
});
</script>
