<template>
  <span :class="classes">
    <span v-if="label" :class="textClasses">
      {{ label }}
    </span>
    <span :class="nodeClasses" :style="backgroundColor" @click="handleToggle"> </span>
  </span>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, h } from 'vue';
import { useToggle } from '@/shared';
import config from '../config';
import SwitchProps from './props';

const { prefix } = config;
const name = `${prefix}-switch`;

export default defineComponent({
  name,
  props: SwitchProps,
  emits: ['change'],
  setup(props, context) {
    const switchValues = props.customValue || [false, true];
    const { state, toggle } = useToggle(switchValues, props.value);

    const checked = computed(() => state.value === switchValues[1]);

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--checked`]: checked.value,
        [`${prefix}-is-disabled`]: props.disabled,
      },
    ]);

    const textClasses = computed(() => [
      `${name}__text`,
      {
        [`${prefix}-is-disabled`]: props.disabled,
      },
    ]);

    const nodeClasses = computed(() => [
      `${name}__node`,
      {
        [`${name}__node--checked`]: checked.value,
        [`${prefix}-is-disabled`]: props.disabled,
      },
    ]);

    const backgroundColor = computed(() => {
      if (!props.disabled && props.colors) {
        return `background-color: ${checked.value ? props.colors[1] : props.colors[0]}`;
      }
      return ``;
    });

    function handleToggle(event: Event) {
      event.preventDefault();
      if (props.disabled) {
        return false;
      }
      toggle();
      context.emit('change', state.value);
    }
    return {
      name,
      classes,
      textClasses,
      nodeClasses,
      backgroundColor,
      ...toRefs(props),
      handleToggle,
    };
  },
});
</script>
