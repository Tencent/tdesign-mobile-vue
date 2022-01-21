<template>
  <span :class="classes">
    <span v-if="label" :class="`${name}__text`">
      {{ label }}
    </span>
    <span :class="`${name}__node`" :style="backgroundColor" @click="handleToggle"> </span>
  </span>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, h, watch, SetupContext } from 'vue';
import { useToggle, useDefault } from '../shared';
import config from '../config';
import SwitchProps from './props';
import ClASSNAMES from '../shared/constants';
import { SwitchValue } from './type';

const { prefix } = config;
const name = `${prefix}-switch`;

export default defineComponent({
  name,
  props: SwitchProps,
  emits: ['change', 'update:value', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const switchValues = props.customValue || [true, false];
    const { innerValue } = useDefault(props, context, 'value', 'change');
    const { state, toggle } = useToggle<SwitchValue>(switchValues, innerValue.value);

    const classes = computed(() => [
      `${name}`,
      {
        [ClASSNAMES.STATUS.checked]: innerValue.value === true,
        [ClASSNAMES.STATUS.disabled]: props.disabled,
      },
    ]);

    const backgroundColor = computed(() => {
      if (!props.disabled && props.colors) {
        return `background-color: ${innerValue.value === switchValues[0] ? props.colors[0] : props.colors[1]}`;
      }
      return ``;
    });

    function handleToggle(event: Event) {
      event.preventDefault();
      if (props.disabled) {
        return;
      }
      toggle();
      innerValue.value = state.value;
      console.log('state', state.value, 'innerValue', innerValue.value);
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
