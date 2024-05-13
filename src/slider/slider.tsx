import { ref, toRefs, computed, reactive, defineComponent, getCurrentInstance, watch, onMounted } from 'vue';
import config from '../config';
import props from './props';
import { useVModel } from '../shared/useVModel';
import { renderTNode } from '../shared';
import { trimSingleValue, trimValue } from './tool';
import type { SliderValue } from './type';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

type dataType = {
  initialLeft: number;
  initialRight: number;
  maxRange: number;
  lineLeft: number;
  lineRight: number;
  dotTopValue: number[];
  blockSize: number;
  isScale: boolean;
  scaleArray: any[];
  scaleTextArray: any[];
};

export interface TouchData {
  startValue: number;
  newValue: number;
  startX: number;
  deltaX: number;
  offsetX: number;
}

export default defineComponent({
  name: `${prefix}-slider`,
  props,
  setup(props) {
    const sliderClass = usePrefixClass('slider');
    const disabled = useFormDisabled();
    const sliderLine = ref<HTMLElement>();
    const leftDot = ref<HTMLElement>();
    const rightDot = ref<HTMLElement>();
    const state: dataType = reactive({
      initialLeft: 0,
      initialRight: 0,
      maxRange: 0,
      lineLeft: 0,
      lineRight: 0,
      dotTopValue: [0, 0],
      blockSize: 20,
      isScale: false,
      scaleArray: [],
      scaleTextArray: [],
    });
    const defaultValue = props.defaultValue || props.min;
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, defaultValue, props.onChange);
    const scope = computed(() => Number(props.max) - Number(props.min));

    watch(
      () => innerValue.value,
      (val) => {
        if (props.range) {
          const left = (state.maxRange * (val[0] - props.min)) / scope.value;
          const right = (state.maxRange * (props.max - val[1])) / scope.value;
          // 因为要计算点相对于线的绝对定位，所以要取整条线的长度而非可滑动的范围
          setLineStyle(left, right);
        } else {
          setSingleBarWidth(val as number);
        }
      },
    );
    const rootRef = ref<HTMLDivElement>();

    const classes = computed(() => [
      `${sliderClass.value}`,
      {
        [`${sliderClass.value}--top`]: props.label || state.scaleTextArray.length,
        [`${sliderClass.value}--disabled`]: disabled.value,
        [`${sliderClass.value}--range`]: props.range,
      },
    ]);

    const sliderLineClasses = computed(() => [
      `${sliderClass.value}__bar`,
      `${sliderClass.value}__bar--${props.theme}`,
      {
        [`${sliderClass.value}__bar--disabled`]: disabled.value,
        [`${sliderClass.value}__bar--marks`]: state.isScale && props.theme === 'capsule',
      },
    ]);

    const precision = computed(() => {
      const precisions = [props.min, props.max, props.step].map((item) => {
        const decimalArr = `${item}`.split('.');
        return decimalArr[1] ? decimalArr[1].length : 0;
      });
      return Math.max.apply(null, precisions);
    });

    const lineBarWidth = ref<number>();
    const setSingleBarWidth = (value: number) => {
      const halfBlock = props.theme === 'capsule' ? Number(state.blockSize) / 2 : 0;
      const percentage = (Number(value) - props.min) / scope.value;
      lineBarWidth.value = percentage * state.maxRange + halfBlock;
    };

    const setLineStyle = (left: number, right: number) => {
      const halfBlock = (props.theme as string) === 'capsule' ? Number(state.blockSize) / 2 : 0;
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
      if (props.theme === 'capsule') {
        state.maxRange = maxRange - Number(state.blockSize) - 6; // 6 是边框宽度
        state.initialLeft -= halfBlock;
        state.initialRight -= halfBlock;
      }
    };

    const onTouchEnd = () => {};

    const onSingleDotMove = (e: TouchEvent) => {
      if (disabled.value) return;
      const [{ pageX }] = e.changedTouches;
      const value = convertPosToValue(pageX - state.initialLeft);
      changeValue(calcByStep(value));
    };

    const changeValue = (value: SliderValue) => {
      setInnerValue(trimValue(value, props));
    };

    const calcByStep = (value: number): number => {
      if (props.step < 0 || props.step > scope.value) return Number(parseFloat(`${value}`).toFixed(precision.value));
      const closestStep = trimSingleValue(Math.round(value / props.step) * props.step, props.min, props.max);

      return Number(parseFloat(`${closestStep}`).toFixed(precision.value));
    };

    const getValue = (label: any, value: any) => {
      const REGEXP = /[$][{value}]{7}/;
      if (label && label === 'true') return value;
      if (REGEXP.test(label)) return label.replace(REGEXP, value);
    };

    const handleMask = (marks: any) => {
      const calcPos = (arr: number[]) => {
        const margin = (props.theme as any) === 'capsule' ? state.blockSize / 2 : 0;
        return arr.map((item) => ({
          val: item,
          left: Math.round(((item - props.min) / scope.value) * state.maxRange) + margin,
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

    const convertPosToValue = (posValue: number, isLeft = true) => {
      const raw = isLeft
        ? (posValue / state.maxRange) * scope.value + props.min
        : props.max - (posValue / state.maxRange) * scope.value;

      return raw;
    };

    const onTouchMoveLeft = (e: TouchEvent) => {
      if (disabled.value) return;
      const [{ pageX }] = e.changedTouches;
      const currentLeft = pageX - state.initialLeft;
      const newData = [...(innerValue.value as number[])];
      const leftValue = convertPosToValue(currentLeft);
      newData[0] = calcByStep(leftValue);
      changeValue(newData);
    };

    const onTouchMoveRight = (e: TouchEvent) => {
      if (disabled.value) return;
      const [{ pageX }] = e.changedTouches;
      const currentRight = -(pageX - state.initialRight);
      const newData = [...(innerValue.value as number[])];
      const rightValue = convertPosToValue(currentRight, false);
      newData[1] = calcByStep(rightValue);
      changeValue(newData);
    };

    const handleSingleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (disabled.value) return;
      if (!sliderLine.value) return;
      const currentLeft = e.clientX - state.initialLeft;
      const value = convertPosToValue(currentLeft);
      changeValue(calcByStep(value));
    };

    const handleRangeClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (disabled.value) return;
      const halfBlock = props.theme === 'capsule' ? Number(state.blockSize) / 2 : 0;
      const currentLeft = e.clientX - state.initialLeft;
      if (currentLeft < 0 || currentLeft > state.maxRange + Number(state.blockSize)) return;

      const leftDotValue = leftDot.value?.getBoundingClientRect() as DOMRect;
      const rightDotValue = rightDot.value?.getBoundingClientRect() as DOMRect;
      // 点击处-halfblock 与 leftDot左侧的距离（绝对值）
      const distanceLeft = Math.abs(e.clientX - leftDotValue.left - halfBlock);
      // 点击处-halfblock 与 rightDot左侧的距离（绝对值）
      const distanceRight = Math.abs(rightDotValue.left - e.clientX + halfBlock);
      // 哪个绝对值小就移动哪个Dot
      const isMoveLeft = distanceLeft < distanceRight;

      if (isMoveLeft) {
        // 当前leftdot中心 + 左侧偏移量 = 目标左侧中心距离
        const left = e.clientX - state.initialLeft;
        const leftValue = convertPosToValue(left);
        changeValue([calcByStep(leftValue), innerValue.value?.[1]]);
      } else {
        const right = -(e.clientX - state.initialRight);
        const rightValue = convertPosToValue(right, false);
        changeValue([innerValue.value?.[0], calcByStep(rightValue)]);
      }
    };

    onMounted(() => {
      getInitialStyle();

      if (props.range) {
        const left = (state.maxRange * (innerValue.value?.[0] ?? 0 - props.min)) / scope.value;
        const right = (state.maxRange * (props.max - innerValue.value[1])) / scope.value;
        // 因为要计算点相对于线的绝对定位，所以要取整条线的长度而非可滑动的范围
        setLineStyle(left, right);
      } else {
        setSingleBarWidth(innerValue.value as number);
      }
      if (props.marks) {
        handleMask(props.marks);
      }
    });

    const readerMinText = () => {
      if (!props.showExtremeValue) {
        return null;
      }
      const textClass = {
        [`${sliderClass.value}__value`]: !props.range,
        [`${sliderClass.value}__value--min`]: !props.range,
        [`${sliderClass.value}__range-extreme`]: props.range,
        [`${sliderClass.value}__range-extreme--min`]: props.range,
      };
      if (props.range) {
        return <text class={textClass}>{props.min}</text>;
      }
      return <text class={textClass}>{props.label ? getValue(props.label, props.min) : props.min}</text>;
    };
    const readerMaxText = () => {
      if (!props.showExtremeValue) {
        return null;
      }
      const textClass = [`${sliderClass.value}__value`, `${sliderClass.value}__value--max`];
      if (props.range) {
        return <text class={textClass}>{props.max}</text>;
      }
      return <text class={textClass}>{props.label ? getValue(props.label, props.max) : props.max}</text>;
    };

    const readerScale = () => {
      if (!state.isScale) {
        return null;
      }
      return state.scaleArray.map((item, index) => {
        return (
          <div
            style={`left: ${item.left}px; transform: translateX(-50%);`}
            class={[
              `${sliderClass.value}__scale-item`,
              `${sliderClass.value}__scale-item--${props.theme}`,
              {
                [`${sliderClass.value}__scale-item--active`]: !props.range && Number(innerValue.value) >= item.val,
                [`${sliderClass.value}__scale-item--active`]:
                  props.range && state.dotTopValue[1] >= item.val && item.val >= state.dotTopValue[0],
                [`${sliderClass.value}__scale-item--disabled`]: disabled.value,
                [`${sliderClass.value}__scale-item--hidden`]:
                  ((index === 0 || index === state.scaleArray.length - 1) && props.theme === 'capsule') ||
                  innerValue.value === item.val,
              },
            ]}
          >
            {state.scaleTextArray.length && (
              <div class={[`${sliderClass.value}__scale-desc`, `${sliderClass.value}__scale-desc--${props.theme}`]}>
                {state.scaleTextArray[index]}
              </div>
            )}
          </div>
        );
      });
    };
    const readerLineSingle = () => {
      return (
        <div
          class={[
            `${sliderClass.value}__line`,
            `${sliderClass.value}__line--${props.theme}`,
            `${sliderClass.value}__line--single`,
            { [`${sliderClass.value}__line--disabled`]: disabled.value },
          ]}
          style={`width: ${lineBarWidth.value}px`}
        >
          <div
            ref="singleDot"
            class={`${sliderClass.value}__dot`}
            onTouchmove={onSingleDotMove}
            onTouchend={onTouchEnd}
            onTouchcancel={onTouchEnd}
          >
            {props.label && (
              <div
                class={[
                  `${sliderClass.value}__dot-value`,
                  { [`${sliderClass.value}__dot-value--sr-only`]: !props.label },
                ]}
              >
                {getValue(props.label, innerValue.value) || innerValue.value}
              </div>
            )}
            <div class={`${sliderClass.value}__dot-slider`}></div>
          </div>
        </div>
      );
    };
    const readerLineRange = () => {
      return (
        <div
          class={[
            `${sliderClass.value}__line`,
            `${sliderClass.value}__line--${props.theme}`,
            { [`${sliderClass.value}__line--disabled`]: disabled.value },
          ]}
          style={`left: ${state.lineLeft}px; right: ${state.lineRight}px`}
        >
          <div
            ref={leftDot}
            class={[`${sliderClass.value}__dot`, `${sliderClass.value}__dot--left`]}
            onTouchmove={onTouchMoveLeft}
            onTouchend={onTouchEnd}
            onTouchcancel={onTouchEnd}
          >
            {props.label && (
              <div
                class={[
                  `${sliderClass.value}__dot-value`,
                  { [`${sliderClass.value}__dot-value--sr-only`]: !props.label },
                ]}
              >
                {getValue(props.label, state.dotTopValue[0]) || state.dotTopValue[0]}
              </div>
            )}
            <div class={`${sliderClass.value}__dot-slider`}></div>
          </div>
          <div
            ref={rightDot}
            class={[`${sliderClass.value}__dot`, `${sliderClass.value}__dot--right`]}
            onTouchmove={onTouchMoveRight}
            onTouchend={onTouchEnd}
            onTouchcancel={onTouchEnd}
          >
            {props.label && (
              <div
                class={[
                  `${sliderClass.value}__dot-value`,
                  { [`${sliderClass.value}__dot-value--sr-only`]: !props.label },
                ]}
              >
                {getValue(props.label, state.dotTopValue[1]) || state.dotTopValue[1]}
              </div>
            )}
            <div class={`${sliderClass.value}__dot-slider`}></div>
          </div>
        </div>
      );
    };

    return () => {
      return (
        <div ref={rootRef} class={classes.value}>
          {readerMinText()}
          <div
            ref={sliderLine}
            class={sliderLineClasses.value}
            onClick={props.range ? handleRangeClick : handleSingleClick}
          >
            {readerScale()}
            {props.range ? readerLineRange() : readerLineSingle()}
          </div>
          {readerMaxText()}
        </div>
      );
    };
  },
});
