<template>
  <div :class="`${name}`">
    <ul ref="rateWrapper" :class="`${name}--list`" @touchstart="onTouchstart" @touchmove="onTouchmove">
      <li v-for="n in count" :key="n" :class="classes(n)">
        <template v-if="allowHalf">
          <span :class="`${name}--icon-left`" @click="onClick(n - 0.5)">
            <slot name="icon">
              <t-star-icon :size="size" :style="iconHalfStyle(n)" />
            </slot>
          </span>
          <span :class="`${name}--icon-right`" @click="onClick(n)">
            <slot name="icon">
              <t-star-icon :size="size" :style="iconFullStyle(n)" />
            </slot>
          </span>
        </template>
        <span v-else :class="`${name}--icon`" @click="onClick(n)">
          <slot name="icon">
            <t-star-icon :size="size" :style="iconFullStyle(n)" />
          </slot>
        </span>
      </li>
    </ul>
    <span
      v-if="showText"
      :style="{
        color: textColor,
      }"
      :class="`${name}--text`"
      >{{ rateText }}</span
    >
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, defineComponent, ExtractPropTypes, PropType, ComputedRef } from 'vue';
import TStarIcon from '../icon/star-filled.vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-rate`;

const rateProps = {
  modelValue: Number,
  /**
   * @description 选择评分的值
   * @attribute value
   */
  value: Number,
  /**
   * @description 评分的数量
   * @attribute count
   */
  count: {
    type: Number,
    default: 5,
  },
  /**
   * @description 是否为只读
   * @attribute readonly
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否允许半选
   * @attribute allow-half
   */
  allowHalf: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否允许取消选择
   * @attribute clearable
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 评分图标的颜色
   * @attribute color
   */
  color: String,
  /**
   * @description 是否显示辅助文字
   * @attribute show-text
   */
  showText: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 评分等级对应的辅助文字
   * @attribute texts
   */
  texts: {
    type: Array as PropType<string[]>,
    default: (): string[] => [],
  },
  /**
   * @description 评分等级对应的辅助文字颜色
   * @attribute textColor
   */
  textColor: String,
  /**
   * @description 评分图标的大小
   * @attribute size
   */
  size: String,
};

export type RatePropsType = ExtractPropTypes<typeof rateProps>;

interface RangeTypes {
  score: number;
  left: number;
}

export default defineComponent({
  name,
  components: { TStarIcon },
  props: rateProps,
  emits: ['change', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const rateWrapper = ref<HTMLElement | null>(null);
    const actualVal = computed(() => props.modelValue || props.value) as ComputedRef<number>;
    const rateText = computed(() => {
      if (props.texts.length > 0) {
        return props.texts[actualVal.value - 1];
      }

      return actualVal.value > 0 ? `${actualVal.value} 分` : '';
    });

    const iconHalfStyle = (n: number) => ({
      color: actualVal.value + 0.5 === n || actualVal.value >= n ? props.color : null
    });
    const iconFullStyle = (n: number) => ({
      color: actualVal.value >= n ? props.color : null
    });

    const classes = (n: number) => ({
      [`${name}--item`]: true,
      [`${name}-full`]: actualVal.value >= n,
      [`${name}-half`]: actualVal.value + 0.5 === n,
    });

    function emit(val: number) {
      context.emit('change', val);
      context.emit('update:modelValue', val);
    }

    function onClick(current: number) {
      if (props.readonly) return;
      emit(props.clearable && actualVal.value === current ? 0 : current);
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
      if (props.readonly) return;

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

      emit(score);
    }

    return {
      name: ref(name),
      classes,
      rateWrapper,
      actualVal,
      iconHalfStyle,
      iconFullStyle,
      rateText,
      onClick,
      onTouchstart,
      onTouchmove,
    };
  },
});
</script>
