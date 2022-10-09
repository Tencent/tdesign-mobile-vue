<template>
  <div :class="`${name}`">
    <ul ref="rateWrapper" :class="`${name}--list`" @touchstart="onTouchstart" @touchmove="onTouchmove">
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
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, defineComponent, ExtractPropTypes, PropType, ComputedRef } from 'vue';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-vue-next';
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
  setup(props, context: SetupContext) {
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

    function onClick(current: number) {
      if (props.disabled) return;
      actualVal.value = props.clearable && actualVal.value === current ? 0 : current;
    }

    let ranges: Array<RangeTypes> = [];
    function onTouchstart() {
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
    };
  },
});
</script>
