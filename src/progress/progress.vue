<template>
  <div :class="rootClasses">
    <div :class="`${name}__inner`">
      <div :class="`${name}__bd`" :style="progressBgColorStyle">
        <div
          :class="`${name}__percent`"
          :style="progressStyle"></div>
      </div>
      <div :class="`${name}__ft`" v-if="showTextPercentage">
        <span
          :class="`${name}__text-percentage`" :style="percentageTextStyle"
        >{{percentage}}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext, defineComponent, computed } from 'vue';
import { ProgressType, ProgressProps } from './progress.interface';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-progress`;

export default defineComponent({
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
      default: true,
    },
    /**
     * @description 进度条的颜色
     * @attribute color
     */
    color: {
      type: String,
      default: '',
    },
    /**
     * @description 进度条的背景色
     * @attribute bgColor
     */
    bgColor: {
      type: String,
      default: '',
    },
    /**
     * @description 百分比文本颜色
     * @attribute textColor
     */
    textColor: {
      type: String,
      default: '',
    },
    /**
     * @description 类型
     * @attribute type
     */
    type: {
      type: String,
      default: ProgressType.Info,
    },
  },
  setup(props: ProgressProps, context: SetupContext) {
    // console.log('props', props);
    console.log('context', context);

    const rootClasses = computed(() => [
      `${name}`,
      {
        [`${name}--info`]:
          props.type === ProgressType.Info.valueOf(),
        [`${name}--error`]:
          props.type === ProgressType.Error.valueOf(),
      },
    ]);

    const showTextPercentage = computed(() => props.showText);

    const progressStyle = computed(() => ({
      width: `${props.percentage > 0 ? `${props.percentage}%` : 0}`,
      backgroundColor: `${props.color ? props.color : ''}`,
    }));

    const progressBgColorStyle = computed(() => ({
      backgroundColor: `${props.bgColor ? props.bgColor : ''}`,
    }));

    const percentageTextStyle = computed(() => ({
      color: `${props.textColor ? props.textColor : ''}`,
    }));

    return {
      name,
      rootClasses,
      showTextPercentage,
      progressStyle,
      progressBgColorStyle,
      percentageTextStyle,
    };
  },
});
</script>
