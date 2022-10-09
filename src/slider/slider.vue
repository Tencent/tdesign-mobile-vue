<template>
  <div ref="rootRef" :class="classes">
    <div v-if="showExtremeValue" :class="`${name}-wrap__value--left`">{{ min }}</div>
    <div :class="`${name}`" @click="onClick">
      <!-- 总长度 -->
      <div ref="barRef" :class="`${name}__bar`"></div>
      <!-- 滑块长度 -->
      <div :class="`${name}__track`" :style="trackStyle"></div>
      <!-- 滑块操作 -->
      <div
        v-for="(item, index) in dots"
        :key="index + 1"
        :class="handleClass"
        :style="`left:${getPercentage(item)}%`"
        @touchstart="onTouchStart($event, item)"
        @touchmove="onTouchMove($event, index)"
        @touchend="onTouchEnd($event, index)"
      ></div>
      <!-- 刻度内容 -->
      <div v-if="marksData" :class="`${name}__mark`">
        <div
          v-for="(v, k) in marksData"
          :key="k"
          :class="`${name}__mark-text t-is-${value && value > v[0] ? 'active' : ''}`"
          :style="`left: ${getPercentage(v[0])}%`"
        >
          {{ typeof v[1] === 'function' ? v[1](v[0]) : v[1] }}
        </div>
      </div>
    </div>
    <div v-if="labelContent" :class="`${name}-wrap__value`">
      <t-node :content="labelContent"></t-node>
    </div>
    <div v-if="showExtremeValue" :class="`${name}-wrap__value`">{{ max }}</div>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, computed, SetupContext, reactive, defineComponent, getCurrentInstance } from 'vue';
import config from '../config';
import props from './props';
import { useVModel } from '../shared/useVModel';
import { renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-slider`;
const { isArray } = Array;

export interface TouchData {
  startValue: number;
  newValue: number;
  startX: number;
  deltaX: number;
  offsetX: number;
}

export default defineComponent({
  name,
  components: { TNode },
  props,
  emits: ['drag-start', 'drag-end', 'update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const rootRef = ref<HTMLElement | null>(null);
    const barRef = ref<HTMLElement | null>(null);
    const defaultValue = props.defaultValue || props.min;
    const { value, modelValue, max, min } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, defaultValue, props.onChange);
    const internalInstance = getCurrentInstance();
    const labelContent = computed(
      () =>
        !props.range &&
        props.label &&
        (typeof renderTNode(internalInstance, 'label') === 'object'
          ? renderTNode(internalInstance, 'label')
          : `${innerValue.value}`),
    );

    const isRange = computed(() => {
      return props.range && isArray(innerValue.value) && innerValue.value.length === 2;
    });
    const dots = computed(() => {
      if (isRange.value) return innerValue.value;

      if (typeof innerValue.value === 'number') return [innerValue.value];
      return [];
    });

    const classes = computed(() => [
      `${name}-wrap`,
      {
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-is-mark`]: props.marks,
        [`${prefix}-is-value`]: props.showExtremeValue,
      },
    ]);
    const handleClass = computed(() => [`${name}__handle`]);
    const marksData = computed(() => {
      const sorter = (a: number[], b: number[]) => a[0] - b[0];
      if (!props.range && props.marks) {
        if (isArray(props.marks)) {
          return props.marks.map((val: number) => [val, val]).sort(sorter);
        }
        return Object.entries(props.marks)
          .map(([key, value]) => [parseInt(key, 10), value])
          .sort(sorter);
      }
      return [];
    });

    const dragStatus = ref<string>('');
    const touchData = reactive<TouchData>({
      startValue: 0,
      newValue: 0,
      startX: 0,
      deltaX: 0,
      offsetX: 0,
    });

    function onTouchStart(event: TouchEvent, value: number) {
      if (props.disabled) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      touchData.deltaX = 0;
      touchData.offsetX = 0;
      touchData.startX = event.touches[0].clientX;
      touchData.startValue = format(value);
      dragStatus.value = 'start';
    }

    function onTouchMove(event: TouchEvent, index: number) {
      if (props.disabled) return;
      if (!barRef.value) return;

      event.stopPropagation();
      event.preventDefault();
      if (dragStatus.value === 'start') {
        context.emit('drag-start');
      }
      const touch = event.touches[0];
      touchData.deltaX = touch.clientX - touchData.startX;
      touchData.offsetX = Math.abs(touchData.deltaX);
      dragStatus.value = 'dragging';

      const rect = barRef.value.getBoundingClientRect();
      const delta = touchData.deltaX;
      const total = rect.width;
      const diff = (delta / total) * (props.max - props.min);

      touchData.newValue = touchData.startValue + diff;
      updateValue(touchData.newValue, index);
    }

    function onTouchEnd(event: TouchEvent, index: number) {
      if (props.disabled) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      if (dragStatus.value === 'dragging') {
        updateValue(touchData.newValue, index, true);
        context.emit('drag-end');
      }

      dragStatus.value = '';
    }

    function onClick(event: MouseEvent) {
      event.stopPropagation();

      if (props.disabled) return;
      if (!barRef.value) return;

      const rect = barRef.value.getBoundingClientRect();
      const delta = event.clientX - rect.left;
      const total = rect.width;
      const current = +props.min + (delta / total) * (props.max - props.min);

      let index = 0;
      if (props.range && innerValue.value) {
        if (Math.abs(current - innerValue.value[0]) > Math.abs(current - innerValue.value[1])) {
          index = 1;
        }
      }

      touchData.startValue = innerValue.value?.[index];
      updateValue(current, index, true);
    }

    function format(value: number): number {
      let current = value;
      if (!props.range && props.marks) {
        if (marksData?.value?.length) {
          let [min] = marksData.value[0];
          marksData.value.forEach(([marksDataItemValue]) => {
            if (Math.abs(marksDataItemValue - value) < Math.abs(min - value)) {
              min = marksDataItemValue;
            }
          });
          current = min;
        }
      }
      return Math.round(Math.max(props.min, Math.min(current, props.max)) / props.step) * props.step;
    }

    function updateValue(newValue: number, index: number, end = false) {
      const formatValue = format(newValue);
      if (props.range && Array.isArray(innerValue.value)) {
        const tmpValue = [...innerValue.value];
        tmpValue[index] = formatValue;

        if (end && formatValue !== touchData.startValue) {
          tmpValue.sort((a, b) => a - b);
          setInnerValue(tmpValue);
        } else if (formatValue !== touchData.startValue) {
          setInnerValue(tmpValue);
        }
      } else if (formatValue !== touchData.startValue) {
        setInnerValue(formatValue);
      }
    }

    const getPercentage = (value: number | undefined): number =>
      ((value ? value - props.min : 0) / (props.max - props.min)) * 100;
    const trackStyle = computed(() => {
      if (props.range && isArray(innerValue.value)) {
        return {
          left: `${getPercentage(Math.min(innerValue.value[0], innerValue.value[1]))}%`,
          width: `${getPercentage(Math.abs(innerValue.value[1] - innerValue.value[0]))}%`,
        };
      }
      if (!isArray(innerValue.value)) {
        return {
          width: `${getPercentage(innerValue.value)}%`,
        };
      }
      return {};
    });

    return {
      max,
      min,
      name: ref(name),
      marksData,
      rootRef,
      barRef,
      dots,
      value: innerValue,
      labelContent,
      classes,
      handleClass,
      trackStyle,
      getPercentage,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onClick,
    };
  },
});
</script>
