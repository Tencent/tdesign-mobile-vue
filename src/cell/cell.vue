<template>
  <div :class="styleWrapper">
    <div v-if="hasLabel" :class="styleLabel">
      <slot name="label">
        <div v-if="label">{{ label }}</div>
      </slot>
    </div>
    <div :class="styleValue">
      <slot>
        <div v-if="value">{{ value }}</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, defineComponent, PropType } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-cell`;

export enum ValueAlign {
  Left = 'left',
  Right = 'right',
}

export default defineComponent({
  name,
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    valueAlign: {
      type: String as PropType<ValueAlign>,
      default: ValueAlign.Right,
    },
  },
  setup(props, context: SetupContext) {
    const styleLabel = ref(`${name}--label`);
    const styleWrapper = computed(() => [`${name}`, `${name}--theme-${props.theme}`]);

    const hasLabel = computed(() => {
      if (props.label) return true;
      return !!context.slots.label;
    });

    const styleValue = computed(() => {
      const alignLeft = `${name}__value ${name}__left`;
      if (hasLabel.value) {
        return props.valueAlign.valueOf() === ValueAlign.Right.valueOf() ? `${name}__value` : alignLeft;
      }
      return alignLeft;
    });

    return {
      styleWrapper,
      styleLabel,
      styleValue,
      hasLabel,
    };
  },
});
</script>
