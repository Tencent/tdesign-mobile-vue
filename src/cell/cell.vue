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

export type ValueAlign = 'left' | 'right';

export default defineComponent({
  name,
  props: {
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
      default: 'right',
    },
  },
  setup(props, context: SetupContext) {
    const styleLabel = ref(`${name}__label`);
    const styleWrapper = computed(() => [`${name}`]);

    const hasLabel = computed(() => {
      if (props.label) return true;
      return !!context.slots.label;
    });

    const styleValue = computed(() => {
      const alignLeft = `${name}__value ${name}__left`;
      if (hasLabel.value) {
        return props.valueAlign === 'right' ? `${name}__value` : alignLeft;
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
