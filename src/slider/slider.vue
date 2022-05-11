<template>
  <div ref="rootRef" :class="classes">
    <template v-if="!range">
      <div :class="`${name}`" @click="onClick">
        <!-- 总长度 -->
        <div ref="barRef" :class="`${name}__bar`"></div>
        <!-- 滑块长度 -->
        <div :class="`${name}__track`" :style="`width:${value[0]}%`"></div>
        <!-- 滑块操作 -->
        <div
          v-for="(item, index) in value"
          :key="index + 1"
          :class="handleClass"
          :style="`left:${value[index]}%`"
          @touchstart="onTouchStart($event, index)"
          @touchmove="onTouchMove($event, index)"
          @touchend="onTouchEnd($event, index)"
        ></div>
        <!-- 刻度内容 -->
        <div v-if="marks" :class="`${name}__mark`">
          <div v-for="(v, k) in marks" :key="k" :class="`${name}__mark-text`" :style="`left:${k}%`" v-text="v"></div>
        </div>
      </div>
      <template v-if="showExtremeValue">
        <div v-for="(item, index) in value" :key="index" :class="`${name}-wrap__value`" v-text="item"></div>
      </template>
    </template>
    <template v-else>
      <div :class="`${name}`" @click="onClick">
        <!-- 总长度 -->
        <div ref="barRef" :class="`${name}__bar`"></div>
        <!-- 滑块长度 -->
        <div :class="`${name}__track`" :style="`left:${value[0]}%;width:${value[1] - value[0]}%`"></div>
        <!-- 滑块操作 -->
        <div
          v-for="(item, index) in value"
          :key="index + 1"
          :class="handleClass"
          :style="`left:${value[index]}%`"
          @touchstart="onTouchStart($event, index)"
          @touchmove="onTouchMove($event, index)"
          @touchend="onTouchEnd($event, index)"
        ></div>
        <!-- 刻度内容 -->
        <div :class="`${name}__mark`">
          <div
            v-for="(item, index) in value"
            :key="index"
            :class="`${name}__mark-text`"
            :style="`left:${value[index]}%`"
            v-text="item"
          ></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, computed, SetupContext, reactive, defineComponent } from 'vue';
import config from '../config';
import props from './props';
import useVModel from '../hooks/useVModel';

const { prefix } = config;
const name = `${prefix}-slider`;

// label\showExtremeValue => showValue\value\defaultValue

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
  emits: ['drag-start', 'drag-end', 'update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const rootRef = ref<HTMLElement | null>(null);
    const barRef = ref<HTMLElement | null>(null);

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
      const arr: Array<number> = [];
      if (!props.range && props.marks) {
        Object.keys(props.marks).forEach((item) => {
          arr.push(parseInt(item, 10));
        });
      }
      return arr.sort((a, b) => a - b);
    });

    const dragStatus = ref<string>('');
    const { value, modelValue } = toRefs(props);

    // const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const touchData = reactive<TouchData>({
      startValue: 0,
      newValue: 0,
      startX: 0,
      deltaX: 0,
      offsetX: 0,
    });

    function onTouchStart(event: TouchEvent, index: number) {
      if (props.disabled) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      touchData.deltaX = 0;
      touchData.offsetX = 0;
      touchData.startX = event.touches[0].clientX;
      touchData.startValue = format(value.value[index]);
      dragStatus.value = 'start';
    }

    function onTouchMove(event: TouchEvent, index: number) {
      if (props.disabled) return;
      if (!rootRef.value) return;

      event.stopPropagation();
      event.preventDefault();
      if (dragStatus.value === 'start') {
        context.emit('drag-start');
      }
      const touch = event.touches[0];
      touchData.deltaX = touch.clientX - touchData.startX;
      touchData.offsetX = Math.abs(touchData.deltaX);
      dragStatus.value = 'dragging';

      const rect = rootRef.value.getBoundingClientRect();
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
      if (props.range) {
        if (Math.abs(current - value.value[0]) > Math.abs(current - value.value[1])) {
          index = 1;
        }
      }
      touchData.startValue = value.value[index];
      updateValue(current, index, true);
    }

    function format(value: number): number {
      let current = value;
      if (!props.range && props.marks) {
        if (marksData?.value?.length) {
          let min = marksData.value[0];
          marksData.value.forEach((marksDataItemValue) => {
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
      if (props.range) {
        if (end && formatValue !== touchData.startValue) {
          value.value[index] = formatValue;
          value.value = value.value.sort((a, b) => a - b);
          context.emit('update:modelValue', value);
          context.emit('change', value);
        } else if (formatValue !== touchData.startValue) {
          value.value[index] = formatValue;
        }
      } else if (end && formatValue !== touchData.startValue) {
        value.value = [formatValue];
        context.emit('update:modelValue', formatValue);
        context.emit('change', formatValue);
      } else if (formatValue !== touchData.startValue) {
        value.value = [formatValue];
      }
    }

    return {
      name: ref(name),
      rootRef,
      barRef,
      value,
      classes,
      handleClass,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onClick,
    };
  },
});
</script>
