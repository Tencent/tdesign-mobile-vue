<template>
  <div ref="rootRef" :class="classes">
    <template v-if="!range">
      <text v-if="showExtremeValue" :class="[`${name}__value`, `${name}__value--min`]">{{
        label ? getValue(label, min) : min
      }}</text>
      <div ref="sliderLine" :class="sliderLineClasses">
        <template v-if="state.isScale">
          <div
            v-for="(item, index) in state.scaleArray"
            :key="index"
            :style="`left: ${item.left}px; transform: translateX(-50%);`"
            :class="[
              `${name}__scale-item`,
              `${name}__scale-item--${theme}`,
              {
                [`${name}__scale-item--active`]: Number(value) >= item.val,
                [`${name}__scale-item--disabled`]: disabled,
                [`${name}__scale-item--hidden`]:
                  ((index == 0 || index == state.scaleArray.length - 1) && theme == 'capsule') || value == item.val,
              },
            ]"
          >
            <div v-if="state.scaleTextArray.length" :class="[`${name}__scale-desc`, `${name}__scale-desc--${theme}`]">
              {{ state.scaleTextArray[index] }}
            </div>
          </div>
        </template>
        <div
          :class="[
            `${name}__line`,
            `${name}__line--${theme}`,
            `${name}__line--single`,
            { [`${name}__line--disabled`]: disabled },
          ]"
          :style="`width: ${lineBarWidth}px`"
        >
          <div
            ref="singleDot"
            :class="`${name}__dot`"
            @touchmove="onSingleLineTap"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
          >
            <div v-if="label" :class="[`${name}__dot-value`, { [`${name}__dot-value--sr-only`]: !label }]">
              {{ getValue(label, value) || value }}
            </div>
            <div :class="`${name}__dot-slider`"></div>
          </div>
        </div>
      </div>
      <text v-if="showExtremeValue" :class="[`${name}__value`, `${name}__value--max`]">
        {{ label ? getValue(label, max) : max }}
      </text>
    </template>
    <template v-if="range">
      <text v-if="showExtremeValue" :class="[`${name}__range-extreme`, `${name}__range-extreme--min`]">{{ min }}</text>
      <div ref="sliderLine" :class="sliderLineClasses">
        <template v-if="state.isScale">
          <div
            v-for="(item, index) in state.scaleArray"
            :key="index"
            :style="`left: ${item.left}px; transform: translateX(-50%);`"
            :class="[
              `${name}__scale-item`,
              `${name}__scale-item--${theme}`,
              {
                [`${name}__scale-item--active`]: state.dotTopValue[1] >= item.val && item.val >= state.dotTopValue[0],
                [`${name}__scale-item--disabled`]: disabled,
                [`${name}__scale-item--hidden`]:
                  ((index == 0 || index == state.scaleArray.length - 1) && theme == 'capsule') || value == item.val,
              },
            ]"
          >
            <div v-if="state.scaleTextArray.length" :class="[`${name}__scale-desc`, `${name}__scale-desc--${theme}`]">
              {{ state.scaleTextArray[index] }}
            </div>
          </div>
        </template>
        <div
          :class="[`${name}__line`, `${name}__line--${theme}`, { [`${name}__line--disabled`]: disabled }]"
          :style="`left: ${state.lineLeft}px; right: ${state.lineRight}px`"
        >
          <div
            ref="leftDot"
            :class="[`${name}__dot`, `${name}__dot--left`]"
            @touchmove="onTouchMoveLeft"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
          >
            <div v-if="label" :class="[`${name}__dot-value`, { [`${name}__dot-value--sr-only`]: !label }]">
              {{ getValue(label, state.dotTopValue[0]) || state.dotTopValue[0] }}
            </div>
            <div :class="`${name}__dot-slider`"></div>
          </div>
          <div
            ref="rightDot"
            :class="[`${name}__dot`, `${name}__dot--right`]"
            @touchmove="onTouchMoveRight"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
          >
            <div v-if="label" :class="[`${name}__dot-value`, { [`${name}__dot-value--sr-only`]: !label }]">
              {{ getValue(label, state.dotTopValue[1]) || state.dotTopValue[1] }}
            </div>
            <div :class="`${name}__dot-slider`"></div>
          </div>
        </div>
      </div>
      <text v-if="showExtremeValue" :class="[`${name}__value`, `${name}__value--max`]">{{ max }}</text>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, computed, reactive, defineComponent, getCurrentInstance, provide, watch, onMounted } from 'vue';
import config from '../config';
import props from './props';
import { useVModel } from '../shared/useVModel';
import { renderTNode, TNode, useEmitEvent } from '../shared';
import { trimSingleValue, trimValue } from './tool';
import type { SliderValue } from './type';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-slider`;

type dataType = {
  sliderStyles: string;
  classPrefix: string;
  initialLeft: number;
  initialRight: number;
  activeLeft: number;
  activeRight: number;
  maxRange: number;
  lineLeft: number;
  lineRight: number;
  dotTopValue: number[];
  blockSize: number;
  isScale: boolean;
  scaleArray: any[];
  scaleTextArray: any[];
  _value: SliderValue;
  prefix: string;
  isVisibleToScreenReader: boolean;
};

export interface TouchData {
  startValue: number;
  newValue: number;
  startX: number;
  deltaX: number;
  offsetX: number;
}

export default defineComponent({
  name,
  props,
  emits: ['change'],
  setup(props, context) {
    const disabled = useFormDisabled();
    const sliderLine = ref<HTMLElement>();
    const rootRef = ref<HTMLElement>();
    const state: dataType = reactive({
      // 按钮样式列表
      sliderStyles: '',
      classPrefix: name,
      initialLeft: 0,
      initialRight: 0,
      activeLeft: 0,
      activeRight: 0,
      maxRange: 0,
      lineLeft: 0,
      lineRight: 0,
      dotTopValue: [0, 0],
      _value: 0,
      blockSize: 20,
      isScale: false,
      scaleArray: [],
      scaleTextArray: [],
      prefix,
      isVisibleToScreenReader: false,
    });
    const emitEvent = useEmitEvent(props, context.emit);

    const defaultValue = props.defaultValue || props.min;
    const { value, modelValue, label, max, min, theme, marks, step, range } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, defaultValue, props.onChange);

    watch(
      () => innerValue.value,
      (val: any) => {
        if (range.value) {
          const left = (state.maxRange * (val[0] - Number(min.value))) / (Number(max.value) - Number(min.value));
          const right = (state.maxRange * (Number(max.value) - val[1])) / (Number(max.value) - Number(min.value));
          // 因为要计算点相对于线的绝对定位，所以要取整条线的长度而非可滑动的范围
          setLineStyle(left, right);
        } else {
          setSingleBarWidth(val as number);
        }
      },
    );

    const internalInstance = getCurrentInstance();
    const labelContent = computed(
      () =>
        !range.value &&
        label.value &&
        (typeof renderTNode(internalInstance, 'label') === 'object'
          ? renderTNode(internalInstance, 'label')
          : `${innerValue.value}`),
    );

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--top`]: label.value || state.scaleTextArray.length,
        [`${name}--disabled`]: disabled.value,
        [`${name}--range`]: range.value,
      },
    ]);

    const sliderLineClasses = computed(() => [
      `${name}__bar`,
      `${name}__bar--${theme.value}`,
      {
        [`${name}__bar--disabled`]: disabled.value,
        [`${name}__bar--marks`]: state.isScale && theme.value === 'capsule',
      },
    ]);

    const lineBarWidth = ref<number>();
    const setSingleBarWidth = (value: number) => {
      const halfBlock = theme.value === 'capsule' ? Number(state.blockSize) / 2 : 0;
      const percentage = (Number(value) - Number(min.value)) / (Number(max.value) - Number(min.value));
      lineBarWidth.value = percentage * state.maxRange + halfBlock;
    };

    onMounted(() => {
      getInitialStyle();
      if (range.value) {
        const left = // @ts-ignore
          (state.maxRange * (innerValue.value[0] - Number(min.value))) / (Number(max.value) - Number(min.value));
        const right = // @ts-ignore
          (state.maxRange * (Number(max.value) - innerValue.value[1])) / (Number(max.value) - Number(min.value));
        // 因为要计算点相对于线的绝对定位，所以要取整条线的长度而非可滑动的范围
        setLineStyle(left, right);
      } else {
        setSingleBarWidth(innerValue.value as number);
      }
      if (marks.value) {
        handleMask(marks.value);
      }
    });

    const setLineStyle = (left: number, right: number) => {
      const halfBlock = (theme.value as string) === 'capsule' ? Number(state.blockSize) / 2 : 0;
      const [a, b] = innerValue.value as any;
      const cut = (v: any) => parseInt(v, 10);

      state.dotTopValue = [a, b];

      if (left + right <= state.maxRange) {
        state.lineLeft = cut(left + halfBlock);
        state.lineRight = cut(right + halfBlock);
      } else {
        state.lineLeft = cut(state.maxRange + halfBlock - right);
        state.lineRight = cut(state.maxRange - left + halfBlock * 1.5);
      }
    };

    const getInitialStyle = () => {
      const line = sliderLine.value?.getBoundingClientRect() as DOMRect;
      const halfBlock = Number(state.blockSize) / 2;
      const maxRange = line.right - line.left;
      state.maxRange = maxRange;
      state.initialLeft = line.left;
      state.initialRight = line.right;
      if (theme.value === 'capsule') {
        state.maxRange = maxRange - Number(state.blockSize) - 6; // 6 是边框宽度
        state.initialLeft -= halfBlock;
        state.initialRight -= halfBlock;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {};

    // 点击滑动条的事件
    const onSingleLineTap = (e: TouchEvent | MouseEvent) => {
      if (disabled.value) return;
      const value = getSingleChangeValue(e as any);
      setInnerValue(value);
      triggerValue(value);
    };

    const getSingleChangeValue = (e: TouchEvent) => {
      const [touch] = e.changedTouches;
      const { pageX } = touch;
      const currentLeft = pageX - state.initialLeft;
      let value = 0;
      if (currentLeft <= 0) {
        value = Number(min.value);
      } else if (currentLeft >= state.maxRange) {
        value = Number(max.value);
      } else {
        value = Math.round(
          (currentLeft / state.maxRange) * (Number(max.value) - Number(min.value)) + Number(min.value),
        );
      }
      return stepValue(value);
    };

    const triggerValue = (value: SliderValue) => {
      emitEvent('change', { value: trimValue(value, props) });
    };

    const stepValue = (value: number): number => {
      if (Number(step.value) < 1 || Number(step.value) > Number(max.value) - Number(min.value)) return value;
      const closestStep = trimSingleValue(
        Math.round(value / Number(step.value)) * Number(step.value),
        Number(min.value),
        Number(max.value),
      );

      return closestStep as number;
    };

    const getValue = (label: any, value: any) => {
      const REGEXP = /[$][{value}]{7}/;
      if (label && label === 'true') return value;
      if (REGEXP.test(label)) return label.replace(REGEXP, value);
    };

    const handleMask = (marks: any) => {
      const calcPos = (arr: number[]) => {
        const margin = (theme.value as any) === 'capsule' ? state.blockSize / 2 : 0;
        return arr.map((item) => ({
          val: item,
          left: Math.round((item / 100) * state.maxRange) + margin,
        }));
      };
      if (marks?.length && Array.isArray(marks)) {
        state.isScale = true;
        state.scaleArray = calcPos(marks);
        state.scaleTextArray = [];
      }

      if (Object.prototype.toString.call(marks) === '[object Object]') {
        const scaleArray = Object.keys(marks).map((item) => Number(item));
        const scaleTextArray = scaleArray.map((item) => marks[item]);
        state.isScale = scaleArray.length > 0;
        state.scaleArray = calcPos(scaleArray);
        state.scaleTextArray = scaleTextArray;
      }
    };

    /**
     * 将位置转换为值
     *
     * @param {number} posValue 位置数据
     * @param {(0 | 1)} dir 方向： 0-left， 1-right
     * @return  {number}
     * @memberof Slider
     */
    const convertPosToValue = (posValue: number, dir: 0 | 1): number => {
      return dir === 0
        ? (posValue / state.maxRange) * (Number(max.value) - Number(min.value)) + Number(min.value)
        : Number(max.value) - (posValue / state.maxRange) * (Number(max.value) - Number(min.value));
    };

    const onTouchMoveLeft = (e: TouchEvent) => {
      if (disabled.value) return;
      const [touch] = e.changedTouches;
      const { pageX } = touch;
      const currentLeft = pageX - state.initialLeft;
      const newData = [...(innerValue.value as number[])];
      const leftValue = convertPosToValue(currentLeft, 0);
      newData[0] = stepValue(leftValue);
      setInnerValue(newData);
      triggerValue(newData);
    };

    const onTouchMoveRight = (e: TouchEvent) => {
      if (disabled.value) return;
      const [touch] = e.changedTouches;
      const { pageX } = touch;
      const currentRight = -(pageX - state.initialRight);
      const newData = [...(innerValue.value as number[])];
      const rightValue = convertPosToValue(currentRight, 1);
      newData[1] = stepValue(rightValue);
      setInnerValue(newData);
      triggerValue(newData);
    };

    return {
      state,
      name: ref(name),
      rootRef,
      sliderLine,
      lineBarWidth,
      value: innerValue,
      labelContent,
      classes,
      sliderLineClasses,
      disabled,
      onTouchEnd,
      onSingleLineTap,
      onTouchMoveLeft,
      onTouchMoveRight,
      getValue,
    };
  },
});
</script>
