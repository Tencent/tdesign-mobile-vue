<template>
  <div :class="`${name}`">
    <div :class="`${name}__inner`">
      <div :class="`${name}__bd`">
        <div
          :class="`${name}__percent`"
          :style="`width:${percentage}%; background-color:${color};`"></div>
      </div>
      <div :class="`${name}__ft`" v-if="showText">
        <span :class="`${name}__text-info`">{{percentage}}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-progress`;

export interface ProgressProps {
  percentage: number;
  showText: boolean;
  color: string;
}

export default {
  name,
  props: {
    /**
     * @description 百分比
     * @attribute percentage
     */
    percentage: {
      type: Number,
      default: 0,
    },
    /**
     * @description 是否显示百分比文本
     * @attribute showText
     */
    showText: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 进度条的颜色
     * @attribute color
     */
    color: {
      type: String,
      default: '#0052d9',
    },
  },
  setup(props: ProgressProps, context: SetupContext) {
    console.log('props', props);
    console.log('context', context);

    return {
      name,
    };
  },
};
</script>
