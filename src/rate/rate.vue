<template>
  <div :class="`${name}`">
    <ul
      :class="`${name}--list`"
      ref="rateWrapper"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
    >
      <li :class="classes(n)" v-for="n in count" :key="n">
        <template v-if="allowHalf">
          <span :class="`${name}--icon-left`" @click="onClick(n - 0.5)">
            <slot name="icon">
              <t-icon icon="star" />
            </slot>
          </span>
          <span :class="`${name}--icon-right`" @click="onClick(n)">
            <slot name="icon">
              <t-icon icon="star" />
            </slot>
          </span>
        </template>
        <span v-else :class="`${name}--icon`" @click="onClick(n)">
          <slot name="icon">
            <t-icon icon="star" />
          </slot>
        </span>
      </li>
    </ul>
    <span
      v-if="showText"
      :style="{
        color: textColor
      }"
      :class="`${name}--text`"
    >{{rateText}}</span>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext } from 'vue';
import TIcon from '../icon';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-rate`;

interface RateProps {
  value: Number;
  count: Number;
  readonly: Boolean;
  allowHalf: Boolean;
  clearable: Boolean;
  color: String;
  showText: Boolean;
  texts: Array;
  textColor: String;
  icon: String;
  size: String;
}

interface RangeTypes {
  score: number;
  left: number;
}

export default {
  name,
  component: { TIcon },
  props: {
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
      type: Array,
      default: () => [],
    },
    /**
     * @description 评分等级对应的辅助文字
     * @attribute texts
     */
    textColor: String,
    /**
     * @description 评分图标的class类名
     * @attribute icon
     */
    icon: {
      type: String,
      default: 'start',
    },
    /**
     * @description 评分图标的大小
     * @attribute size
     */
    size: String,
  },
  setup(props: RateProps, context: SetupContext) {
    const rateWrapper = ref(null);
    const actualVal: number = computed(() => props.modelValue || props.value);
    const rateText: string = computed(() => {
      if (props.texts.length > 0) {
        return props.texts[actualVal.value - 1];
      }

      return actualVal.value > 0 ? `${actualVal.value} 分` : '';
    });

    const classes = n => ({
      [`${name}--item`]: true,
      [`${name}-full`]: actualVal.value >= n,
      [`${name}-half`]: actualVal.value + 0.5 === n,
    });

    function emit(val) {
      context.emit('change', val);
      context.emit('update:modelValue', val);
    }

    function onClick(current) {
      if (props.readonly) return;
      emit(props.clearable && actualVal.value === current ? 0 : current);
    }

    let ranges: Array<RangeTypes> = [];
    function onTouchstart() {
      ranges = [];
      const items: HTMLCollection = rateWrapper.value.children;
      Array.from(items).forEach((node: HTMLElement, index: number) => {
        const { left, width } = node.getBoundingClientRect();
        if (props.allowHalf) {
          ranges.push(
            { score: index + 0.5, left },
            { score: index + 1, left: left + width / 2 },
          );
        } else {
          ranges.push({ score: index + 1, left });
        }
      });
    }

    function onTouchmove(e) {
      if (this.readonly) return;

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
      rateText,
      onClick,
      onTouchstart,
      onTouchmove,
    };
  },
};
</script>
