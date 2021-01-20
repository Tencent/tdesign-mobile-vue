<template>
  <div :class="name" @click="onClick">
    <div v-if="hasLabel" :class="`${name}__label`">
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
  emits: ['click'],
  setup(props, context: SetupContext) {
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

    const onClick = (e) => context.emit('click', e);

    return {
      name,
      styleValue,
      hasLabel,
      onClick,
    };
  },
});
</script>
