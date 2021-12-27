<template>
  <span :class="classes">
    <span v-if="label" :class="`${name}__text`">
      {{ label }}
    </span>
    <span :class="`${name}__node`" :style="backgroundColor" @click="handleToggle"> </span>
  </span>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, h } from 'vue';
import { useToggle, emitEvent } from '../shared';
import config from '../config';
import SwitchProps from './props';
import ClASSNAMES from '../shared/constants';

const { prefix } = config;
const name = `${prefix}-switch`;

export default defineComponent({
  name,
  props: SwitchProps,
  emits: ['change', 'update:value'],
  setup(props, context) {
    const switchValues = props.customValue || [false, true];
    const { state, toggle } = useToggle(switchValues, props.value);

    const checked = computed(() => state.value === switchValues[1]);

    const classes = computed(() => [
      `${name}`,
      {
        [ClASSNAMES.STATUS.checked]: checked.value,
        [ClASSNAMES.STATUS.disabled]: props.disabled,
      },
    ]);

    const backgroundColor = computed(() => {
      if (!props.disabled && props.colors) {
        return `background-color: ${checked.value === switchValues[1] ? props.colors[1] : props.colors[0]}`;
      }
      return ``;
    });

    function handleToggle(event: Event) {
      event.preventDefault();
      if (props.disabled) {
        return false;
      }
      toggle();
      context.emit('update:value', state.value);
      emitEvent(props, context, 'change', state.value);
    }
    return {
      name,
      classes,
      backgroundColor,
      ...toRefs(props),
      handleToggle,
    };
  },
});
</script>
