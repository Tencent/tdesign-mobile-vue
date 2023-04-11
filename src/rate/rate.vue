<template>
  <div :class="`${name}`">
    <div
      ref="rateWrapper"
      :class="`${name}__wrapper`"
      :style="{ fontSize: regSize(size) }"
      @touchstart="onTouchstart"
      @touchmove="onTouchmove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <icon-font
        v-for="n in count"
        :key="n"
        :class="classes(n)"
        :size="size"
        :name="getIconName(Math.ceil(actualVal), n)"
        :style="{ marginRight: `${count > n ? gap : 0}px`, ...colors }"
        @click="() => onClick(n)"
      />
    </div>

    <span v-if="showText" :class="{ [`${name}__text`]: true, [`${name}__text--active`]: actualVal > 0 }">
      {{ rateText }}
    </span>

    <div v-if="tipsVisible" ref="ratePopoverRef" :class="`${name}__tips`" :style="{ left: `${tipsLeft}px` }">
      <div v-if="actionType === 'tap'" style="display: flex">
        <div
          v-if="allowHalf"
          :class="{
            [`${name}__tips-item`]: true,
            [`${name}__tips-item--active`]: actualVal === Math.ceil(popoverValue) - 0.5,
          }"
          @click="() => onSelect(Math.ceil(popoverValue) - 0.5)"
        >
          <icon-font
            :name="getIconName(0, 0)"
            :style="{ ...colors }"
            :size="size"
            :class="`${name}__icon ${name}__icon--selected-half`"
          />
          <span :class="`${name}__tips-text`">{{ Math.ceil(popoverValue) - 0.5 }}</span>
        </div>
        <div
          :class="{
            [`${name}__tips-item`]: true,
            [`${name}__tips-item--active`]: allowHalf && actualVal === Math.ceil(popoverValue),
          }"
          @click="() => onSelect(Math.ceil(popoverValue))"
        >
          <icon-font
            :name="getIconName(0, 0)"
            :style="{ ...colors }"
            :size="size"
            :class="`${name}__icon ${name}__icon--selected`"
          />
          <span :class="`${name}__tips-text`">{{ Math.ceil(popoverValue) }}</span>
        </div>
      </div>

      <div v-else :class="`${name}__tips-item`" @click="() => onSelect(popoverValue)">
        <icon-font
          :name="getIconName(0, 0)"
          :style="{ ...colors }"
          :size="size"
          :class="{
            [`${name}__icon`]: true,
            [`${name}__icon--selected`]: Math.ceil(popoverValue) === popoverValue,
            [`${name}__icon--selected-half`]: Math.ceil(popoverValue) !== popoverValue,
          }"
        />
        <span :class="`${name}__tips-text`">{{ popoverValue }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import { IconFont } from 'tdesign-icons-vue-next';
import { onClickOutside } from '@vueuse/core';
import rateProps from './props';
import config from '../config';
import { TdRateProps } from './type';
import { useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-rate`;

export default defineComponent({
  name,
  components: { IconFont },
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
      const { color } = props;
      if (Array.isArray(color) && color.length === 2) {
        return {
          '--td-rate-selected-color': color[0],
          '--td-rate-unselected-color': color[1],
        };
      }
      if (typeof color === 'string') {
        return {
          '--td-rate-selected-color': color,
        };
      }
      return {};
    });

    const regSize = (val: string | number) => {
      return `${val}`.indexOf('px') > 0 ? val : `${val}px`;
    };
    const unitConvert = (value: number | string): number => {
      if (typeof value === 'string') {
        return parseInt(value, 10);
      }
      return value;
    };

    const classes = (n: number) => {
      const classPrefix = `${name}__icon`;
      const { disabled, allowHalf } = props;
      const className = {
        [classPrefix]: true,
      };
      if (scaleIndex.value === Math.ceil(n)) {
        className[`${classPrefix}--current`] = true;
      }
      if (actualVal.value >= n) {
        className[`${classPrefix}--selected`] = true;
        if (disabled) {
          className[`${classPrefix}--disabled`] = true;
        }
      } else if (allowHalf && Math.ceil(actualVal.value) >= n) {
        className[`${classPrefix}--selected-half`] = true;
        if (disabled) {
          className[`${classPrefix}--disabled-half`] = true;
        }
      } else {
        className[`${classPrefix}--unselected`] = true;
      }
      return className;
    };

    const getIconName = (value: number, index: number) => {
      const { defaultValue, icon } = props;
      const curVal = value || defaultValue;
      let name = ['star-filled', 'star-filled'];

      if (icon) {
        name = Array.isArray(icon) ? icon : [icon, icon];
      }

      return name[curVal >= index ? 0 : 1];
    };

    const ratePopoverRef = ref<HTMLElement>();
    const scaleIndex = ref(-1);
    const popoverValue = ref(0);
    const timer = ref<any>(null);
    const touchEnd = ref(false);
    const tipsVisible = ref(false);
    const tipsLeft = ref(0);
    const actionType = ref<'move' | 'tap'>('tap');

    onClickOutside(ratePopoverRef, (event) => {
      hideTips();
    });

    const hideTips = (delay = false) => {
      if (delay) {
        timer.value = setTimeout(() => {
          handleCloseTips();
        }, 300000);
      } else {
        handleCloseTips();
      }
    };

    const handleCloseTips = () => {
      tipsVisible.value = false;
      scaleIndex.value = -1;
      if (timer.value) {
        clearTimeout(timer.value);
      }
    };

    const onClick = (value: number) => {
      if (props.disabled) return;
      getRect(value, 'tap');
    };

    const onTouch = (e: TouchEvent, eventType: 'move') => {
      const [touch] = e.touches;
      if (rateWrapper.value) {
        const { count, allowHalf, gap, value: currentValue, size } = props;
        const margin = unitConvert(gap);
        const { width, left } = rateWrapper.value.getBoundingClientRect();
        const starWidth = (width - (count - 1) * margin) / count;
        const offsetX = touch.pageX - left;
        const num = (offsetX + margin) / (starWidth + margin);
        const remainder = num % 1;
        const integral = num - remainder;
        let value = remainder <= 0.5 && allowHalf ? integral + 0.5 : integral + 1;

        if (value > count) {
          value = count;
        } else if (value < 0) {
          value = 0;
        }

        getRect(value, eventType);
      }
    };

    const onTouchstart = (e: TouchEvent) => {
      if (props.disabled) return;
      touchEnd.value = false;
    };

    const onTouchmove = (e: TouchEvent) => {
      if (props.disabled) return;
      onTouch(e, 'move');
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (props.disabled) return;
      touchEnd.value = true;
    };

    const getRect = (value: number, eventType: 'move' | 'tap') => {
      if (rateWrapper.value) {
        const { count, allowHalf, gap, value: currentValue, size } = props;
        popoverValue.value = value;
        const fontSize = size || getComputedStyle(rateWrapper.value).getPropertyValue('font-size');
        const leftDis = Math.ceil(value - 1) * (unitConvert(gap) + unitConvert(fontSize)) + unitConvert(fontSize) * 0.5;
        tipsVisible.value = true;
        tipsLeft.value = Math.max(leftDis, unitConvert(fontSize) * 0.5);
        scaleIndex.value = Math.ceil(value);
        actionType.value = eventType;

        if (value !== currentValue && (eventType === 'move' || !allowHalf)) {
          actualVal.value = value;
        }

        if (touchEnd.value) {
          hideTips(true);
        }
      }
    };

    const onSelect = (value: number) => {
      actualVal.value = value;
      hideTips();
    };

    return {
      name: ref(name),
      classes,
      rateWrapper,
      actualVal,
      regSize,
      unitConvert,
      colors,
      rateText,
      onClick,
      onTouchstart,
      onTouchmove,
      onTouchEnd,
      tipsVisible,
      tipsLeft,
      actionType,
      onSelect,
      popoverValue,
      getIconName,
      ratePopoverRef,
    };
  },
});
</script>
