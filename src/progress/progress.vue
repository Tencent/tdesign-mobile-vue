<template>
  <div :class="rootClasses">
    <div :class="`${name}__inner`">
      <div :class="`${name}__bar`" :style="progressBarStyle">
        <div :class="`${name}__bar-percent`" :style="progressBarPercenStyle"></div>
      </div>
      <div v-if="progressLabelContent" :class="`${name}__label`">
        <t-node :content="progressLabelContent"></t-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue';
import { renderTNode, TNode } from '../shared';
import config from '../config';
import { getBackgroundColor } from './utils';
import progressProps from './props';

const { prefix } = config;
const name = `${prefix}-progress`;

export default defineComponent({
  name,
  components: {
    TNode,
  },
  props: progressProps,
  setup(props) {
    const progressPercent = computed(() => {
      return Math.max(0, Math.min(props.percentage, 100));
    });

    const progressStatusStyle = computed(() => {
      if (props.percentage >= 100) {
        return 'success';
      }
      return props.status;
    });

    const progressBarStyle = computed(() => {
      const height = typeof props.strokeWidth === 'string' ? props.strokeWidth : `${props.strokeWidth}px`;
      return {
        height,
        backgroundColor: props.trackColor,
      };
    });

    const progressBarPercenStyle = computed(() => {
      return {
        width: `${progressPercent.value}%`,
        background: props.color && getBackgroundColor(props.color),
      };
    });

    const rootClasses = computed(() => [`${name}`, `${name}--status--${progressStatusStyle.value}`]);
    const internalInstance = getCurrentInstance();
    const progressLabelContent = computed(
      () =>
        props.label &&
        (typeof renderTNode(internalInstance, 'label') === 'object'
          ? renderTNode(internalInstance, 'label')
          : `${progressPercent.value}%`),
    );

    return {
      name,
      rootClasses,
      progressBarPercenStyle,
      progressBarStyle,
      progressLabelContent,
    };
  },
});
</script>
