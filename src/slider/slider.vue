<template>
  <div :class="classes">
    <template v-if="!range">
      <div :class="`${name}`" @click="onClick">
        <!-- 总长度 -->
        <div ref="bar" :class="`${name}__bar`"></div>
        <!-- 滑块长度 -->
        <div :class="`${name}__track`" :style="`width:${value[0]}%`"></div>
        <!-- 滑块操作 -->
        <div
          :class="handleClass"
          v-for="(item, index) in value"
          :key="index+1"
          :style="`left:${value[index]}%`"
          @touchstart="onTouchStart($event,index)"
          @touchmove="onTouchMove($event,index)"
          @touchend="onTouchEnd($event,index)"
        ></div>
        <!-- 刻度内容 -->
        <div :class="`${name}__mark`" v-if="marks">
          <div
            :class="`${name}__mark-text`"
            v-for="(v, k) in marks"
            :key="k"
            v-text="v"
            :style="`left:${k}%`"
          >
          </div>
        </div>
      </div>
      <template v-if="showValue">
        <div
          :class="`${name}-wrap__value`"
          v-for="(item, index) in value"
          :key="index"
          v-text="item"
        ></div>
      </template>
    </template>
    <template v-else>
      <div :class="`${name}`" @click="onClick">
        <!-- 总长度 -->
        <div ref="bar" :class="`${name}__bar`"></div>
        <!-- 滑块长度 -->
        <div :class="`${name}__track`"
             :style="`left:${value[0]}%;width:${value[1]-value[0]}%`"></div>
        <!-- 滑块操作 -->
        <div
          :class="handleClass"
          v-for="(item, index) in value"
          :key="index+1"
          :style="`left:${value[index]}%`"
          @touchstart="onTouchStart($event,index)"
          @touchmove="onTouchMove($event,index)"
          @touchend="onTouchEnd($event,index)"
        ></div>
        <!-- 刻度内容 -->
        <div :class="`${name}__mark`">
          <div
            :class="`${name}__mark-text`"
            v-for="(item, index) in value"
            :key="index"
            v-text="item"
            :style="`left:${value[index]}%`"
          ></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, reactive } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-slider`;

export interface SliderProps {
  range: boolean;
  marks: {[index:number]:string};
  max: number;
  min: number;
  modelValue: [number, Array<number>];
  showValue: boolean;
  step: number;
  disabled: boolean;
}

export interface TouchData {
  startValue: number;
  newValue: number;
  startX: number;
  deltaX: number;
  offsetX: number;
}

export default {
  name,
  props: {
    range: {
      type: Boolean,
      default: false,
    },
    marks: {
      type: Object,
      default: () => {},
    },
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: [Number, Array],
      default: 0,
    },
    showValue: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: SliderProps, context:SetupContext) {
    const classes = computed(() => [
      `${name}-wrap`,
      {
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-is-mark`]: props.marks,
        [`${prefix}-is-value`]: props.showValue,
      },
    ]);
    const handleClass = computed(() => [
      `${name}__handle`,
    ]);
    const marksData = computed(() => {
      const arr :Array<number> = [];
      if (!props.range && props.marks) {
        Object.keys(props.marks).forEach((item) => {
          arr.push(parseInt(item, 10));
        });
      }
      return arr.sort((a, b) => a - b);
    });

    const dragStatus = ref<string>('');
    const _value = ref([]);
    const value = computed({
      set(val) {
        _value.value = val;
      },
      get() {
        if (_value.value && _value.value.length) {
          return _value.value;
        }
        let _initValue = [];
        if (props.range) {
          _initValue = props.modelValue;
        } else {
          _initValue = [props.modelValue];
        }
        return _initValue;
      },
    });

    const touchData = reactive<TouchData>({
      startValue: 0,
      newValue: 0,
      startX: 0,
      deltaX: 0,
      offsetX: 0,
    });

    function onTouchStart(event:TouchEvent, index:number) {
      if (this.disabled) {
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

    function onTouchMove(event:TouchEvent, index:number) {
      if (props.disabled) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      if (dragStatus.value === 'start') {
        context.emit('drag-start');
      }
      const touch = event.touches[0];
      touchData.deltaX = touch.clientX -  touchData.startX;
      touchData.offsetX = Math.abs(touchData.deltaX);
      dragStatus.value = 'draging';

      const rect = this.$el.getBoundingClientRect();
      const delta = touchData.deltaX;
      const total = rect.width;
      const diff = (delta / total) * (props.max - props.min);

      touchData.newValue = touchData.startValue + diff;
      updateValue(touchData.newValue, index);
    }

    function onTouchEnd(event:TouchEvent, index:number) {
      if (props.disabled) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      if (dragStatus.value === 'draging') {
        updateValue(touchData.newValue, index, true);
        context.emit('drag-end');
      }

      dragStatus.value = '';
    }

    function onClick(event: MouseEvent) {
      event.stopPropagation();

      if (props.disabled) return;

      const rect = this.$refs.bar.getBoundingClientRect();
      const delta =  event.clientX - rect.left;
      const total = rect.width;
      const current = +props.min + (delta / total) * (props.max - props.min) ;

      let index = 0;
      if (props.range) {
        if (Math.abs(current - value.value[0]) > Math.abs(current - value.value[1])) {
          index = 1;
        }
      }
      touchData.startValue = value.value[index];
      updateValue(current, index, true);
    }

    function format(value:number): number {
      let current = value;
      if (!props.range && props.marks) {
        if (marksData.value && marksData.value.length) {
          let min = marksData.value[0];
          for (let i = 0;i < marksData.value.length;i++) {
            if (Math.abs(marksData.value[i] - value) < Math.abs(min - value)) {
              min = marksData.value[i];
            }
          }
          current = min;
        }
      }
      return (
        Math.round(Math.max(props.min, Math.min(current, props.max)) / props.step) *
        props.step
      );
    }

    function updateValue(newValue:number, index:number, end:boolean) {
      const formatValue = format(newValue);
      if (props.range) {
        if (end && formatValue !== touchData.startValue) {
          value.value[index] = formatValue;
          value.value  = value.value.sort((a, b) => a - b);
          context.emit('update:modelValue', value);
          context.emit('change', value);
        } else {
          if (formatValue !== touchData.startValue) {
            value.value[index] = formatValue;
          }
        }
      } else {
        if (end && formatValue !== touchData.startValue) {
          value.value = [formatValue];
          context.emit('update:modelValue', formatValue);
          context.emit('change', formatValue);
        } else {
          if (formatValue !== touchData.startValue) {
            value.value = [formatValue];
          }
        }
      }
    }

    return {
      name: ref(name),
      value,
      classes,
      handleClass,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onClick,
    };
  },
};
</script>
