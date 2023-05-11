<template>
  <div :class="`${name}`">
    <!-- LINE -->
    <div v-if="theme === PRO_THEME.LINE" :class="[`${name}--thin`, `${name}--status--${computedStatus}`]">
      <div :class="`${name}__bar`" :style="trackBgStyle">
        <div :class="`${name}__inner`" :style="barStyle"></div>
      </div>
      <div v-if="label" :class="`${name}__info`">
        <t-node :content="labelContent"></t-node>
      </div>
    </div>
    <!-- PLUMP -->
    <div
      v-if="theme === PRO_THEME.PLUMP"
      :class="[
        `${name}__bar`,
        `${name}--plump`,
        `${Number(percentage) > PLUMP_SEPARATE ? name + '--over-ten' : name + '--under-ten'}`,
        `${name}--status--${computedStatus}`,
      ]"
      :style="trackBgStyle"
    >
      <div :class="`${name}__inner`" :style="barStyle">
        <div v-if="label && Number(percentage) > PLUMP_SEPARATE" :class="`${name}__info`">
          <t-node :content="labelContent"></t-node>
        </div>
      </div>
      <div v-if="label && Number(percentage) <= PLUMP_SEPARATE" :class="`${name}__info`">
        <t-node :content="labelContent"></t-node>
      </div>
    </div>
    <!-- CIRCLE -->
    <div
      v-if="theme === PRO_THEME.CIRCLE"
      :class="[`${name}--circle`, `${name}--status--${computedStatus}`]"
      :style="circleStyle"
    >
      <div v-if="label" :class="`${name}__info`">
        <t-node :content="labelContent"></t-node>
      </div>
      <svg :width="diameter" :height="diameter" :viewBox="`0 0 ${diameter} ${diameter}`">
        <circle
          :cx="rPoints"
          :cy="rPoints"
          :r="radius"
          :stroke-width="circleStrokeWidth"
          fill="none"
          :class="[`${name}__circle-outer`]"
          :style="circleOuterStyle"
        />
        <circle
          v-if="percentage > 0"
          :cx="rPoints"
          :cy="rPoints"
          :r="radius"
          :stroke-width="circleStrokeWidth"
          fill="none"
          stroke-linecap="round"
          :class="[`${name}__circle-inner`]"
          :transform="`matrix(0,-1,1,0,0,${diameter})`"
          :stroke-dasharray="strokeDashArr"
          :style="circlePathStyle"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, toRefs, h, CSSProperties } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CheckIcon, CloseIcon, ErrorIcon } from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { renderTNode, TNode } from '../shared';
import { getBackgroundColor } from './utils';
import props from './props';
import { PRO_THEME, CIRCLE_SIZE_PX, STATUS_ICON, PLUMP_SEPARATE } from './constants';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-progress`;

export default defineComponent({
  name,
  components: {
    TNode,
  },
  props,
  setup(props, context) {
    const { theme, status, percentage, label, strokeWidth, trackColor, color } = toRefs(props);

    const computedStatus = computed(() => {
      if (percentage.value >= 100) {
        return 'success';
      }
      return status.value || 'default';
    });

    const trackBgStyle = computed(() => {
      const style: CSSProperties = {};
      if (strokeWidth.value) {
        const height = isString(strokeWidth.value) ? strokeWidth.value : `${strokeWidth.value}px`;
        style.height = height;
        style.borderRadius = height;
      }
      if (trackColor.value) {
        style.backgroundColor = trackColor.value;
      }
      return style;
    });

    const barStyle = computed(() => {
      return {
        width: `${percentage.value}%`,
        background: color.value && getBackgroundColor(color.value),
      };
    });

    const getIconMap = () => {
      const CIRCLE_ICONS = {
        success: CheckIcon,
        warning: ErrorIcon,
        error: CloseIcon,
      };
      const NORMAL_ICONS = {
        success: CheckCircleFilledIcon,
        warning: ErrorCircleFilledIcon,
        error: ErrorCircleFilledIcon,
      };
      return theme.value === PRO_THEME.CIRCLE ? CIRCLE_ICONS : NORMAL_ICONS;
    };

    const internalInstance = getCurrentInstance();
    const labelContent = computed(() => {
      if (STATUS_ICON.includes(status.value as string) && theme.value !== PRO_THEME.PLUMP) {
        const components = getIconMap();
        return h(components[status.value as string], { class: `${name}__icon` });
      }
      if (context.slots.label || isFunction(label.value)) {
        return renderTNode(internalInstance, 'label');
      }
      return `${percentage.value}%`;
    });

    // theme=circle 获取直径
    const diameter = computed(() => {
      return CIRCLE_SIZE_PX;
    });

    const rPoints = computed(() => {
      return diameter.value / 2;
    });

    const circleStrokeWidth = computed(() => {
      return strokeWidth.value ? Number(strokeWidth.value) : 6;
    });

    const radius = computed(() => {
      return rPoints.value - circleStrokeWidth.value / 2;
    });

    const circleStyle = computed(() => {
      if (theme.value !== PRO_THEME.CIRCLE) {
        return {};
      }
      return {
        width: `${diameter.value}px`,
        height: `${diameter.value}px`,
      };
    });

    const strokeDashArr = computed(() => {
      const radius = (diameter.value - circleStrokeWidth.value) / 2;
      const perimeter = Math.PI * 2 * radius;
      const percent = percentage.value / 100;
      return `${perimeter * percent}  ${perimeter * (1 - percent)}`;
    });

    const circlePathStyle = computed(() => {
      const strokeColor = isObject(color.value) ? '' : color.value;
      return {
        stroke: strokeColor,
      };
    });

    const circleOuterStyle = computed(() => {
      const strokeColor = isObject(trackColor.value) ? '' : trackColor.value;
      return {
        stroke: strokeColor,
      };
    });

    return {
      name,
      PRO_THEME,
      PLUMP_SEPARATE,
      computedStatus,
      trackBgStyle,
      barStyle,
      labelContent,
      diameter,
      rPoints,
      radius,
      circleStyle,
      circleStrokeWidth,
      strokeDashArr,
      circlePathStyle,
      circleOuterStyle,
    };
  },
});
</script>
