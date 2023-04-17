<template>
  <div :class="classes" @click.prevent="handleToggle">
    <div :class="dotClasses">
      <div :class="labelClasses">
        <t-loading v-if="loading" inherit-color size="16.25px" />
        <template v-else-if="label?.length == 2">{{ checked ? label[0] : label[1] }}</template>
        <t-node :content="iconContent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent } from 'vue';

import TLoading from '../loading';
import { useToggle, useDefault, TNode } from '../shared';
import config from '../config';
import SwitchProps from './props';
import { SwitchValue, TdSwitchProps } from './type';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-switch`;

export default defineComponent({
  name,
  components: { TNode, TLoading },
  props: SwitchProps,
  emits: ['change', 'update:value', 'update:modelValue'],
  setup(props, context) {
    const disabled = useFormDisabled();
    const switchValues = props.customValue || [true, false];
    const [innerValue] = useDefault<SwitchValue, TdSwitchProps>(props, context.emit, 'value', 'change');
    const { state, toggle } = useToggle<SwitchValue>(switchValues, innerValue.value);
    const checked = computed(() => innerValue.value === switchValues[0]);
    const classes = computed(() => [
      `${name}`,
      `${name}--${props.size}`,
      {
        [`${name}--checked`]: checked.value,
        [`${name}--disabled`]: disabled.value,
      },
    ]);
    const dotClasses = computed(() => [
      `${name}__dot`,
      `${name}__dot--${props.size}`,
      {
        [`${name}__dot--checked`]: checked.value,
        [`${name}__dot--plain`]: props?.label?.length !== 2 && props?.icon?.length !== 2 && !props?.loading,
      },
    ]);
    const labelClasses = computed(() => [
      `${name}__label`,
      `${name}__label--${props.size}`,
      {
        [`${name}__label--checked`]: checked.value,
      },
    ]);
    const iconContent = computed(() => props?.icon?.[checked.value ? 0 : 1]);

    function handleToggle(event: Event) {
      if (disabled.value) {
        return;
      }
      toggle();
      innerValue.value = state.value;
    }
    return {
      name,
      classes,
      dotClasses,
      labelClasses,
      checked,
      iconContent,
      ...toRefs(props),
      handleToggle,
    };
  },
});
</script>
