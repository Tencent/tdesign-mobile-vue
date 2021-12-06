<template>
  <div :class="rootClasses">
    <div :class="`${name}__inner`">
      <div :class="`${name}__bd`" :style="progressBgColorStyle">
        <div :class="`${name}__percent`" :style="progressStyle"></div>
      </div>
      <div v-if="showTextPercentage" :class="`${name}__ft`">
        <span :class="`${name}__text-percentage`" :style="percentageTextStyle">{{ percentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext, defineComponent, computed } from 'vue';
import { progressProps, ProgressPropsType } from './progress.interface';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-progress`;

export default defineComponent({
  name,
  props: progressProps,
  setup(props: ProgressPropsType, context: SetupContext) {
    console.log('context', context);

    const rootClasses = computed(() => [
      `${name}`,
      {
        [`${name}--info`]: props.type === 'info',
        [`${name}--error`]: props.type === 'error',
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
