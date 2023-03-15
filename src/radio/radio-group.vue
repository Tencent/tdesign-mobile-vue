<template>
  <div :class="componentName" role="radiogroup">
    <template v-if="options">
      <radio
        v-for="(opt, idx) in groupOptions"
        :key="`radio-group-options-${idx}-${Math.random()}`"
        :name="name"
        :checked="value === opt.value"
        :disabled="'disabled' in opt ? opt.disabled : disabled"
        :value="opt.value"
        :label="opt.label"
      ></radio>
    </template>
    <slot v-if="!options"></slot>
  </div>
</template>

<script lang="ts">
import { provide, defineComponent, toRefs, computed } from 'vue';
import { useDefault } from '../shared';
import RadioGroupProps from '../radio/radio-group-props';
import { RadioOption, RadioOptionObj, RadioValue, TdRadioGroupProps } from '../radio/type';
import Radio from './radio.vue';
import config from '../config';

const { prefix } = config;
const componentName = `${prefix}-radio-group`;

export default defineComponent({
  name: componentName,
  components: { Radio },
  props: RadioGroupProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const [groupValue, setGroupValue] = useDefault<RadioValue, TdRadioGroupProps>(
      props,
      context.emit,
      'value',
      'change',
    );
    const groupOptions = computed(() => {
      return props.options?.map((option: RadioOption) => {
        let opt = option as RadioOptionObj;
        if (typeof option === 'string' || typeof option === 'number') {
          opt = { value: option, label: option.toString() };
        }
        return opt;
      });
    });
    const handleRadioChange = (val: RadioValue, e: Event) => {
      setGroupValue(val, { e });
    };
    provide('rootGroupProps', props);
    provide('rootGroupValue', groupValue);
    provide('rootGroupChange', handleRadioChange);
    return {
      ...toRefs(props),
      componentName,
      groupOptions,
    };
  },
});
</script>
